import { User } from "../../users/domain/User";
import { AuthToken, LoginCredentials } from "../domain/auth";


// Mock Infrastructure DB / Auth Server response
const MOCK_VALID_USER: User = {
  id: 'usr_772183',
  email: 'usuario@udem.edu.co',
  name: 'Alejandro Morales',
  role: 'admin',
  identification:"12313",
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
};

export const authService = {
  /**
   * Simulates POST /api/v1/auth/login
   */
  async login(credentials: LoginCredentials): Promise<{ user: User; token: AuthToken }> {
    // Synthetic network latency delay (1.2s)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    // Simulated business validation rules
    if (credentials.email === 'error@udem.edu.co') {
      throw new Error('Servidor inaccesible. Por favor intente más tarde.');
    }

    if (credentials.email !== 'usuario@udem.edu.co' || credentials.password !== 'Password123!') {
      throw new Error('Credenciales inválidas. Verifica tu correo y contraseña.');
    }

    const token: AuthToken = {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c3JfNzcyMTgzIiwibmFtZSI6IkFsZWphbmRybyBNb3JhbGVzIiwiaWF0IjoxNTE2MjM5MDIyfQ.signature',
      expiresIn: 3600,
      tokenType: 'Bearer'
    };

    return {
      user: MOCK_VALID_USER,
      token
    };
  }
};