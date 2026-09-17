/* Importación de la base de datos SQLite */
import { db } from "@/data/db/client";
/* Importación del esquema de usuarios */
import { users } from "@/data/db/schema";
/* Importación de la interfaz de usuario */
import { Users } from "@/models/users";
/* Importación de operadores de Drizzle ORM */
import { and, eq } from "drizzle-orm";

/* HOOK PARA OPERACIONES CRUD DE USUARIOS LOCALES */

export const useUsersCRUD = () => {
  /* Busca un usuario por nombre de usuario y contraseña */
  const readUser = async (
    username: string,
    password: string,
  ): Promise<Users | null> => {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.username, username), eq(users.password, password)));

    if (result.length > 0) {
      return result[0];
    }

    return null;
  };

  /* Agrega un nuevo usuario a la base de datos */
  const addUser = async (username: string, password: string) => {
    if (username.trim() === "") return;
    if (password.trim() === "") return;

    await db.insert(users).values({
      username,
      password,
      status: true,
      created_at: new Date(),
    });
  };

  /* Busca un usuario por nombre de usuario */
  const userExist = async (username: string) => {
    const result = await db
      .select()
      .from(users)
      .where(eq(users.username, username));

    return result.length > 0;
  };

  /* Valida si existe la combinación de usuario y contraseña */
  const validateUser = async (
    username: string,
    password: string,
  ): Promise<boolean> => {
    const result = await db
      .select()
      .from(users)
      .where(and(eq(users.username, username), eq(users.password, password)));

    if (result.length > 0) {
      return true;
    }
    return false;
  };

  return {
    readUser,
    addUser,
    userExist,
    validateUser,
  };
};
