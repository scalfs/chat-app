import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Box } from "./ui/box";
import { Button, ButtonSpinner, ButtonText } from "./ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorText,
} from "./ui/form-control";
import { Input, InputField } from "./ui/input";

const MAX_USERNAME_LENGTH = 32;

// Form validation schema
const usernameSchema = z.object({
  username: z
    .string()
    .min(1, "Username is required")
    .max(MAX_USERNAME_LENGTH, "Username is too long"),
});

export type UsernameFormData = z.infer<typeof usernameSchema>;

interface Props {
  isLoading: boolean;
  autoFocus?: boolean;
  buttonLabel: string;
  onSubmit: (data: UsernameFormData) => Promise<void>;
}

export const UsernameForm = ({
  onSubmit,
  isLoading,
  autoFocus,
  buttonLabel,
}: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<UsernameFormData>({
    resolver: zodResolver(usernameSchema),
    defaultValues: { username: "" },
  });

  const onSubmitHandler = async ({ username }: UsernameFormData) => {
    try {
      const formattedData = username.trim();
      await onSubmit({ username: formattedData });
    } catch (error) {
      if (error instanceof Error) {
        setError("username", { type: "manual", message: error.message });
      }
    }
  };

  return (
    <Box className="gap-2">
      <Controller
        name="username"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl className="mb-4" isInvalid={!!errors.username}>
            <Input>
              <InputField
                value={value}
                returnKeyType="done"
                autoFocus={autoFocus}
                editable={!isLoading}
                autoCapitalize="none"
                onChangeText={onChange}
                placeholder="Enter username"
                onSubmitEditing={handleSubmit(onSubmitHandler)}
              />
            </Input>
            <FormControlError>
              <FormControlErrorText>
                {errors.username?.message}
              </FormControlErrorText>
            </FormControlError>
          </FormControl>
        )}
      />

      <Button onPress={handleSubmit(onSubmitHandler)} disabled={isLoading}>
        {isLoading && <ButtonSpinner />}
        <ButtonText>{buttonLabel}</ButtonText>
      </Button>
    </Box>
  );
};