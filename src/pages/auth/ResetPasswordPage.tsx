import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { AuthLayout } from '@/components/ui/layout/AuthLayout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { PasswordStrengthMeter } from '@/features/auth/components/PasswordStrengthMeter';
import { useResetPassword } from '@/features/auth/hooks';

export function ResetPasswordPage() {
  const [params] = useSearchParams();
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();
  const reset = useResetPassword();

  if (!token) {
    return (
      <AuthLayout title="Invalid reset link">
        <div className="flex flex-col items-center text-center py-4">
          <XCircle className="h-10 w-10 text-destructive" />
          <p className="mt-4 text-sm text-muted-foreground">
            This page expects a reset link.
          </p>
          <Button asChild variant="outline" className="mt-6">
            <Link to="/forgot-password">Request new link</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) return;
    reset.mutate(
      { token: token!, password },
      { onSuccess: () => navigate('/login', { replace: true }) },
    );
  }

  return (
    <AuthLayout title="Choose a new password">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>New password</Label>
          <Input
            type="password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="pt-2">
            <PasswordStrengthMeter password={password} />
          </div>
        </div>
        <div>
          <Label>Confirm password</Label>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {confirm && password !== confirm && (
            <p className="text-xs text-destructive mt-1">Passwords do not match</p>
          )}
        </div>
        <Button
          type="submit"
          className="w-full h-11"
          disabled={reset.isPending || !password || password !== confirm}
        >
          {reset.isPending ? 'Resetting…' : 'Reset password'}
        </Button>
      </form>
    </AuthLayout>
  );
}