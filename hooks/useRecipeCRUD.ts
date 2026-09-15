/* Importación de la base de datos SQLite */
import { db } from "@/data/db/client";
/* Importación del esquema de recetas */
import { recipes } from "@/data/db/schema";
/* Importación del operador de igualdad de Drizzle ORM */
import { eq } from "drizzle-orm";


/* HOOK PARA OPERACIONES CRUD DE RECETAS LOCALES */

export const useRecipeCRUD = () => {

  /* Agrega una nueva receta a la base de datos */
  const addRecipe = async (
    title: string,
    ingredients: string,
    preparation: string
  ) => {

    /* Evita guardar recetas sin título */
    if (title.trim() === "") {
      return;
    }

    /* Evita guardar recetas sin ingredientes */
    if (ingredients.trim() === "") {
      return;
    }

     /* Evita guardar recetas sin instrucciones de preparación */
    if (preparation.trim() === "") {
      return;
    }

    await db.insert(recipes).values({
      title,
      ingredients,
      preparation,
    });
  };


  /* Elimina una receta según su ID */
  const deleteRecipe = async (id: number) => {

    await db
      .delete(recipes)
      .where(eq(recipes.id, id));
  };


  /* Obtiene todas las recetas almacenadas */
  const readAllRecipes = async () => {

    return await db
      .select()
      .from(recipes);
  };


  /* Obtiene una receta según su ID */
  const readOneRecipe = async (id: number) => {

    return await db
      .select()
      .from(recipes)
      .where(eq(recipes.id, id));
  };

  /* Retorna las operaciones CRUD disponibles */
  return {
    addRecipe,
    deleteRecipe,
    readAllRecipes,
    readOneRecipe,
  };

};