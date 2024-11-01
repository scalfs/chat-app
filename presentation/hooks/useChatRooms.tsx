import { CreateChatRoomUseCaseImpl } from "@/application/use-cases/create-chat-room";
import { CreateChatRoomInput } from "@/domain/use-cases/chat";
import { queryClient } from "@/infrastructure/libs/tanstack-query";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "../providers/auth-provider";
import { useDependencies } from "../providers/dependency-provider";

export function useGetChatRooms() {
  const { user } = useAuth();
  const { chatRepository } = useDependencies();

  return useQuery({
    queryKey: ["chat-rooms"],
    queryFn: () => chatRepository.getChatRooms(user?.id || 0),
  });
}

export function useCreateChatRoom() {
  const { chatRepository, userRepository } = useDependencies();

  const createChatRoomUseCase = new CreateChatRoomUseCaseImpl(
    userRepository,
    chatRepository
  );

  return useMutation({
    mutationKey: ["create-chat-room"],
    mutationFn: (input: CreateChatRoomInput) =>
      createChatRoomUseCase.execute(input),
    onSuccess: () => {
      // Invalidate and refetch chat rooms after creating a new one
      queryClient.invalidateQueries({ queryKey: ["chat-rooms"] });
    },
  });
}
