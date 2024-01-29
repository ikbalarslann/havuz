import { db } from "@/lib/db";

export const getPropertyByTitle = async (title: string) => {
  try {
    const property = await db.property.findUnique({ where: { title } });

    return property;
  } catch {
    return null;
  }
};
export const getPropertyById = async (id: string) => {
  try {
    const property = await db.property.findUnique({ where: { id } });

    return property;
  } catch {
    return null;
  }
};
export const getAllProperties = async () => {
  try {
    const properties = await db.property.findMany({});

    return properties;
  } catch (error) {
    return null;
  }
};
