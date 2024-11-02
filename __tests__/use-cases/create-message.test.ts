import { CreateMessageUseCaseImpl } from "@/application/use-cases/create-message";
import { ChatMessage } from "@/domain/entities";
import { IMessageRepository } from "@/domain/repositories";

describe("CreateMessageUseCaseImpl", () => {
  let messageRepository: jest.Mocked<IMessageRepository>;
  let createMessageUseCase: CreateMessageUseCaseImpl;
  beforeEach(() => {
    messageRepository = { createMessage: jest.fn(), getMessages: jest.fn() };
    createMessageUseCase = new CreateMessageUseCaseImpl(messageRepository);
  });

  it("should create a message successfully", async () => {
    const params = {
      chatId: 123,
      userId: 456,
      content: "Hello, world!",
    };

    const expectedMessage: ChatMessage = {
      id: 789,
      chat_id: 123,
      user_id: 456,
      content: params.content,
      created_at: new Date().toISOString(),
    };

    messageRepository.createMessage.mockResolvedValue(expectedMessage);

    const result = await createMessageUseCase.execute(params);

    expect(messageRepository.createMessage).toHaveBeenCalledWith(params);
    expect(result).toEqual(expectedMessage);
  });
});
