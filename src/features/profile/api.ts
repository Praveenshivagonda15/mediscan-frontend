import { api } from '@/lib/axios';
import type { User } from '@/types/user';

export async function updateProfile(input: { name: string }): Promise<User> {
  const { data } = await api.patch<{ success: true; data: { user: User } }>('/api/auth/me', input);
  return data.data.user;
}

export async function logoutAllDevices(): Promise<void> {
  await api.post('/api/auth/logout-all');
}