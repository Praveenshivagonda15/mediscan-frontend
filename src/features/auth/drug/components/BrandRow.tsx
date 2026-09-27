import { ChevronRight } from 'lucide-react';
import { cn, formatINR } from '@/lib/utils';
import type { Alternative, BrandSearchHit } from '@/types/drug';

interface Props {
  brand: BrandSearchHit | Alternative;
  onClick?: () => void;
  highlightCheapest?: boolean;
}

export function BrandRow({ brand, onClick, highlightCheapest }: Props) {
  const hasUnitPrice = 'unitPricePaise' in brand;
  const composition = 'compositionSummary' in brand ? brand.compositionSummary : null;

  const Wrapper = onClick ? 'button' : 'div';

  return (
    <Wrapper
      {...(onClick ? { onClick, type: 'button' as const } : {})}
      className={cn(
        'w-full flex items-center justify-between gap-3 rounded-xl glass px-3.5 py-3 text-left transition-all',
        onClick && 'hover:bg-white/[0.08] hover:border-white/[0.14]',
        highlightCheapest && 'border-emerald-400/30 bg-emerald-400/[0.06] shadow-glow-sm',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-medium text-white truncate">{brand.brandName}</p>
          {highlightCheapest && (
            <span className="shrink-0 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30 px-2 py-0.5 text-[10px] font-semibold tracking-wide">
              CHEAPEST
            </span>
          )}
        </div>
        <p className="text-xs text-white/40 truncate mt-0.5">
          {brand.manufacturer ?? 'Manufacturer unknown'} · {brand.packSize} {brand.packUnit}
          {brand.packSize > 1 ? 's' : ''}
        </p>
        {composition && <p className="text-xs text-white/35 truncate mt-0.5">{composition}</p>}
      </div>

      <div className="text-right shrink-0">
        <p className="font-semibold tabular-nums text-white">{formatINR(brand.mrpPaise)}</p>
        {hasUnitPrice && (
          <p className="text-xs text-white/40 tabular-nums mt-0.5">
            {formatINR((brand as Alternative).unitPricePaise)}/{brand.packUnit}
          </p>
        )}
      </div>

      {onClick && <ChevronRight className="h-4 w-4 text-white/30 shrink-0" />}
    </Wrapper>
  );
}