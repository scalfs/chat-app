import { User } from "@/domain/entities/types";
import { IUserRepository } from "@/domain/repositories/interfaces";
import {
  SignInUserInput,
  SignInUserUseCase,
} from "@/domain/use-cases/sign-in-user";

export class SignInUserUseCaseImpl implements SignInUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute({ username }: SignInUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByUsername(username);

    if (existingUser) return existingUser;

    return this.userRepository.createUser(username);
  }
}
