import { API_BASE_URL } from "../../common/config";
import { User } from "../../users/domain/User";
import { AuthToken, LoginCredentials } from "../domain/auth";


export const authService = {
  async login(credentials: LoginCredentials): Promise<{ user: User; token: AuthToken }> {
    const url = `${API_BASE_URL}/auth/login`
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(credentials)
    })
    const status = response.status
    if (!response.ok) {
      if (status >= 500) {
        throw new Error(`Error al conectarse con el servidor.`)
      }
      const error = await response.json()
      console.error("authService", error)
      throw new Error(`${error.error}`)
    }
    const { data } = await response.json()
    return data;
  }
};