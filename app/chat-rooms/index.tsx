import { CreateChatRoomUseCaseImpl } from "@/application/use-cases/create-chat-room";
import { Avatar, AvatarFallbackText } from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button, ButtonIcon, ButtonText } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { HStack } from "@/components/ui/hstack";
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { UsernameForm, UsernameFormData } from "@/components/username-form";
import { useAuth } from "@/presentation/providers/auth-provider";
import { useDependencies } from "@/presentation/providers/dependency-provider";
import { useCustomToast } from "@/src/hooks/useCustomToast";
import { useHeaderHeight } from "@react-navigation/elements";
import { Link, router, useNavigation } from "expo-router";
import { LogOut, MessageCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
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

  const { user, signOut } = useAuth();
  const { showToast } = useCustomToast();
  const { chatRepository, userRepository } = useDependencies();

  const [isLoading, setIsLoading] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const hideModal = () => setModalIsVisible(false);
  const showModal = () => setModalIsVisible(true);

  const onSubmit = async ({ username }: UsernameFormData) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const createChatRoomUseCase = new CreateChatRoomUseCaseImpl(
        userRepository,
        chatRepository
      );
      const chat = await createChatRoomUseCase.execute({
        username,
        currentUserId: user.id,
      });
      hideModal();
      router.navigate({
        pathname: "/chat-rooms/[id]",
        params: { id: chat.id, name: username },
      });
    } catch (error) {
      const errorTitle = "Create chat error";
      const errorDescription =
        error instanceof Error ? error.message : "Failed to create chat room";
      showToast({ title: errorTitle, description: errorDescription });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({
      title: "Chat Rooms",
      headerRight: () => (
        <Button onPress={signOut} variant="link">
          <ButtonIcon as={LogOut} className="h-6 w-6" />
        </Button>
      ),
    });
  }, []);

  return (
    <>
      <FlatList
        data={MOCKED_CHATS}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ChatItem {...item} />}
        ListEmptyComponent={() => (
          <Text className="text-center mt-4">
            Press "New Chat" to start a conversation.
          </Text>
        )}
        contentContainerStyle={{ paddingTop: headerHeight }}
      />
      <Button
        size="xl"
        onPress={showModal}
        style={{ bottom: bottom || 16 }}
        className="absolute right-4 rounded-full"
      >
        <ButtonIcon as={MessageCircle} className="h-6 w-6" />
        <ButtonText>New Chat</ButtonText>
      </Button>
      <CreateChatModal
        {...{ modalIsVisible, hideModal, isLoading, onSubmit }}
      />
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
    <Link asChild href={{ pathname: "/chat-rooms/[id]", params: { id, name } }}>
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

interface CreateChatModalProps {
  isLoading: boolean;
  hideModal: () => void;
  modalIsVisible: boolean;
  onSubmit: (data: UsernameFormData) => Promise<void>;
}

function CreateChatModal({
  onSubmit,
  isLoading,
  hideModal,
  modalIsVisible,
}: CreateChatModalProps) {
  return (
    <Modal size="md" isOpen={modalIsVisible} onClose={!isLoading && hideModal}>
      <ModalBackdrop />
      <ModalContent>
        <ModalHeader>
          <Heading size="md">Who do you want to chat with?</Heading>
        </ModalHeader>

        <ModalBody>
          <Text size="sm">
            In the TrashLab Chat App you can message any user by entering their
            username here.
          </Text>
        </ModalBody>

        <UsernameForm
          autoFocus
          {...{ onSubmit, isLoading }}
          buttonLabel={isLoading ? "Creating..." : "Create Chat"}
        />
      </ModalContent>
    </Modal>
  );
}
