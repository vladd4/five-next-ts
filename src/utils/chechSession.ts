import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const checkSession = async () => {
  const session = await getServerSession(authOptions);
  return session;
};
