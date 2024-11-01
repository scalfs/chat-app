import { User } from "../entities/types";

export interface SignInUserInput {
  username: string;
}

export interface SignInUserUseCase {
  execute(input: SignInUserInput): Promise<User>;
}
