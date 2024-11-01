import { Chat } from "@/domain/entities";
import { IChatRepository, IUserRepository } from "@/domain/repositories";
import {
  CreateChatRoomInput,
  CreateChatRoomUseCase,
} from "@/domain/use-cases/chat";

export class CreateChatRoomUseCaseImpl implements CreateChatRoomUseCase {
  constructor(
    private userRepository: IUserRepository,
    private chatRepository: IChatRepository
  ) {}

  async execute({
    username,
    currentUserId,
  }: CreateChatRoomInput): Promise<Chat> {
    // Find target user
    const targetUser = await this.userRepository.findByUsername(username);
    if (!targetUser) throw new Error("User not found");

    if (currentUserId === targetUser.id)
      throw new Error(
        "You cannot create a chat with yourself. Only at real life."
      );

    // Create new chat
    const chat = await this.chatRepository.createChat();

    // Add both participants to the chat
    await this.chatRepository.addParticipants(chat.id, [
      currentUserId,
      targetUser.id,
    ]);

    return chat;
  }
}
