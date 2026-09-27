import { Loader2 } from 'lucide-react';
import { useBrandDetails } from '../hooks';
import { ScanResultCard } from '@/features/scan/components/ScanResultCard';

export function BrandDetailsPanel({ brandId, onScanAnother }: { brandId: string; onScanAnother?: () => void }) {
  const { data, isLoading, isError } = useBrandDetails(brandId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="rounded-xl border border-red-400/25 bg-red-400/[0.06] p-4 text-sm text-red-300">
        Could not load details for this medicine.
      </div>
    );
  }

  return (
    <ScanResultCard
      brand={data.brand}
      composition={data.composition}
      alternatives={data.alternatives}
      cheapest={data.cheapest}
      savings={data.savings}
      ocrConfidence={null}
      onScanAnother={onScanAnother}
    />
  );
}