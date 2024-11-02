import { ChatMessage } from "@/domain/entities";
import { CreateMessageParams, IMessageRepository } from "@/domain/repositories";
import { CreateMessageUseCase } from "@/domain/use-cases/message";

export class CreateMessageUseCaseImpl implements CreateMessageUseCase {
  constructor(private readonly messageRepository: IMessageRepository) {}

  execute(params: CreateMessageParams): Promise<ChatMessage> {
    return this.messageRepository.createMessage(params);
  }
}
