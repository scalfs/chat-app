import { ChatMessage } from "../entities";
import {
  CreateMessageParams,
  GetMessagesParams,
  MessageReactionParams,
} from "../repositories";

export interface GetMessagesUseCase {
  execute(params: GetMessagesParams): Promise<ChatMessage[]>;
}

export interface CreateMessageUseCase {
  execute(params: CreateMessageParams): Promise<ChatMessage>;
}

export interface ReactToMessageUseCase {
  execute(
    params: MessageReactionParams & { currentUserHasAlreadyReacted: boolean }
  ): Promise<void>;
}
