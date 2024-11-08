import { ChatMessage } from "@/domain/entities";
import { format, parseISO } from "date-fns";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { FlatList, KeyboardAvoidingView, Platform } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { MessageForm } from "../components/message-form";
import { Avatar, AvatarFallbackText } from "../components/ui/avatar";
import { Box } from "../components/ui/box";
import { HStack } from "../components/ui/hstack";
import { Spinner } from "../components/ui/spinner";
import { Text } from "../components/ui/text";
import { useHeaderHeight } from "../hooks/useHeaderHeight";
import {
  LIKE_REACTION,
  useLikeMessageOptimisticUpdate,
} from "../hooks/useLikeMessage";
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
  const { toggleLike, isLikedByCurrentUser, otherUsersLikeReactionsCount } =
    useLikeMessageOptimisticUpdate(message, currentUserId);
  const tap = Gesture.Tap().numberOfTaps(2).onEnd(toggleLike);

  const isSent = message.user_id === currentUserId;
  const alignment = isSent ? "items-end" : "items-start";
  const bgColor = isSent ? "bg-primary-500" : "bg-background-50";
  const textColor = isSent ? "text-typography-0" : "text-typography-700";

  const formatTime = (date: string) => format(parseISO(date), "hh:mm a");

  return (
    <GestureDetector gesture={tap}>
      <Box className={`flex ${alignment} relative`}>
        <Box className={`max-w-[70%] rounded-lg p-3 ${bgColor}`}>
          <Text className={textColor}>{message.content}</Text>
          <Text size="sm" className={`${textColor}/50 mt-1`}>
            {formatTime(message.created_at)}
          </Text>
          <LikeEmoji
            {...{
              isSent,
              bgColor,
              textColor,
              isLikedByCurrentUser,
              otherUsersLikeReactionsCount,
            }}
          />
        </Box>
      </Box>
    </GestureDetector>
  );
}

function Loading() {
  return <Spinner className="mt-4" />;
}

interface LikeEmojiProps {
  isSent: boolean;
  bgColor: string;
  textColor: string;
  isLikedByCurrentUser: boolean;
  otherUsersLikeReactionsCount: number;
}

function LikeEmoji({
  isSent,
  bgColor,
  textColor,
  isLikedByCurrentUser,
  otherUsersLikeReactionsCount,
}: LikeEmojiProps) {
  const emojiAlignment = isSent ? "left-[-10px]" : "right-[-10px]";

  const shouldDisplayEmoji =
    isLikedByCurrentUser || otherUsersLikeReactionsCount > 0;
  const shouldDisplayCount =
    isLikedByCurrentUser && otherUsersLikeReactionsCount > 0;

  if (!shouldDisplayEmoji) return null;

  return (
    <HStack
      className={`absolute ${emojiAlignment} bottom-[-10px] rounded-full ${bgColor} p-0.5 items-center`}
    >
      <Text aria-label="thumbs up emoji">{LIKE_REACTION.emojiUnicode}</Text>
      {shouldDisplayCount && (
        <Text size="sm" className={`${textColor}/50`}>
          +{otherUsersLikeReactionsCount}
        </Text>
      )}
    </HStack>
  );
}
