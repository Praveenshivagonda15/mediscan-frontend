import { cn, formatINR } from '@/lib/utils';
import type { Alternative } from '@/types/scan';

export function AlternativeList({
  alternatives,
  cheapestId,
}: {
  alternatives: Alternative[];
  cheapestId: string | null;
}) {
  if (alternatives.length === 0) {
    return (
      <p className="text-sm text-white/50 py-3 text-center">
        No cheaper equivalents found.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      {alternatives.map((alt) => {
        const isCheapest = alt.id === cheapestId;
        return (
          <div
            key={alt.id}
            className={cn(
              'flex items-center justify-between gap-3 rounded-xl p-3',
              'border transition-colors',
              isCheapest
                ? 'border-emerald-400/30 bg-emerald-400/[0.06]'
                : 'border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.05]',
            )}
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-white truncate">{alt.brandName}</p>
                {isCheapest && (
                  <span className="shrink-0 rounded-full bg-emerald-400/20 text-emerald-300 px-2 py-0.5 text-[10px] font-semibold tracking-wide">
                    CHEAPEST
                  </span>
                )}
              </div>
              <p className="text-xs text-white/40 truncate mt-0.5">
                {alt.manufacturer ?? 'Unknown'} · {alt.packSize} {alt.packUnit}
                {alt.packSize > 1 ? 's' : ''}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-semibold tabular-nums text-white">{formatINR(alt.mrpPaise)}</p>
              <p className="text-xs text-white/40 tabular-nums">
                {formatINR(alt.unitPricePaise)}/{alt.packUnit}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}