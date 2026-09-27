import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatINR } from '@/lib/utils';
import type { Alternative, Brand, Composition, Savings } from '@/types/scan';
import { SavingsBadge } from './SavingsBadge';
import { AlternativeList } from './AlternativeList';

interface Props {
  brand: Brand;
  composition: Composition[];
  alternatives: Alternative[];
  cheapest: Alternative | null;
  savings: Savings | null;
  ocrConfidence: number | null;
  onScanAnother?: () => void;
}

export function ScanResultCard({
  brand, composition, alternatives, cheapest, savings, ocrConfidence, onScanAnother,
}: Props) {
  const lowConfidence = ocrConfidence !== null && ocrConfidence < 0.85;

  return (
    <div className="space-y-5">
      {lowConfidence && (
        <div className="flex items-start gap-2 rounded-xl border border-orange-400/25 bg-orange-400/[0.06] p-3 text-sm">
          <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0 text-orange-400" />
          <p className="text-orange-200/90">
            We're fairly confident this is <strong>{brand.brandName}</strong>. Please verify
            against your strip.
          </p>
        </div>
      )}

      {/* Brand header */}
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">{brand.brandName}</h2>
          <p className="text-2xl font-semibold tabular-nums text-white">
            {formatINR(brand.mrpPaise)}
          </p>
        </div>
        <p className="text-sm text-white/50 mt-1">
          {brand.manufacturer ?? 'Manufacturer unknown'} · {brand.packSize} {brand.packUnit}
          {brand.packSize > 1 ? 's' : ''} · <span className="capitalize">{brand.dosageForm}</span>
        </p>
      </div>

      {/* Composition */}
      {composition.length > 0 && (
        <div className="glass rounded-xl p-4">
          <p className="text-xs font-medium text-white/40 uppercase tracking-wider mb-3">
            Contains
          </p>
          <div className="space-y-1.5">
            {composition.map((c) => (
              <div key={c.drugId} className="flex items-center justify-between text-sm">
                <span className="font-medium text-white">{c.genericName}</span>
                <span className="tabular-nums text-white/60">
                  {c.strengthValue} {c.strengthUnit}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Savings — the star */}
      {savings && <SavingsBadge savings={savings} />}

      {/* Alternatives */}
      {alternatives.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-white/80 mb-3">
            Cheaper brands with the same composition
          </h3>
          <AlternativeList alternatives={alternatives} cheapestId={cheapest?.id ?? null} />
        </div>
      )}

      <p className="text-xs text-white/35 border-t border-white/[0.06] pt-4 leading-relaxed">
        Prices are indicative. Confirm with your pharmacist before switching.
        MediScan is informational and not a substitute for medical advice.
      </p>

      {onScanAnother && (
        <Button variant="glass" className="w-full" onClick={onScanAnother}>
          Scan another medicine
        </Button>
      )}
    </div>
  );
}