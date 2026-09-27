import { IndianRupee, TrendingDown } from 'lucide-react';
import { cn, formatINR } from '@/lib/utils';
import type { Savings } from '@/types/scan';

export function SavingsBadge({ savings, className }: { savings: Savings; className?: string }) {
  if (savings.savingsPaise === 0) {
    return (
      <div className={cn('glass rounded-2xl p-5 flex items-center gap-4', className)}>
        <div className="rounded-xl bg-emerald-400/15 p-3">
          <IndianRupee className="h-6 w-6 text-emerald-400" />
        </div>
        <div>
          <p className="font-semibold text-emerald-300">Already the cheapest</p>
          <p className="text-xs text-white/50 mt-0.5">We didn't find a cheaper equivalent.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl p-5',
        'bg-gradient-to-br from-emerald-400/25 via-emerald-500/15 to-transparent',
        'border border-emerald-400/30 backdrop-blur-xl',
        className,
      )}
    >
      <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-emerald-400/20 blur-3xl" />
      <div className="relative flex items-start gap-4">
        <div className="rounded-xl bg-emerald-400/20 p-3 shadow-[0_0_20px_-4px_rgba(52,211,153,0.6)]">
          <TrendingDown className="h-6 w-6 text-emerald-300" />
        </div>
        <div className="flex-1">
          <p className="text-xs text-emerald-300/80 uppercase tracking-wider font-medium">
            You could save
          </p>
          <p className="text-3xl font-bold text-gradient-emerald mt-1">
            {formatINR(savings.savingsPaise)}
          </p>
          <p className="text-xs text-white/60 mt-1.5">
            {savings.savingsPercent}% less for the same composition
            {savings.perPackSize > 1 ? ` (per pack of ${savings.perPackSize})` : ''}
          </p>
        </div>
      </div>
    </div>
  );
}