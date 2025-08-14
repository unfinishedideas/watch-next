import { type ReactNode, useState } from "react";
import User, { type UserContextType } from "../classes/User.ts";
import UserContext from "./UserContext.ts";

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const contextValue: UserContextType = {
    user,
    setUser,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
