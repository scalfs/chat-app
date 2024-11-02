import { ChatMessage } from "@/domain/entities";
import { IMessageRepository } from "@/domain/repositories";
import { GetMessagesUseCaseImpl } from "../get-messages";

describe("GetMessagesUseCaseImpl", () => {
  let mockMessageRepository: jest.Mocked<IMessageRepository>;
  let getMessagesUseCase: GetMessagesUseCaseImpl;

  const mockMessages: ChatMessage[] = [
    {
      id: 1,
      chat_id: 123,
      user_id: 1,
      content: "Hello",
      created_at: "2024-03-20T10:00:00Z",
    },
    {
      id: 2,
      chat_id: 123,
      user_id: 2,
      content: "Hi there",
      created_at: "2024-03-20T10:01:00Z",
    },
  ];

  beforeEach(() => {
    mockMessageRepository = { getMessages: jest.fn() };
    getMessagesUseCase = new GetMessagesUseCaseImpl(mockMessageRepository);
  });

  it("should get messages with default pagination values", async () => {
    mockMessageRepository.getMessages.mockResolvedValue(mockMessages);
    const chatId = 123;

    const result = await getMessagesUseCase.execute({ chatId });

    expect(result).toEqual(mockMessages);
    expect(mockMessageRepository.getMessages).toHaveBeenCalledWith({
      chatId,
      offset: 0,
      limit: 50,
    });
  });

  it("should get messages with custom pagination values", async () => {
    mockMessageRepository.getMessages.mockResolvedValue(mockMessages);
    const params = {
      chatId: 123,
      offset: 10,
      limit: 20,
    };

    const result = await getMessagesUseCase.execute(params);

    expect(result).toEqual(mockMessages);
    expect(mockMessageRepository.getMessages).toHaveBeenCalledWith(params);
  });

  it("should handle repository errors", async () => {
    const error = new Error("Database error");
    mockMessageRepository.getMessages.mockRejectedValue(error);
    const chatId = 123;

    await expect(getMessagesUseCase.execute({ chatId })).rejects.toThrow(error);
    expect(mockMessageRepository.getMessages).toHaveBeenCalledWith({
      chatId,
      offset: 0,
      limit: 50,
    });
  });
});
