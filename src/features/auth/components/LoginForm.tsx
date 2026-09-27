import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { API_URL } from '@/lib/axios';
import { useLogin } from '../hooks';
import type { LoginInput } from '../schemas';

export function LoginForm() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const login = useLogin();
  const oauthError = searchParams.get('error');
  const oauthErrorMessage = oauthError === 'oauth_state_mismatch'
    ? 'Google sign-in could not be verified. Please try again.'
    : oauthError === 'oauth_failed'
      ? 'Google sign-in failed. Please try again.'
      : oauthError === 'google_not_configured'
        ? 'Google sign-in is not configured yet. Use email and password instead.'
      : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Invalid email';
    if (!password) errs.password = 'Password is required';

    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const input: LoginInput = { email: email.trim().toLowerCase(), password };
    login.mutate(input);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {oauthErrorMessage && (
        <p role="alert" className="text-sm text-destructive">{oauthErrorMessage}</p>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          autoFocus
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <Label htmlFor="password" className="mb-0">Password</Label>
          <Link to="/forgot-password" className="text-xs text-primary hover:underline">
            Forgot?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={show ? 'text' : 'password'}
            autoComplete="current-password"
            placeholder="••••••••"
            className="pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground"
            aria-label={show ? 'Hide' : 'Show'}
            tabIndex={-1}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
      </div>

      <Button type="submit" className="w-full h-11" disabled={login.isPending}>
        {login.isPending ? 'Signing in…' : 'Sign in'}
      </Button>
      <div className="relative py-1 text-center text-xs text-muted-foreground">
        <span className="bg-background px-2">or continue with</span>
      </div>
      <Button
        type="button"
        variant="glass"
        className="w-full h-11"
        onClick={() => window.location.assign(`${API_URL}/api/auth/google`)}
      >
        Continue with Google
      </Button>
    </form>
  );
}