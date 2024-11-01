export interface User {
  id: number;
  username: string;
}

export interface Chat {
  id: number;
  created_at: string;
}

export interface ChatParticipant {
  chat_id: number;
  user_id: number;
}

export interface ChatMessage {
  id: number;
  chat_id: number;
  user_id: number;
  content: string;
  created_at: string;
}

export interface ChatDetails extends Omit<Chat, "created_at"> {
  name: string;
  timestamp: string;
  last_message: string;
}

export interface ChatParticipantDetails extends ChatParticipant {
  username: string;
}
