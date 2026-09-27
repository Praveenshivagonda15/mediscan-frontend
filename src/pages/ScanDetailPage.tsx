import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, History, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScanDetail } from '@/features/scan/hooks';
import { formatINR } from '@/lib/utils';

export function ScanDetailPage() {
  const { scanId = '' } = useParams();
  const detail = useScanDetail(scanId);

  if (detail.isLoading) {
    return <GlassCard className="p-12 flex justify-center"><Loader2 className="h-6 w-6 animate-spin text-white/40" /></GlassCard>;
  }

  if (detail.isError || !detail.data) {
    return (
      <div className="max-w-3xl mx-auto space-y-4">
        <Button asChild variant="ghost"><Link to="/history"><ArrowLeft className="h-4 w-4" />Back to history</Link></Button>
        <GlassCard className="p-8 text-center">
          <p className="font-medium text-white">Scan details unavailable</p>
          <p className="mt-1 text-sm text-white/50">This scan may have been removed or is no longer accessible.</p>
        </GlassCard>
      </div>
    );
  }

  const scan = detail.data;

  return (
    <div className="max-w-3xl mx-auto space-y-5">
      <Button asChild variant="ghost"><Link to="/history"><ArrowLeft className="h-4 w-4" />Back to history</Link></Button>
      <div>
        <h1 className="text-3xl font-semibold text-gradient">Scan details</h1>
        <p className="mt-1 text-sm text-white/50">
          {new Date(scan.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <GlassCard className="p-4">
          {!scan.imageDeleted && scan.imageUrl ? (
            <img src={scan.imageUrl} alt="Uploaded medicine package" className="w-full max-h-80 rounded-md object-contain bg-black/10" />
          ) : (
            <div className="min-h-48 flex flex-col items-center justify-center gap-2 text-sm text-white/40">
              <History className="h-6 w-6" />Original image expired
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-5 space-y-4">
          <div>
            <p className="text-xs text-white/40">Recognized brand</p>
            <h2 className="mt-1 text-xl font-semibold text-white">
              {scan.brand?.brandName ?? scan.ocr.brandName ?? 'Unrecognized'}
            </h2>
            {scan.brand?.manufacturer && <p className="mt-1 text-sm text-white/50">{scan.brand.manufacturer}</p>}
          </div>
          {scan.brand && (
            <div className="border-t border-white/[0.08] pt-4">
              <p className="text-xs text-white/40">Pack price</p>
              <p className="mt-1 text-lg font-semibold text-white">{formatINR(scan.brand.mrpPaise)}</p>
            </div>
          )}
          {scan.savings && (
            <div className="border-t border-white/[0.08] pt-4">
              <p className="text-xs text-white/40">Potential savings</p>
              <p className="mt-1 text-lg font-semibold text-emerald-300">
                {formatINR(scan.savings.savingsPaise)} ({scan.savings.savingsPercent}%)
              </p>
              <p className="mt-1 text-xs text-white/40">
                Compared per pack of {scan.savings.perPackSize}
              </p>
            </div>
          )}
          {scan.composition && scan.composition.length > 0 && (
            <div className="border-t border-white/[0.08] pt-4">
              <p className="text-xs text-white/40">Composition</p>
              <ul className="mt-2 space-y-1 text-sm text-white/80">
                {scan.composition.map((part) => (
                  <li key={part.drugId}>{part.genericName} {part.strengthValue}{part.strengthUnit}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="border-t border-white/[0.08] pt-4">
            <p className="text-xs text-white/40">Recognition confidence</p>
            <p className="mt-1 text-sm text-white/80">
              {scan.ocr.confidence === null ? 'Unavailable' : `${Math.round(scan.ocr.confidence * 100)}%`}
            </p>
          </div>
          {scan.ocr.rawText && (
            <details className="border-t border-white/[0.08] pt-4">
              <summary className="cursor-pointer text-xs text-white/50">Text read from image</summary>
              <p className="mt-2 break-words text-sm text-white/70">{scan.ocr.rawText}</p>
            </details>
          )}
        </GlassCard>
      </div>

      {scan.alternatives && scan.alternatives.length > 0 && (
        <GlassCard className="p-5">
          <h2 className="font-semibold text-white">Lower-cost alternatives</h2>
          <div className="mt-3 divide-y divide-white/[0.08]">
            {scan.alternatives.map((alternative) => (
              <div key={alternative.id} className="flex items-center justify-between gap-4 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{alternative.brandName}</p>
                  <p className="truncate text-xs text-white/40">{alternative.manufacturer ?? alternative.dosageForm}</p>
                </div>
                <p className="shrink-0 text-sm font-semibold text-white">{formatINR(alternative.mrpPaise)}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}