import { CreateMessageUseCaseImpl } from "@/application/use-cases/create-message";
import { GetMessagesUseCaseImpl } from "@/application/use-cases/get-messages";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAuth } from "../providers/auth-provider";
import { useDependencies } from "../providers/dependency-provider";

const getMessagesQueryKey = (userId: number, chatId: number) => [
  "messages",
  userId,
  chatId,
];

export function useGetMessages(chatId: number) {
  const { user } = useAuth();
  const { messageRepository } = useDependencies();

  const getMessages = useCallback(() => {
    const getMessagesUseCase = new GetMessagesUseCaseImpl(messageRepository);
    return getMessagesUseCase.execute({ chatId });
  }, [messageRepository]);

  return useQuery({
    staleTime: 1000,
    queryFn: getMessages,
    queryKey: getMessagesQueryKey(user?.id!, chatId),
  });
}

export function useCreateMessage(chatId: number) {
  const { user } = useAuth();
  const { messageRepository } = useDependencies();

  const queryClient = useQueryClient();

  const createMessage = async (content: string) => {
    const createMessageUseCase = new CreateMessageUseCaseImpl(
      messageRepository
    );

    return createMessageUseCase.execute({
      chatId,
      content,
      userId: user?.id!,
    });
  };

  return useMutation({
    mutationFn: createMessage,
    // Invalidate and refetch messages query
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: getMessagesQueryKey(user?.id!, chatId),
      }),
  });
}
