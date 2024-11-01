import { User } from "../entities";

export interface SignInUserInput {
  username: string;
}

export interface SignInUserUseCase {
  execute(input: SignInUserInput): Promise<User>;
}
