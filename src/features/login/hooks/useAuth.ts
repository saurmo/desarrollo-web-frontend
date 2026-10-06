'use client';
import { useCallback, useEffect, useState } from "react";
import { tokenStorage } from "../../common/services/token.storage";
import { LoginCredentials, LoginState } from "../domain/auth";
import { authService } from "../services/auth.service";

/**
 * Encapsulates full authentication lifecycle & state (loading, user, token storage persistence)
 */
export function useAuth() {
  const [state, setState] = useState<LoginState>({
    isLoading: false,
    error: null,
    user: null,
    isAuthenticated: false
  });

  // Re-hydrate session on mount
  useEffect(() => {
    const storedUser = tokenStorage.getUser();
    const storedToken = tokenStorage.getToken();

    if (storedUser && storedToken) {
      setState({
        isLoading: false,
        error: null,
        user: storedUser,
        isAuthenticated: true
      });
    }
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const response = await authService.login(credentials);
      
      // Persist to infrastructure adapters
      tokenStorage.saveToken(response.token);
      tokenStorage.saveUser(response.user);

      setState({
        isLoading: false,
        error: null,
        user: response.user,
        isAuthenticated: true
      });
      return true;
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Error inesperado al autenticar';
      setState({
        isLoading: false,
        error: errorMessage,
        user: null,
        isAuthenticated: false
      });
      return false;
    }
  };

  const logout = useCallback(() => {
    tokenStorage.clear();
    setState({
      isLoading: false,
      error: null,
      user: null,
      isAuthenticated: false
    });
  }, []);

  const clearError = () => {
    setState((prev) => ({ ...prev, error: null }));
  };

  return {
    isLoading: state.isLoading,
    error: state.error,
    user: state.user,
    isAuthenticated: state.isAuthenticated,
    login,
    logout,
    clearError
  };
}