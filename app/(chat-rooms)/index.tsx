import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import { Text } from "@/components/ui/text";
import { useHeaderHeight } from "@react-navigation/elements";
import { Link, useNavigation } from "expo-router";
import { MessageCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const MOCKED_CHATS = [
  {
    id: 1,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    timestamp: "2m ago",
  },
  {
    id: 2,
    name: "Jane Smith",
    lastMessage: "Can we meet tomorrow?",
    timestamp: "1h ago",
  },
  {
    id: 3,
    name: "Bob Johnson",
    lastMessage: "Thanks for your help!",
    timestamp: "2h ago",
  },
];

export default function Page() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();

  useEffect(() => {
    navigation.setOptions({ title: "Chat Rooms" });
  }, [navigation]);

  return (
    <>
      <FlatList
        data={MOCKED_CHATS}
        renderItem={({ item }) => <ChatItem {...item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingTop: headerHeight }}
      />
      <Button
        size="xl"
        variant="solid"
        style={{ bottom: bottom || 16 }}
        className="absolute right-4 rounded-full"
        onPress={() => {}}
      >
        <ButtonIcon as={MessageCircle} className="h-6 w-6" />
        <ButtonText>New Chat</ButtonText>
      </Button>
    </>
  );
}

function ChatItem({
  id,
  name,
  timestamp,
  lastMessage,
}: (typeof MOCKED_CHATS)[0]) {
  return (
    <Link asChild href={{ pathname: "/[id]", params: { id, name } }}>
      <Pressable className="flex flex-row items-center p-4">
        <Avatar className="h-12 w-12">
          <AvatarFallbackText>{name}</AvatarFallbackText>
        </Avatar>
        <Box className="ml-4 flex-1">
          <HStack className="flex items-baseline justify-between">
            <Heading size="md">{name}</Heading>
            <Text className="text-sm">{timestamp}</Text>
          </HStack>
          <Text className="text-md truncate">{lastMessage}</Text>
        </Box>
      </Pressable>
    </Link>
  );
}
