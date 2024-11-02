import { GetChatRoomsUseCaseImpl } from "@/application/use-cases/get-chat-rooms";
import { ChatDetails } from "@/domain/entities";
import { IChatRepository } from "@/domain/repositories";

describe("GetChatRoomsUseCase", () => {
  let chatRepository: jest.Mocked<IChatRepository>;
  let getChatRoomsUseCase: GetChatRoomsUseCaseImpl;

  beforeEach(() => {
    chatRepository = {
      getChatRooms: jest.fn(),
      createChat: jest.fn(),
      addParticipants: jest.fn(),
    };
    getChatRoomsUseCase = new GetChatRoomsUseCaseImpl(chatRepository);
  });

  it("should return chat rooms for user", async () => {
    const mockUserId = 1;
    const mockChatRooms: ChatDetails[] = [
      { id: 1, name: "test", timestamp: "1 min ago", last_message: "test" },
    ];

    chatRepository.getChatRooms.mockResolvedValue(mockChatRooms);

    const result = await getChatRoomsUseCase.execute({ userId: mockUserId });

    expect(result).toEqual(mockChatRooms);
    expect(chatRepository.getChatRooms).toHaveBeenCalledWith(mockUserId);
  });
});
