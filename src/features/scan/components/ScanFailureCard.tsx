import { CameraIcon, SearchIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DrugSearch } from '@/features/drug/components/DrugSearch';
import type { ScanLowConfidenceResult, ScanNoMatchResult } from '@/types/scan';

type Props =
  | { variant: 'low_confidence'; result: ScanLowConfidenceResult; onScanAnother: () => void; onSelectBrand: (id: string) => void }
  | { variant: 'no_match'; result: ScanNoMatchResult; onScanAnother: () => void; onSelectBrand: (id: string) => void };

export function ScanFailureCard(props: Props) {
  const { result, onScanAnother, onSelectBrand } = props;
  const isLowConfidence = props.variant === 'low_confidence';

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-orange-400/25 bg-orange-400/[0.06] p-4">
        <h3 className="font-semibold text-orange-200">
          {isLowConfidence ? "We couldn't read this clearly" : "We don't have this one yet"}
        </h3>
        <p className="text-sm text-orange-200/80 mt-1">
          {isLowConfidence
            ? 'The photo may be blurry or too dark. Try another, or search below.'
            : `We read "${result.ocr.brandName}" but couldn't match it. Search below to check manually.`}
        </p>
        {result.ocr.rawText && (
          <details className="mt-3">
            <summary className="text-xs text-orange-300/90 cursor-pointer hover:underline">
              What we saw
            </summary>
            <p className="text-xs text-orange-200/70 mt-2 break-words">{result.ocr.rawText}</p>
          </details>
        )}
      </div>

      <Button variant="glass" className="w-full" onClick={onScanAnother}>
        <CameraIcon className="h-4 w-4" />
        Try another photo
      </Button>

      <div className="border-t border-white/[0.06] pt-5">
        <div className="flex items-center gap-2 mb-3">
          <SearchIcon className="h-4 w-4 text-emerald-400" />
          <h4 className="text-sm font-semibold text-white/80">Search by name instead</h4>
        </div>
        <DrugSearch
          autoFocus
          placeholder={result.ocr.brandName ?? 'Search any medicine…'}
          onSelectBrand={onSelectBrand}
        />
      </div>
    </div>
  );
}