import {
  IMessageRepository,
  MessageReactionParams,
} from "@/domain/repositories";
import { ReactToMessageUseCase } from "@/domain/use-cases/message";

export class ReactToMessageUseCaseImpl implements ReactToMessageUseCase {
  constructor(private messageRepository: IMessageRepository) {}

  async execute(
    params: MessageReactionParams & { currentUserHasAlreadyReacted: boolean }
  ): Promise<void> {
    if (params.currentUserHasAlreadyReacted)
      return this.messageRepository.removeReaction(params);

    return this.messageRepository.addReaction(params);
  }
}
