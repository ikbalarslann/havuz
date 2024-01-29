import { auth } from "@/auth";
import { db } from "@/lib/db";

export const currentUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
  });

  return user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
