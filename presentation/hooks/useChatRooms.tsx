import { CreateChatRoomUseCaseImpl } from "@/application/use-cases/create-chat-room";
import { CreateChatRoomInput } from "@/domain/use-cases/chat";
import { queryClient } from "@/infrastructure/libs/tanstack-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAuth } from "../providers/auth-provider";
import { useDependencies } from "../providers/dependency-provider";

const GET_CHAT_ROOMS_QUERY_KEY = "chat-rooms";

export function useGetChatRooms() {
  const { user } = useAuth();
  const { chatRepository } = useDependencies();

  return useQuery({
    queryKey: [GET_CHAT_ROOMS_QUERY_KEY, user?.id],
    queryFn: () => chatRepository.getChatRooms(user?.id || 0),
  });
}

export function useCreateChatRoom() {
  const { user } = useAuth();
  const { chatRepository, userRepository } = useDependencies();

  const createChatRoom = useCallback(async (input: CreateChatRoomInput) => {
    const createChatRoomUseCase = new CreateChatRoomUseCaseImpl(
      userRepository,
      chatRepository
    );

    return createChatRoomUseCase.execute(input);
  }, []);

  return useMutation({
    mutationFn: createChatRoom,
    mutationKey: ["create-chat-room"],
    onSuccess: () => clearChatRoomsCache(user?.id), // Invalidate and refetch chat rooms after creating a new one
  });
}

export const clearChatRoomsCache = (id?: number) =>
  queryClient.invalidateQueries({ queryKey: [GET_CHAT_ROOMS_QUERY_KEY, id] });
