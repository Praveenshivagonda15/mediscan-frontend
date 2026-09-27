import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Props {
  to?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function Brand({ to = '/', size = 'md', className }: Props) {
  const iconSize = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-8 w-8 text-sm';
  const textSize = size === 'sm' ? 'text-base' : 'text-lg';

  const content = (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <span
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-bold',
          'bg-gradient-to-br from-emerald-300 to-emerald-500 text-emerald-950',
          'shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]',
          iconSize,
        )}
      >
        M
      </span>
      <span className={cn('font-semibold tracking-tight text-white', textSize)}>
        MediScan
      </span>
    </span>
  );

  return to ? <Link to={to}>{content}</Link> : content;
}