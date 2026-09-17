/* Importaciones de React */
import { createContext, useContext, useState } from "react";
/* Importación del modelo para la lista de recetas */
import { RecipeList } from "../models/recipeList";

/* Contexto para compartir la lista de recetas favoritas */
const FavoriteRecipesContext = createContext<any>(null);

/* Estado compartido de recetas favoritas */
export const FavoriteRecipesProvider = ({ children }: any) => {
  /* Lista global de recetas favoritas */
  const [favoriteRecipes, setFavoriteRecipes] = useState<RecipeList[]>([]);

  return (
    <FavoriteRecipesContext.Provider
      value={{
        favoriteRecipes,
        setFavoriteRecipes,
      }}
    >
      {children}
    </FavoriteRecipesContext.Provider>
  );
};

/* Función para acceder al contexto */
export const useFavoriteRecipes = () => useContext(FavoriteRecipesContext);
