import { useEffect, useRef, type ReactNode } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import * as authApi from '@/features/auth/api';
import { GlassBackdrop } from '@/components/ui/GlassBackdrop';

export function AuthBootstrapper({ children }: { children: ReactNode }) {
  const ranOnce = useRef(false);
  const isBootstrapped = useAuthStore((s) => s.isBootstrapped);
  const setSession = useAuthStore((s) => s.setSession);
  const markBootstrapped = useAuthStore((s) => s.markBootstrapped);
  const clear = useAuthStore((s) => s.clear);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;
    (async () => {
      try {
        const data = await authApi.refresh();
        setSession({ user: data.user, accessToken: data.accessToken });
      } catch {
        clear();
      } finally {
        markBootstrapped();
      }
    })();
  }, [setSession, markBootstrapped, clear]);

  if (!isBootstrapped) {
    return (
      <div className="relative min-h-screen flex items-center justify-center">
        <GlassBackdrop variant="auth" />
        <div className="relative text-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400 mx-auto" />
          <p className="mt-3 text-sm text-white/40">Loading MediScan…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}