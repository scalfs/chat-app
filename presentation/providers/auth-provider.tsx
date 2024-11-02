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
  clearUser: () => void;
  storeUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const storeUser = useCallback((user: User) => setUser(user), [setUser]);
  const clearUser = useCallback(() => setUser(null), [setUser]);

  const value = useMemo(
    () => ({ user, storeUser, clearUser, isAuthenticated: user !== null }),
    [user?.id, storeUser, clearUser]
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
