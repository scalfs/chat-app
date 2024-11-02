import { Chat, ChatDetails, User } from "../entities";

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  createUser(username: string): Promise<User>;
}

export interface IChatRepository {
  createChat(): Promise<Chat>;
  addParticipants(chatId: number, userIds: number[]): Promise<void>;
  getChatRooms(userId: number): Promise<ChatDetails[]>;
}
