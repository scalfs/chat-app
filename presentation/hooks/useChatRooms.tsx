import { CreateChatRoomUseCaseImpl } from "@/application/use-cases/create-chat-room";
import { CreateChatRoomInput } from "@/domain/use-cases/chat";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { useAuth } from "../providers/auth-provider";
import { useDependencies } from "../providers/dependency-provider";

const getChatRoomsQueryKey = (id: number) => ["chat-rooms", id];

export function useGetChatRooms() {
  const { user } = useAuth();
  const { chatRepository } = useDependencies();

  const getChatRooms = useCallback(() => {
    if (!user?.id) throw new Error("User ID is required");
    return chatRepository.getChatRooms(user.id);
  }, [chatRepository, user?.id]);

  const query = useQuery({
    staleTime: 15 * 1000,
    queryFn: getChatRooms,
    refetchOnMount: false,
    queryKey: getChatRoomsQueryKey(user?.id!),
  });

  // Refetch chat rooms when the screen is focused
  // This makes sure we're fetching when coming back from the chat room screen
  useFocusEffect(
    useCallback(() => {
      query.refetch();
    }, [])
  );

  return query;
}

export function useCreateChatRoom() {
  const { user } = useAuth();
  const { chatRepository, userRepository } = useDependencies();

  const queryClient = useQueryClient();

  const createChatRoom = useCallback(async (input: CreateChatRoomInput) => {
    const createChatRoomUseCase = new CreateChatRoomUseCaseImpl(
      userRepository,
      chatRepository
    );

    return createChatRoomUseCase.execute(input);
  }, []);

  return useMutation({
    mutationFn: createChatRoom,
    // Invalidate and refetch chat rooms after creating a new one
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: getChatRoomsQueryKey(user?.id!),
      }),
  });
}
