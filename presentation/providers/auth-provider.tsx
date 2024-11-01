import { User } from "@/domain/entities";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  signOut: () => void;
  signIn: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const signIn = useCallback((user: User) => setUser(user), [setUser]);
  const signOut = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(
    () => ({ user, signIn, signOut, isAuthenticated: user !== null }),
    [user?.id, signIn, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
