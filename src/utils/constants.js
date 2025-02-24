import {fileURLToPath} from 'url';
import {dirname} from 'path';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);

export const ROLES = {
    ADMIN: "admin",
    USER: "user"
  };
  
  export const ERROR_MESSAGES = {
    USER_NOT_FOUND: "Usuario no encontrado",
    EMAIL_ALREADY_IN_USE: "El email ya está en uso",
    INVALID_CREDENTIALS: "Credenciales inválidas"
  };

  export default __dirname;
  
