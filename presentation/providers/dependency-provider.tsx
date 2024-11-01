import {
  SupabaseChatRepository,
  SupabaseUserRepository,
} from "@/infrastructure/api/supabase/repositories";
import { createContext, PropsWithChildren, useContext } from "react";

const dependencies = {
  chatRepository: new SupabaseChatRepository(),
  userRepository: new SupabaseUserRepository(),
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
