import { SignInUserUseCaseImpl } from "@/application/use-cases/sign-in-user";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  UsernameForm,
  UsernameFormData,
} from "@/presentation/components/username-form";
import { useCustomToast } from "@/presentation/hooks/useCustomToast";
import { useAuth } from "@/presentation/providers/auth-provider";
import { useDependencies } from "@/presentation/providers/dependency-provider";
import { useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function Page() {
  const { signIn } = useAuth();
  const headerHeight = useHeaderHeight();
  const { showToast } = useCustomToast();
  const { userRepository } = useDependencies();
  const [isLoading, setIsLoading] = useState(false);

  const navigateToInitialPage = () => router.replace("/");

  const onSubmit = async ({ username }: UsernameFormData) => {
    try {
      setIsLoading(true);
      const signInUseCase = new SignInUserUseCaseImpl(userRepository);
      const user = await signInUseCase.execute({ username });
      signIn(user);
      navigateToInitialPage();
    } catch (error) {
      const errorTitle = "Error signing in.";
      const errorDescription =
        error instanceof Error ? error.message : "Please try again later.";
      showToast({ title: errorTitle, description: errorDescription });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })}>
      <VStack
        space="xl"
        style={{ paddingBottom: headerHeight }} // To ensure center alignment
        className="max-w-md w-full h-full p-4 justify-center sm:self-center"
      >
        <VStack className="sm:items-center" space="md">
          <Heading size="3xl">Welcome!</Heading>
          <Text>Enter your username to start using TrashLab Chat App</Text>
        </VStack>
        <UsernameForm
          {...{ onSubmit, isLoading }}
          buttonLabel={isLoading ? "Signing in..." : "Sign in"}
        />
      </VStack>
    </KeyboardAvoidingView>
  );
}
