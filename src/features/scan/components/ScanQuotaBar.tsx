import { cn } from '@/lib/utils';
import type { ScanQuota } from '@/types/scan';

export function ScanQuotaBar({ quota, isLoading }: { quota?: ScanQuota; isLoading?: boolean }) {
  if (isLoading || !quota) {
    return (
      <div className="space-y-2">
        <div className="h-4 w-40 rounded bg-white/[0.06] animate-pulse" />
        <div className="h-1.5 w-full rounded-full bg-white/[0.06]" />
      </div>
    );
  }

  const pct = Math.min(100, Math.round((quota.used / quota.limit) * 100));
  const exhausted = quota.remaining === 0;

  let resetLabel = 'midnight';
  try {
    resetLabel = new Date(quota.resetsAt).toLocaleTimeString('en-IN', {
      hour: 'numeric',
      minute: '2-digit',
    });
  } catch { /* ignore */ }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className={cn('font-medium', exhausted ? 'text-red-400' : 'text-white/80')}>
          {exhausted
            ? 'Daily limit reached'
            : `${quota.remaining} of ${quota.limit} scans left today`}
        </span>
        <span className="text-xs text-white/40">Resets at {resetLabel}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className={cn(
            'h-full rounded-full transition-all',
            exhausted ? 'bg-red-400' : pct >= 80 ? 'bg-orange-400' : 'bg-emerald-400',
          )}
          style={{
            width: `${pct}%`,
            boxShadow: exhausted ? '0 0 12px rgba(248,113,113,0.6)' : '0 0 12px rgba(52,211,153,0.5)',
          }}
        />
      </div>
    </div>
  );
}