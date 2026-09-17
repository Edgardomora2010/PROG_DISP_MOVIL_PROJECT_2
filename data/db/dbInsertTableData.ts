/* Importación del hook para operaciones CRUD de usuarios */
import { useUsersCRUD } from "../../hooks/useUsersCRUD";

/* Por motivos académicos, se inserta un usuario por defecto
porque no se alcanzó a desarrollar un módulo para agregar usuarios
al sistema, o implementar su autenticación completa y con seguridad. 
Sin embargo, se decidió incluir la lectura del usuario por defecto 
desde base de datos y simular el inicio de sesión. Permitiéndose validar
la existencia del usuario en base de datos. */

/* HOOK PARA INSERTAR DATOS INICIALES EN LA BASE DE DATOS */
export const useDBInsertTableData = () => {
  const { addUser, userExist } = useUsersCRUD();

  /* Inserta el usuario por defecto si todavía no existe */
  const insertDefaultUserData = async () => {
    const exists = await userExist("admin");

    /* Inserta el usuario y contraseña por defecto si no existe */
    if (!exists) {
      await addUser("admin", "admin1234");
    }
  };

  return {
    insertDefaultUserData,
  };
};
