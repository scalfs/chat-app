import { CreateChatRoomUseCaseImpl } from "@/application/use-cases/create-chat-room";
import { Chat, User } from "@/domain/entities";
import { IChatRepository, IUserRepository } from "@/domain/repositories";

describe("CreateChatRoomUseCase", () => {
  let userRepository: jest.Mocked<IUserRepository>;
  let chatRepository: jest.Mocked<IChatRepository>;
  let createChatRoomUseCase: CreateChatRoomUseCaseImpl;

  beforeEach(() => {
    userRepository = { findByUsername: jest.fn(), createUser: jest.fn() };
    chatRepository = {
      createChat: jest.fn(),
      addParticipants: jest.fn(),
      getChatRooms: jest.fn(),
    };
    createChatRoomUseCase = new CreateChatRoomUseCaseImpl(
      userRepository,
      chatRepository
    );
  });

  it("should create a chat room successfully", async () => {
    const currentUserId = 1;
    const targetUser: User = { id: 2, username: "user2" };
    const mockChat: Chat = { id: 1, created_at: new Date().toISOString() };

    userRepository.findByUsername.mockResolvedValue(targetUser);
    chatRepository.createChat.mockResolvedValue(mockChat);
    chatRepository.addParticipants.mockResolvedValue();

    const result = await createChatRoomUseCase.execute({
      username: "user2",
      currentUserId,
    });

    expect(result).toEqual(mockChat);
    expect(userRepository.findByUsername).toHaveBeenCalledWith("user2");
    expect(chatRepository.createChat).toHaveBeenCalled();
    expect(chatRepository.addParticipants).toHaveBeenCalledWith(mockChat.id, [
      currentUserId,
      targetUser.id,
    ]);
  });

  it("should throw error when target user not found", async () => {
    userRepository.findByUsername.mockResolvedValue(null);

    await expect(
      createChatRoomUseCase.execute({
        username: "nonexistent",
        currentUserId: 1,
      })
    ).rejects.toThrow();

    expect(chatRepository.createChat).not.toHaveBeenCalled();
    expect(chatRepository.addParticipants).not.toHaveBeenCalled();
  });

  it("should throw error when trying to create chat with self", async () => {
    const currentUserId = 1;
    const targetUser: User = { id: currentUserId, username: "user1" };

    userRepository.findByUsername.mockResolvedValue(targetUser);

    await expect(
      createChatRoomUseCase.execute({ username: "user1", currentUserId })
    ).rejects.toThrow();

    expect(chatRepository.createChat).not.toHaveBeenCalled();
    expect(chatRepository.addParticipants).not.toHaveBeenCalled();
  });
});
