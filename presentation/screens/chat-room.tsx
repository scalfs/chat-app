import { ChatMessage } from "@/domain/entities";
import { format, parseISO } from "date-fns";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MessageForm } from "../components/message-form";
import { Avatar, AvatarFallbackText } from "../components/ui/avatar";
import { Box } from "../components/ui/box";
import { Spinner } from "../components/ui/spinner";
import { Text } from "../components/ui/text";
import { useHeaderHeight } from "../hooks/useHeaderHeight";
import { useCreateMessage, useGetMessages } from "../hooks/useMessages";
import useRefreshing from "../hooks/useRefreshing";
import { useAuth } from "../providers/auth-provider";

export function ChatRoomScreen() {
  const { user } = useAuth();
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();

  const { name, id } = useLocalSearchParams();
  const chatId = Number(id);

  const {
    isLoading,
    isPending,
    refetch,
    data: messages,
  } = useGetMessages(chatId);
  const { isRefreshing, refresh } = useRefreshing(refetch);
  const { mutate: createMessage, isPending: isCreatingMessage } =
    useCreateMessage(chatId);

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

  const handleSendMessage = (content: string) => createMessage(content);

  return (
    <>
      <FlatList
        data={messages}
        onRefresh={refresh}
        refreshing={isRefreshing}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Message {...item} currentUserId={user?.id!} />
        )}
        contentContainerClassName="gap-4 px-4 pb-8"
        contentContainerStyle={{ paddingTop: headerHeight + 16 }}
        ListEmptyComponent={isPending ? Loading : null}
        ListFooterComponent={isLoading && isCreatingMessage ? Loading : null}
      />
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding" })}>
        <Box style={{ paddingBottom: bottom || 16 }}>
          <MessageForm
            onSubmit={handleSendMessage}
            isLoading={isCreatingMessage}
          />
        </Box>
      </KeyboardAvoidingView>
    </>
  );
}

function Message({
  currentUserId,
  ...message
}: ChatMessage & { currentUserId: number }) {
  const isSent = message.user_id === currentUserId;
  const alignment = isSent ? "items-end" : "items-start";
  const bgColor = isSent ? "bg-primary-500" : "bg-background-50";
  const textColor = isSent ? "text-typography-0" : "text-typography-700";

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), "hh:mm a");
  };

  return (
    <Box className={`flex ${alignment}`}>
      <Box className={`max-w-[70%] rounded-lg p-3 ${bgColor}`}>
        <Text className={textColor}>{message.content}</Text>
        <Text size="sm" className={`${textColor}/50 mt-1`}>
          {formatTime(message.created_at)}
        </Text>
      </Box>
    </Box>
  );
}

function Loading() {
  return <Spinner className="mt-4" />;
}
