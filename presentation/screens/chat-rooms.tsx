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
import { Spinner } from "@/components/ui/spinner";
import { Text } from "@/components/ui/text";
import { ChatDetails } from "@/domain/entities";
import {
  UsernameForm,
  UsernameFormData,
} from "@/presentation/components/username-form";
import { useSignOut } from "@/presentation/hooks/useAuthActions";
import {
  useCreateChatRoom,
  useGetChatRooms,
} from "@/presentation/hooks/useChatRooms";
import { useCustomToast } from "@/presentation/hooks/useCustomToast";
import { useAuth } from "@/presentation/providers/auth-provider";
import { useHeaderHeight } from "@react-navigation/elements";
import { Link, router, useNavigation } from "expo-router";
import { LogOut, MessageCircle } from "lucide-react-native";
import { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function ChatRoomsScreen() {
  const navigation = useNavigation();
  const headerHeight = useHeaderHeight();
  const { bottom } = useSafeAreaInsets();

  const { user } = useAuth();
  const signOut = useSignOut();
  const { showToast } = useCustomToast();

  const {
    refetch,
    isLoading,
    isRefetching,
    data: chatRooms,
  } = useGetChatRooms();
  const { mutateAsync: createChatRoom, isPending: isCreatingChatRoom } =
    useCreateChatRoom();

  const [modalIsVisible, setModalIsVisible] = useState(false);
  const hideModal = () => setModalIsVisible(false);
  const showModal = () => setModalIsVisible(true);

  const navigateToChatRoom = (params: { id: number; name: string }) =>
    router.navigate({ pathname: "/chat-rooms/[id]", params });

  const onSubmit = async ({ username }: UsernameFormData) => {
    if (!user) return;
    try {
      const chat = await createChatRoom({ username, currentUserId: user.id });
      hideModal();
      navigateToChatRoom({ id: chat.id, name: username });
    } catch (error) {
      const errorTitle = "Create chat error";
      const errorDescription =
        error instanceof Error ? error.message : "Failed to create chat room";
      showToast({ title: errorTitle, description: errorDescription });
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
        data={chatRooms}
        onRefresh={refetch}
        refreshing={isRefetching}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ChatItem {...item} />}
        ListEmptyComponent={() => <EmptyChatList {...{ isLoading }} />}
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
        isLoading={isCreatingChatRoom}
        {...{ modalIsVisible, hideModal, onSubmit }}
      />
    </>
  );
}

function ChatItem({ id, name, timestamp, last_message }: ChatDetails) {
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
          <Text className="text-md truncate">{last_message}</Text>
        </Box>
      </Pressable>
    </Link>
  );
}

function EmptyChatList({ isLoading }: { isLoading: boolean }) {
  return (
    <Box className="items-center mt-4">
      {isLoading ? (
        <Spinner />
      ) : (
        <Text>Press "New Chat" to start a conversation.</Text>
      )}
    </Box>
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
