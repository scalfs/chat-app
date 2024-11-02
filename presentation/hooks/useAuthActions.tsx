import { SignInUserUseCaseImpl } from "@/application/use-cases/sign-in-user";
import { useMutation } from "@tanstack/react-query";
import { useCallback } from "react";
import { useAuth } from "../providers/auth-provider";
import { useDependencies } from "../providers/dependency-provider";

export function useSignIn() {
  const { storeUser } = useAuth();
  const { userRepository } = useDependencies();

  const signIn = useCallback(
    async (username: string) => {
      const signInUseCase = new SignInUserUseCaseImpl(userRepository);
      return signInUseCase.execute({ username }).then(storeUser);
    },
    [storeUser]
  );

  return useMutation({ mutationFn: signIn, mutationKey: ["sign-in-user"] });
}

export function useSignOut() {
  const { clearUser } = useAuth();

  return clearUser;
}
