import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react-native";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button, ButtonIcon } from "../components/ui/button";
import { FormControl } from "../components/ui/form-control";
import { HStack } from "../components/ui/hstack";
import { Input, InputField } from "../components/ui/input";

const messageSchema = z.object({
  content: z
    .string()
    .min(1, "Message cannot be empty")
    .max(1024, "Message cannot be longer than 1024 characters"),
});

type MessageFormData = z.infer<typeof messageSchema>;

interface Props {
  isLoading?: boolean;
  onSubmit: (content: string) => void;
}

export function MessageForm({ onSubmit, isLoading }: Props) {
  const { control, handleSubmit, reset } = useForm<MessageFormData>({
    resolver: zodResolver(messageSchema),
    defaultValues: { content: "" },
  });

  const onSubmitHandler = ({ content }: MessageFormData) => {
    onSubmit(content.trim());
    reset();
  };

  return (
    <HStack className="p-4 border-t border-primary-0 w-full items-center gap-2">
      <Controller
        name="content"
        control={control}
        render={({ field: { onChange, value } }) => (
          <FormControl className="flex-1">
            <Input className="flex-1">
              <InputField
                placeholder="Type a message"
                value={value}
                onChangeText={onChange}
                editable={!isLoading}
                onSubmitEditing={handleSubmit(onSubmitHandler)}
              />
            </Input>
          </FormControl>
        )}
      />
      <Button onPress={handleSubmit(onSubmitHandler)} disabled={isLoading}>
        <ButtonIcon as={Send} className="h-6 w-6" />
      </Button>
    </HStack>
  );
}
