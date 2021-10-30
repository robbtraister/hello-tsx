import { createContext, useContext } from "react";

import userData from "public/user.json";
export type User = typeof userData;

const userContext = createContext<User>({ name: "" });

function useUser() {
  return useContext(userContext);
}

export default userContext;

export { useUser };
