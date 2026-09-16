/* Importación de la base de datos SQLite */
import { db } from "@/data/db/client";
/* Importación del esquema de recetas */
import { favoriteList, recipes } from "@/data/db/schema";
/* Importación del operador de igualdad de Drizzle ORM */
import { and, eq } from "drizzle-orm";

/* HOOK PARA OPERACIONES CRUD DE RECETAS LOCALES */

export const useRecipeCRUD = () => {
  /* Agrega una nueva receta a la base de datos */
  const addRecipe = async (
    title: string,
    ingredients: string,
    preparation: string,
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
    await db.delete(recipes).where(eq(recipes.id, id));
  };

  /* Obtiene todas las recetas almacenadas */
  const readAllRecipes = async () => {
    return await db.select().from(recipes);
  };

  /* Obtiene una receta según su ID */
  const readOneRecipe = async (id: number) => {
    return await db.select().from(recipes).where(eq(recipes.id, id));
  };

  /* Revisa si una receta está en la tabla/lista de favoritos */
  const recipeExist = async (recipe_id: number, recipe_context: string) => {
    return await db
      .select()
      .from(favoriteList)
      .where(
        and(
          eq(favoriteList.recipe_id, recipe_id),
          eq(favoriteList.recipe_context, recipe_context),
        ),
      );
  };

  /* Revisa si una receta está guardada como favorita */
  const isFavoriteRecipe = async (
    recipe_id: number,
    recipe_context: string,
  ) => {
    const result = await recipeExist(recipe_id, recipe_context);

    if (result.length > 0) {
      return result[0].favorite;
    }

    return false;
  };

  /* Obtiene todas las recetas favoritas según el contexto */
  const areThereFavoriteRecipes = async (recipe_context: string) => {
    const result = await db
      .select()
      .from(favoriteList)
      .where(
        and(
          eq(favoriteList.recipe_context, recipe_context),
          eq(favoriteList.favorite, true),
        ),
      );

    if (result.length > 0) {
      return true;
    }

    return false;
  };

  /* Obtiene todas las recetas guardadas como favoritas */
  const getAllFavoriteRecipes = async () => {
    return await db
      .select({
        recipe_id: favoriteList.recipe_id,
        recipe_context: favoriteList.recipe_context,
      })
      .from(favoriteList)
      .where(eq(favoriteList.favorite, true));
  };

  /* Actualizar o insertar una receta a la tabla/lista de favoritos */
  const updateOrInsertFavoriteRecipe = async (
    recipe_id: number,
    recipe_context: string,
  ) => {
    const result = await recipeExist(recipe_id, recipe_context);

    if (result.length > 0) {
      // Update
      await db
        .update(favoriteList)
        .set({ favorite: !result[0].favorite })
        .where(
          and(
            eq(favoriteList.recipe_id, recipe_id),
            eq(favoriteList.recipe_context, recipe_context),
          ),
        );
    } else {
      // Insert
      await db.insert(favoriteList).values({
        recipe_id: recipe_id,
        recipe_context: recipe_context,
        favorite: true,
      });
    }
  };

  /* Retorna las operaciones CRUD disponibles */
  return {
    addRecipe,
    deleteRecipe,
    readAllRecipes,
    readOneRecipe,
    recipeExist,
    updateOrInsertFavoriteRecipe,
    isFavoriteRecipe,
    areThereFavoriteRecipes,
    getAllFavoriteRecipes,
  };
};
