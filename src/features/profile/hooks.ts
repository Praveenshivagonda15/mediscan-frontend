import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';
import { ApiClientError } from '@/types/api';
import * as api from './api';

export function useUpdateProfile() {
  const setUser = useAuthStore((s) => s.setUser);
  return useMutation({
    mutationFn: (input: { name: string }) => api.updateProfile(input),
    onSuccess: (user) => {
      setUser(user);
      toast.success('Profile updated');
    },
    onError: (err) => toast.error(err instanceof ApiClientError ? err.message : 'Could not save.'),
  });
}

export function useLogoutAllDevices() {
  const clear = useAuthStore((s) => s.clear);
  const qc = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => api.logoutAllDevices(),
    onSuccess: () => {
      toast.success('Logged out everywhere');
      clear();
      qc.clear();
      navigate('/login', { replace: true });
    },
    onError: (err) => toast.error(err instanceof ApiClientError ? err.message : 'Failed.'),
  });
}