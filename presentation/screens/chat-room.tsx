import { ChatMessage } from "@/domain/entities";
import { useHeaderHeight } from "@react-navigation/elements";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { Send } from "lucide-react-native";
import { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Avatar, AvatarFallbackText } from "../components/ui/avatar";
import { Box } from "../components/ui/box";
import { Button, ButtonIcon } from "../components/ui/button";
import { HStack } from "../components/ui/hstack";
import { Input, InputField } from "../components/ui/input";
import { Spinner } from "../components/ui/spinner";
import { Text } from "../components/ui/text";
import { useGetMessages } from "../hooks/useMessages";

export function ChatRoomScreen() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();
  const { name, id } = useLocalSearchParams();

  const {
    isLoading,
    isPending,
    refetch,
    isRefetching,
    data: messages,
  } = useGetMessages(Number(id));

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
        data={messages}
        onRefresh={refetch}
        refreshing={isRefetching}
        className="flex-1 p-4"
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Message {...item} />}
        ListEmptyComponent={isPending ? LoadingMessage : null}
        ListFooterComponent={isLoading ? LoadingMessage : null}
        contentContainerStyle={{ paddingTop: headerHeight, gap: 16 }}
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

function Message(message: ChatMessage, userId: number) {
  const isSent = message.user_id === userId;
  const alignment = isSent ? "items-end" : "items-start";
  const bgColor = isSent ? "bg-primary-500" : "bg-background-50";
  const textColor = isSent ? "text-typography-0" : "text-typography-700";

  return (
    <Box className={`flex ${alignment}`}>
      <Box className={`max-w-[70%] rounded-lg p-3 ${bgColor}`}>
        <Text className={textColor}>{message.content}</Text>
        <Text size="sm" className={`${textColor}/50 mt-1`}>
          {message.created_at}
        </Text>
      </Box>
    </Box>
  );
}

function LoadingMessage() {
  return <Spinner className="mt-4" />;
}
