import { ChatMessage } from "../entities";
import { GetMessagesParams } from "../repositories";

export interface GetMessagesUseCase {
  execute(params: GetMessagesParams): Promise<ChatMessage[]>;
}
