import { useMemo } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { scorePassword } from '../../utils';

export function PasswordStrengthMeter({ password }: { password: string }) {
  const s = useMemo(() => scorePassword(password), [password]);

  const colors = ['bg-muted', 'bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
  const textColors = [
    'text-muted-foreground',
    'text-red-600',
    'text-orange-600',
    'text-yellow-700',
    'text-green-600',
  ];

  const hasUpperLower = /[A-Z]/.test(password) && /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasLength = password.length >= 8;

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={cn(
              'h-1 flex-1 rounded-full transition-colors',
              i <= s.score ? colors[s.score] : 'bg-muted',
            )}
          />
        ))}
      </div>
      <p className={cn('text-xs', textColors[s.score])}>
        {password ? s.label : 'Use 8+ characters with letters and numbers'}
      </p>
      {password && (
        <ul className="text-xs space-y-1 pt-1">
          <Req ok={hasLength} text="At least 8 characters" />
          <Req ok={hasUpperLower} text="Upper and lowercase letters" />
          <Req ok={hasNumber} text="At least one number" />
        </ul>
      )}
    </div>
  );
}

function Req({ ok, text }: { ok: boolean; text: string }) {
  const Icon = ok ? Check : X;
  return (
    <li className={cn('flex items-center gap-1.5', ok ? 'text-green-600' : 'text-muted-foreground')}>
      <Icon className="h-3 w-3" />
      <span>{text}</span>
    </li>
  );
}