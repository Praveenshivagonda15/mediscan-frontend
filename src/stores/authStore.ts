import { create } from 'zustand';
import type { User } from '@/types/user';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isBootstrapped: boolean;
  setSession: (p: { user: User; accessToken: string }) => void;
  setUser: (user: User) => void;
  setAccessToken: (t: string) => void;
  clear: () => void;
  markBootstrapped: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  isBootstrapped: false,
  setSession: ({ user, accessToken }) => set({ user, accessToken }),
  setUser: (user) => set({ user }),
  setAccessToken: (accessToken) => set({ accessToken }),
  clear: () => set({ user: null, accessToken: null }),
  markBootstrapped: () => set({ isBootstrapped: true }),
}));