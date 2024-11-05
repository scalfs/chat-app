import { Chat, ChatDetails, ChatMessage, User } from "../entities";

export interface IUserRepository {
  findByUsername(username: string): Promise<User | null>;
  createUser(username: string): Promise<User>;
}

export interface IChatRepository {
  createChat(): Promise<Chat>;
  addParticipants(chatId: number, userIds: number[]): Promise<void>;
  getChatRooms(userId: number): Promise<ChatDetails[]>;
}

export interface IMessageRepository {
  getMessages(params: GetMessagesParams): Promise<ChatMessage[]>;
  createMessage(params: CreateMessageParams): Promise<ChatMessage>;
  addReaction(params: MessageReactionParams): Promise<void>;
  removeReaction(params: MessageReactionParams): Promise<void>;
}

export type GetMessagesParams = {
  chatId: number;
  offset: number;
  limit: number;
};

export type CreateMessageParams = {
  chatId: number;
  userId: number;
  content: string;
};

export interface MessageReactionParams {
  messageId: number;
  userId: number;
  emojiUnicode: string;
  emojiDescription: string;
}
