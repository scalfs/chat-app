import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import {
  UsernameForm,
  UsernameFormData,
} from "@/presentation/components/username-form";
import { useSignIn } from "@/presentation/hooks/useAuthActions";
import { useCustomToast } from "@/presentation/hooks/useCustomToast";
import { useHeaderHeight } from "@react-navigation/elements";
import { router } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";

export function SingInScreen() {
  const headerHeight = useHeaderHeight();
  const { showToast } = useCustomToast();
  const { mutateAsync: signIn, isPending } = useSignIn();

  const navigateToInitialPage = () => router.replace("/");

  const onSubmit = async ({ username }: UsernameFormData) => {
    try {
      await signIn(username);
      navigateToInitialPage();
    } catch (error) {
      const errorTitle = "Error signing in.";
      const errorDescription =
        error instanceof Error ? error.message : "Please try again later.";
      showToast({ title: errorTitle, description: errorDescription });
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
          {...{ onSubmit }}
          isLoading={isPending}
          buttonLabel={isPending ? "Signing in..." : "Sign in"}
        />
      </VStack>
    </KeyboardAvoidingView>
  );
}
