import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

export default function Page() {
  return (
    <VStack
      space="xl"
      className="max-w-md w-full h-full p-4 justify-center sm:self-center"
    >
      <VStack className="sm:items-center" space="md">
        <Heading size="3xl">Welcome!</Heading>
        <Text>Enter your username to start using TrashLab Chat App</Text>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl
            // isInvalid={!!errors?.email || !validated.emailValid}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>

            <Input>
              <InputField
                placeholder="Enter username"
                // value={value}
                // onChangeText={onChange}
                // onBlur={onBlur}
                // onSubmitEditing={handleKeyPress}
                returnKeyType="done"
              />
            </Input>
          </FormControl>
        </VStack>
        <VStack className="w-full my-7 " space="lg">
          <Button
            className="w-full"
            onPress={() => {
              // handleSubmit(onSubmit)
            }}
          >
            <ButtonText className="font-medium">Sign In</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
}
