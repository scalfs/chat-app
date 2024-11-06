import { ReactToMessageUseCaseImpl } from "@/application/use-cases/react-to-message";
import {
  IMessageRepository,
  MessageReactionParams,
} from "@/domain/repositories";
import { ReactToMessageUseCase } from "@/domain/use-cases/message";

describe("ReactToMessageUseCase", () => {
  let messageRepository: jest.Mocked<IMessageRepository>;
  let reactToMessageUseCase: ReactToMessageUseCase;

  beforeEach(() => {
    messageRepository = {
      getMessages: jest.fn(),
      createMessage: jest.fn(),
      addReaction: jest.fn(),
      removeReaction: jest.fn(),
    };

    reactToMessageUseCase = new ReactToMessageUseCaseImpl(messageRepository);
  });

  const mockReactionParams: MessageReactionParams & {
    currentUserHasAlreadyReacted: boolean;
  } = {
    userId: 123,
    messageId: 456,
    emojiUnicode: "👍",
    emojiDescription: "thumbs up",
    currentUserHasAlreadyReacted: false,
  };

  it("should add reaction when user has not already reacted", async () => {
    await reactToMessageUseCase.execute(mockReactionParams);

    expect(messageRepository.addReaction).toHaveBeenCalledWith(
      mockReactionParams
    );
    expect(messageRepository.removeReaction).not.toHaveBeenCalled();
  });

  it("should remove reaction when user has already reacted", async () => {
    const params = {
      ...mockReactionParams,
      currentUserHasAlreadyReacted: true,
    };

    await reactToMessageUseCase.execute(params);

    expect(messageRepository.removeReaction).toHaveBeenCalledWith(params);
    expect(messageRepository.addReaction).not.toHaveBeenCalled();
  });
});
