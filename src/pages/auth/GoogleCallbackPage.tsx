import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export function GoogleCallbackPage() {
  const navigate = useNavigate();
  const isBootstrapped = useAuthStore((state) => state.isBootstrapped);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!isBootstrapped) return;
    navigate(accessToken ? '/dashboard' : '/login?error=oauth_failed', { replace: true });
  }, [accessToken, isBootstrapped, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex items-center gap-3 text-sm text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        Completing Google sign-in…
      </div>
    </div>
  );
}