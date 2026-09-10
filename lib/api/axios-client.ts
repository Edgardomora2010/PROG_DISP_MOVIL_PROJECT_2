/* Importación del cliente Axios para realizar solicitudes HTTP */
import { create } from "axios";

/* Creación de una instancia de Axios con configuración  */
export const axiosClient = create({
  baseURL: "https://fiqnlopbjnvxejykfelx.supabase.co/rest/v1",
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* Configura el cliente Axios para realizar las peticiones a nuestra API. */
axiosClient.interceptors.request.use(
  (config) => {
    // API Key
    config.headers.apikey = process.env.EXPO_PUBLIC_SUPABASE_KEY;
    return config;
  },
  (error) => Promise.reject(error),
);
