import { ChatMessage } from "@/domain/entities";
import { GetMessagesUseCase } from "@/domain/use-cases/message";
import { GetMessagesParams, IMessageRepository } from "@/domain/repositories";

export class GetMessagesUseCaseImpl implements GetMessagesUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}
  execute(
    params: Partial<GetMessagesParams> & { chatId: number }
  ): Promise<ChatMessage[]> {
    const { chatId, offset = 0, limit = 50 } = params;
    return this.messageRepository.getMessages({ chatId, offset, limit });
  }
}
