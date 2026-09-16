/* Contexto de la receta que indica la fuente de la receta,
sirve para hacer reutilizable el componente de lista de recetas:
RecipeComponent, y poderle pasar listas de recetas tanto de la api
como locales (SQLite) */
export type RecipeContext = {

/* context:medieval = source (api)    
   context:modern = source (SQLite local) */
   context: "medieval" | "modern" | "favorite";
};

/* Contexto detallado de la receta que indica la fuente y el ID de 
   la receta, sirve para hacer reutilizable el componente de recetas 
   detalladas: RecipeDetailComponent, y poderle pasar recetas tanto 
   de la api como locales (SQLite) */
export type DetailedRecipeContext = {

/* context:medieval = source (api)    
   context:modern = source (SQLite local)
   context:favorite = source (api + sqlite) */
   context: "medieval" | "modern" | "favorite";
   id: number;
};




