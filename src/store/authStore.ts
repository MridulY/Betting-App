import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { auth } from '../lib/api';

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    isAdmin: boolean,
    adminToken: string,
    newAdminEmail: string,
    newAdminPassword: string
  ) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });
      const { token } = await auth.login(email, password);
      localStorage.setItem('token', token);
      const user = jwtDecode<User>(token);
      set({ user, error: null });
    } catch (error: any) {
      set({ error: error.message || 'Login failed' });
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (
  email: string,
  password: string,
  isAdmin: boolean,
  adminToken: string,
  newAdminEmail: string,
  newAdminPassword: string
) => {
  try {
    set({ isLoading: true, error: null });
    const { token } = await auth.register(
      email,
      password,
      isAdmin,
      adminToken,
      newAdminEmail,
      newAdminPassword
    );
    console.log("token after reg", token);
    localStorage.setItem('token', token);
    const user = jwtDecode<User>(token);
    set({ user, error: null });
  } catch (error: any) {
    set({ error: error.message || 'Registration failed' });
  } finally {
    set({ isLoading: false });
  }
},


  logout: async () => {
    try {
      set({ isLoading: true, error: null });
      await auth.logout();
      set({ user: null, error: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },
}));

// Initialize auth state from stored token
const token = localStorage.getItem('token');
if (token) {
  try {
    const user = JSON.parse(atob(token)) as User;
    useAuthStore.setState({ user });
  } catch (error) {
    localStorage.removeItem('token');
  }
}