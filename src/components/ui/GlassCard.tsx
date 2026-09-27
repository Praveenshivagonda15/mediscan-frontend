import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface Props extends HTMLAttributes<HTMLDivElement> {
  intensity?: 'default' | 'strong';
}

export function GlassCard({ intensity = 'default', className, ...props }: Props) {
  return (
    <div
      className={cn(intensity === 'strong' ? 'glass-strong' : 'glass', 'rounded-2xl', className)}
      {...props}
    />
  );
}
