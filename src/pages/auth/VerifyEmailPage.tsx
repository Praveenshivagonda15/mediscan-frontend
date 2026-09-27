import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { AuthLayout } from '@/components/ui/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import * as authApi from '@/features/auth/api';
import { ApiClientError } from '@/types/api';

type Status = 'verifying' | 'success' | 'error' | 'no-token';

export function VerifyEmailPage() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [status, setStatus] = useState<Status>(token ? 'verifying' : 'no-token');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (!token || status !== 'verifying') return;
    let cancelled = false;
    (async () => {
      try {
        await authApi.verifyEmail(token);
        if (!cancelled) setStatus('success');
      } catch (err) {
        if (cancelled) return;
        setStatus('error');
        setErrorMsg(err instanceof ApiClientError ? err.message : 'Link is invalid or expired');
      }
    })();
    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <AuthLayout title="Email verification">
      <div className="flex flex-col items-center text-center py-4">
        {status === 'verifying' && (
          <>
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">Verifying…</p>
          </>
        )}
        {status === 'success' && (
          <>
            <CheckCircle2 className="h-10 w-10 text-green-600" />
            <p className="mt-4 text-sm text-muted-foreground">Email verified. You&apos;re set.</p>
            <Button asChild className="mt-6"><Link to="/dashboard">Dashboard</Link></Button>
          </>
        )}
        {(status === 'error' || status === 'no-token') && (
          <>
            <XCircle className="h-10 w-10 text-destructive" />
            <p className="mt-4 text-sm text-muted-foreground">
              {status === 'no-token' ? 'Check your email for the link.' : errorMsg}
            </p>
            <Button asChild variant="outline" className="mt-6"><Link to="/login">Back to sign in</Link></Button>
          </>
        )}
      </div>
    </AuthLayout>
  );
}