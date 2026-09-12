/* Importación del cliente Axios para realizar solicitudes HTTP */
import axios from "axios";

/* Creación de una instancia de Axios con configuración */
export const axiosClient = axios.create({
  baseURL: "https://fiqnlopbjnvxejykfelx.supabase.co/rest/v1",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    /* Clave pública de Supabase utilizada por la aplicación para
    realizar solicitudes a la API. El acceso a los datos se
    controla mediante las políticas RLS. */
    apikey: "sb_publishable_udTnK2S-gOCD7_9uUO-F8w_OqbRT7nB",
  },
});

/* Configura el cliente Axios para realizar las peticiones a nuestra API. */
axiosClient.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => Promise.reject(error),
);
