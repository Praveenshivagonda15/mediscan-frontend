import { api } from '@/lib/axios';
import type { User } from '@/types/user';
import type { LoginInput, ResetPasswordInput, SignupInput } from './schemas';

interface SessionResponse {
  user: User;
  accessToken: string;
  accessTokenExpiresIn: number;
}

function unwrap<T>(response: { data: { data: T } }): T {
  return response.data.data;
}

export async function login(input: LoginInput) {
  return unwrap<SessionResponse>(await api.post('/api/auth/login', input));
}

export async function signup(input: SignupInput) {
  return unwrap<SessionResponse>(await api.post('/api/auth/signup', input));
}

export async function refresh() {
  return unwrap<SessionResponse>(await api.post('/api/auth/refresh'));
}

export async function logout() {
  return unwrap<{ message: string }>(await api.post('/api/auth/logout'));
}

export async function verifyEmail(token: string) {
  return unwrap<{ message: string }>(await api.post('/api/auth/verify-email', { token }));
}

export async function forgotPassword(email: string) {
  return unwrap<{ message: string }>(await api.post('/api/auth/forgot-password', { email }));
}

export async function resetPassword(input: ResetPasswordInput) {
  return unwrap<{ message: string }>(await api.post('/api/auth/reset-password', input));
}