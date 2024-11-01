import { User } from "@/domain/entities";
import { IUserRepository } from "@/domain/repositories";
import { SignInUserInput, SignInUserUseCase } from "@/domain/use-cases/user";

export class SignInUserUseCaseImpl implements SignInUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ username }: SignInUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) return existingUser;

    return this.userRepository.createUser(username);
  }
}
