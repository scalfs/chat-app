import { ChatMessage } from "../entities";
import { CreateMessageParams, GetMessagesParams } from "../repositories";

export interface GetMessagesUseCase {
  execute(params: GetMessagesParams): Promise<ChatMessage[]>;
}

export interface CreateMessageUseCase {
  execute(params: CreateMessageParams): Promise<ChatMessage>;
}
