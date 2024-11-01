import { ChatDetails } from "@/domain/entities";
import { IChatRepository } from "@/domain/repositories";
import {
  GetChatRoomsInput,
  GetChatRoomsUseCase,
} from "@/domain/use-cases/chat";

export class GetChatRoomsUseCaseImpl implements GetChatRoomsUseCase {
  constructor(private chatRepository: IChatRepository) {}

  async execute({ userId }: GetChatRoomsInput): Promise<ChatDetails[]> {
    return this.chatRepository.getChatRooms(userId);
  }
}
