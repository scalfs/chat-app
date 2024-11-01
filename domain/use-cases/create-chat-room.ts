import { Chat, User } from "../entities";

export interface CreateChatRoomInput {
  username: string;
  currentUserId: number;
}

export interface CreateChatRoomUseCase {
  execute(input: CreateChatRoomInput): Promise<Chat>;
}

export interface SignInUserInput {
  username: string;
}

export interface SignInUserUseCase {
  execute(input: SignInUserInput): Promise<User>;
}
