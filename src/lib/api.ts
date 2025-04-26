import axios from "axios";

const API_URL = `${process.env.REACT_APP_API_URL}`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Automatically attach token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      localStorage.setItem("token", token);
      return { token };
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  },

  register: async (
    email: string,
    password: string,
    isAdmin: boolean,
    adminToken: string,
    newAdminEmail?: string,
    newAdminPassword?: string
  ) => {
    try {
      const data = {
        email,
        password,
        isAdmin,
        adminToken,
        newAdminEmail,
        newAdminPassword,
      };

      const res = await api.post("/auth/register", data);
      const token = res.data.token;
      localStorage.setItem("token", token);
      return { token };
    } catch (err: any) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  },

  logout: () => {
    localStorage.removeItem("token");
  },
};

export default api;
