import { Chat, ChatDetails } from "../entities";

export interface CreateChatRoomInput {
  username: string;
  currentUserId: number;
}

export interface CreateChatRoomUseCase {
  execute(input: CreateChatRoomInput): Promise<Chat>;
}

export interface GetChatRoomsInput {
  userId: number;
}

export interface GetChatRoomsUseCase {
  execute(input: GetChatRoomsInput): Promise<ChatDetails[]>;
}
