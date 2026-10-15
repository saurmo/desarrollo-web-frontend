'use client';
import { useState } from "react";
import { RegisterPayload, RegisterState } from "../domain/register";
import { registerService } from "../services/register.service";

/**
 * Hook que maneja la PETICIÓN de registro: llama al servicio y guarda su estado
 * (cargando, error y éxito). No sabe nada del formulario; eso es trabajo de useRegisterForm.
 *
 * Es el equivalente a useAuth en el login.
 */
export function useRegister() {
  const [state, setState] = useState<RegisterState>({
    isLoading: false,
    error: null,
    registeredName: null
  });

  /**
   * Registra al usuario en el backend.
   * Retorna true si salió bien y false si falló, para que el formulario sepa si debe limpiarse.
   */
  const register = async (payload: RegisterPayload): Promise<boolean> => {
    // Antes de llamar: activamos el "cargando" y borramos errores o éxitos anteriores
    setState({ isLoading: true, error: null, registeredName: null });

    try {
      const response = await registerService.register(payload);
      setState({ isLoading: false, error: null, registeredName: response.name });
      return true;
    } catch (err: unknown) {
      // catch recibe "unknown": verificamos que sea un Error antes de leer .message
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado al registrar el usuario';
      setState({ isLoading: false, error: errorMessage, registeredName: null });
      return false;
    }
  };

  /** Oculta el mensaje de error (se usa en la ✕ de la alerta). */
  const clearError = () => {
    // Usamos la forma con función (prev) para modificar solo "error" y conservar lo demás
    setState((prev) => ({ ...prev, error: null }));
  };

  return {
    isLoading: state.isLoading,
    error: state.error,
    registeredName: state.registeredName,
    register,
    clearError
  };
}
