import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import * as authApi from './api';
import type { LoginInput, ResetPasswordInput, SignupInput } from './schemas';
import { useAuthStore } from '@/stores/authStore';
import { queryClient } from '@/lib/queryClient';

export function useLogin() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  return useMutation({
    mutationFn: (input: LoginInput) => authApi.login(input),
    onSuccess: (data) => {
      queryClient.clear();
      setSession(data);
      toast.success(`Welcome back, ${data.user.name.split(' ')[0]}`);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useSignup() {
  const navigate = useNavigate();
  const setSession = useAuthStore((state) => state.setSession);
  return useMutation({
    mutationFn: (input: SignupInput) => authApi.signup(input),
    onSuccess: (data) => {
      queryClient.clear();
      setSession(data);
      toast.success(`Welcome, ${data.user.name.split(' ')[0]}`);
      navigate('/dashboard', { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useLogout() {
  const navigate = useNavigate();
  const clear = useAuthStore((state) => state.clear);
  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      clear();
      navigate('/login', { replace: true });
    },
    onError: (error) => toast.error(error.message),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: authApi.forgotPassword,
    onError: (error) => toast.error(error.message),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (input: ResetPasswordInput) => authApi.resetPassword(input),
    onError: (error) => toast.error(error.message),
  });
}