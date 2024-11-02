import { GetMessagesUseCaseImpl } from "@/application/use-cases/get-messages";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAuth } from "../providers/auth-provider";
import { useDependencies } from "../providers/dependency-provider";

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
    queryKey: ["messages", user?.id, chatId],
  });
}
