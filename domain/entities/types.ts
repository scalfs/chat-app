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
