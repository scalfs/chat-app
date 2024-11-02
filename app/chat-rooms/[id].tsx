import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Send } from "lucide-react-native";
import { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MOCKED_MESSAGES = [
  { id: 1, text: "Hey, how are you?", sent: false, timestamp: "10:00 AM" },
  {
    id: 2,
    text: "I'm good, thanks! How about you?",
    sent: true,
    timestamp: "10:02 AM",
  },
  {
    id: 3,
    text: "I'm doing well too. Any plans for the weekend?",
    sent: false,
    timestamp: "10:05 AM",
  },
];

export default function Page() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();
  const { name } = useLocalSearchParams();

  useEffect(() => {
    navigation.setOptions({
      title: name,
      headerRight: () => (
        <Avatar className="h-8 w-8">
          <AvatarFallbackText>{name}</AvatarFallbackText>
        </Avatar>
      ),
    });
  }, []);

  const handleSend = () => {};

  return (
    <>
      <FlatList
        data={MOCKED_MESSAGES}
        className="flex-1 p-4"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Message {...item} />}
        contentContainerClassName="gap-4"
        contentContainerStyle={{ paddingTop: headerHeight }}
      />
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })}>
        <HStack
          style={{ paddingBottom: bottom || 16 }}
          className="p-4 border-t border-primary-0 w-full items-center gap-2"
        >
          <Input className="flex-1">
            <InputField
              placeholder="Type a message"
              value={""}
              // onChange={(e) => setNewMessage(e.target.value)}
            />
          </Input>
          <Button onPress={handleSend}>
            <ButtonIcon as={Send} className="h-6 w-6" />
          </Button>
        </HStack>
      </KeyboardAvoidingView>
    </>
  );
}

interface Message {
  id: number;
  text: string;
  sent: boolean;
  timestamp: string;
}

function Message(message: Message) {
  const alignment = message.sent ? "items-end" : "items-start";
  const bgColor = message.sent ? "bg-primary-500" : "bg-background-50";
  const textColor = message.sent ? "text-typography-0" : "text-typography-700";

  return (
    <Box className={`flex ${alignment}`}>
      <Box className={`max-w-[70%] rounded-lg p-3 ${bgColor}`}>
        <Text className={textColor}>{message.text}</Text>
        <Text size="sm" className={`${textColor}/50 mt-1`}>
          {message.timestamp}
        </Text>
      </Box>
    </Box>
  );
}
