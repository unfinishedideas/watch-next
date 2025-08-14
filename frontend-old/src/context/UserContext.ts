import { createContext } from "react";
import { UserContextType } from "../classes/User.ts";

const UserContext = createContext<UserContextType | undefined>(undefined);

export default UserContext;
