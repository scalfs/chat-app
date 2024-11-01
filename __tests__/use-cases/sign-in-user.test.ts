import { SignInUserUseCaseImpl } from "@/application/use-cases/sign-in-user";
import { User } from "@/domain/entities";
import { IUserRepository } from "@/domain/repositories";

describe("SignInUserUseCase", () => {
  let userRepository: jest.Mocked<IUserRepository>;
  let signInUserUseCase: SignInUserUseCaseImpl;

  beforeEach(() => {
    userRepository = { findByUsername: jest.fn(), createUser: jest.fn() };
    signInUserUseCase = new SignInUserUseCaseImpl(userRepository);
  });

  it("should return existing user when found", async () => {
    const mockUser: User = { id: 1, username: "testuser" };
    userRepository.findByUsername.mockResolvedValue(mockUser);

    const result = await signInUserUseCase.execute({ username: "testuser" });

    expect(result).toEqual(mockUser);
    expect(userRepository.findByUsername).toHaveBeenCalledWith("testuser");
    expect(userRepository.createUser).not.toHaveBeenCalled();
  });

  it("should create and return new user when user not found", async () => {
    const mockUser: User = { id: 1, username: "testuser" };
    userRepository.findByUsername.mockResolvedValue(null);
    userRepository.createUser.mockResolvedValue(mockUser);

    const result = await signInUserUseCase.execute({ username: "testuser" });

    expect(result).toEqual(mockUser);
    expect(userRepository.findByUsername).toHaveBeenCalledWith("testuser");
    expect(userRepository.createUser).toHaveBeenCalledWith("testuser");
  });
});
