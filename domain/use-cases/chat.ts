import { Chat } from "../entities";

export interface CreateChatRoomInput {
  username: string;
  currentUserId: number;
}

export interface CreateChatRoomUseCase {
  execute(input: CreateChatRoomInput): Promise<Chat>;
}
