import { auth } from "@/auth";
import { db } from "@/lib/db";

export const currentUser = async () => {
  try {
    const session = await auth();

    if (!session?.user) {
      return null;
    }

    const user = await db.user.findUnique({
      where: { id: session.user.id },
    });

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const logedUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
