import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { AlertTriangle } from "lucide-react-native";

const Page = () => {
  return (
    <VStack className="max-w-[440px] w-full" space="md">
      <VStack className="md:items-center" space="md">
        <Heading className="md:text-center" size="3xl">
          Log in
        </Heading>
        <Text>Login to start using TrashLab Chat App</Text>
      </VStack>
      <VStack className="w-full">
        <VStack space="xl" className="w-full">
          <FormControl
            isInvalid
            // isInvalid={!!errors?.email || !validated.emailValid}
            className="w-full"
          >
            <FormControlLabel>
              <FormControlLabelText>Username</FormControlLabelText>
            </FormControlLabel>

            <Input>
              <InputField
                placeholder="Enter email"
                // value={value}
                // onChangeText={onChange}
                // onBlur={onBlur}
                // onSubmitEditing={handleKeyPress}
                returnKeyType="done"
              />
            </Input>
            <FormControlError>
              <FormControlErrorIcon as={AlertTriangle} />
              <FormControlErrorText>
                {/* {errors?.email?.message ||
                  (!validated.emailValid && "Email ID not found")} */}
                Username already exists
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        </VStack>
        <VStack className="w-full my-7 " space="lg">
          <Button
            className="w-full"
            onPress={() => {
              // handleSubmit(onSubmit)
            }}
          >
            <ButtonText className="font-medium">Log in</ButtonText>
          </Button>
        </VStack>
      </VStack>
    </VStack>
  );
};

export default Page;
