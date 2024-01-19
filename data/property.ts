import { db } from "@/lib/db";

export const getPropertyByTitle = async (title: string) => {
  try {
    const property = await db.property.findUnique({ where: { title } });

    return property;
  } catch {
    return null;
  }
};
