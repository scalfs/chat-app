import { SupabaseChatRepository } from "@/infrastructure/repositories/chat";
import { SupabaseMessageRepository } from "@/infrastructure/repositories/message";
import { SupabaseUserRepository } from "@/infrastructure/repositories/user";
import { createContext, PropsWithChildren, useContext } from "react";

const dependencies = {
  chatRepository: new SupabaseChatRepository(),
  userRepository: new SupabaseUserRepository(),
  messageRepository: new SupabaseMessageRepository(),
};

const DependencyContext = createContext(dependencies);

export function DependencyProvider({ children }: PropsWithChildren) {
  return (
    <DependencyContext.Provider value={dependencies}>
      {children}
    </DependencyContext.Provider>
  );
}

export function useDependencies() {
  const context = useContext(DependencyContext);
  if (context === undefined) {
    throw new Error(
      "useDependencies must be used within an DependencyProvider"
    );
  }
  return context;
}
