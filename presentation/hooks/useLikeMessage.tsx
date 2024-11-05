import { ReactToMessageUseCaseImpl } from "@/application/use-cases/react-to-message";
import { ChatMessage } from "@/domain/entities";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../providers/auth-provider";
import { useDependencies } from "../providers/dependency-provider";

// TODO: map all available reactions in a config file
// https://unicode.org/emoji/charts/full-emoji-list.html
export const LIKE_REACTION = {
  emojiUnicode: "👍",
  emojiDescription: "thumbs up",
};

type LikeMessageParams = {
  messageId: number;
  isLikedByCurrentUser: boolean;
};

export function useLikeMessage() {
  const { user } = useAuth();
  const { messageRepository } = useDependencies();
  const queryClient = useQueryClient();

  const likeMessage = useCallback(
    async ({ messageId, isLikedByCurrentUser }: LikeMessageParams) => {
      const reactToMessageUseCase = new ReactToMessageUseCaseImpl(
        messageRepository
      );
      return reactToMessageUseCase.execute({
        messageId,
        userId: user?.id!,
        emojiUnicode: LIKE_REACTION.emojiUnicode,
        emojiDescription: LIKE_REACTION.emojiDescription,
        currentUserHasAlreadyReacted: isLikedByCurrentUser,
      });
    },
    [messageRepository]
  );

  return useMutation({
    mutationFn: likeMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}

// Hook to handle optimistic update of the like state while the reaction is being sent to the server.
// TODO: this should be in a higher level, not meant to be instantiated in every message component. But good for now.
export function useLikeMessageOptimisticUpdate(
  message: ChatMessage,
  userId: number
) {
  const { isPending, mutateAsync, isError } = useLikeMessage();
  const {
    isLikedByCurrentUser: initialIsLikedByCurrentUser,
    otherUsersLikeReactionsCount,
  } = getLikeReactions(message, userId);

  const [isLikedByCurrentUser, setIsLikedByCurrentUser] = useState(
    () => initialIsLikedByCurrentUser
  );

  const toggleLike = useCallback(() => {
    if (isPending) return; // Prevent double clicks
    setIsLikedByCurrentUser((prev) => !prev);
    return mutateAsync({ messageId: message.id, isLikedByCurrentUser });
  }, [isPending, mutateAsync, isLikedByCurrentUser, setIsLikedByCurrentUser]);

  useEffect(() => {
    // Rollback the optimistic update if the reaction fails to be sent to the server.
    if (isError) setIsLikedByCurrentUser((prev) => !prev);
  }, [isError]);

  return { toggleLike, isLikedByCurrentUser, otherUsersLikeReactionsCount };
}

function getLikeReactions(message: ChatMessage, currentUserId: number) {
  const isLikedByCurrentUser = message.reactions.some(
    (reaction) =>
      reaction.user_id === currentUserId &&
      reaction.emoji_unicode === LIKE_REACTION.emojiUnicode
  );

  const otherUsersLikeReactionsCount = message.reactions.filter(
    (reaction) =>
      reaction.user_id !== currentUserId &&
      reaction.emoji_unicode === LIKE_REACTION.emojiUnicode
  ).length;

  return { isLikedByCurrentUser, otherUsersLikeReactionsCount };
}
