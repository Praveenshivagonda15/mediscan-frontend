import { useEffect, useRef, useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { ImageDropzone } from '@/features/scan/components/ImageDropzone';
import { ImagePreview } from '@/features/scan/components/ImagePreview';
import { ScanResultCard } from '@/features/scan/components/ScanResultCard';
import { ScanFailureCard } from '@/features/scan/components/ScanFailureCard';
import { ScanQuotaBar } from '@/features/scan/components/ScanQuotaBar';
import { BrandDetailsPanel } from '@/features/drug/components/BrandDetailsPanel';
import { useScanUpload, useScanQuota } from '@/features/scan/hooks';
import type { ScanResult } from '@/types/scan';

type Stage = 'idle' | 'preview' | 'scanning' | 'result' | 'manual';

export function ScanPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [result, setResult] = useState<ScanResult | null>(null);
  const [manualBrandId, setManualBrandId] = useState<string | null>(null);

  const quota = useScanQuota();
  const scan = useScanUpload();
  const previewRef = useRef<string | null>(null);

  useEffect(() => () => { if (previewRef.current) URL.revokeObjectURL(previewRef.current); }, []);

  const exhausted = quota.data?.remaining === 0;

  function handleFile(f: File) {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    const url = URL.createObjectURL(f);
    previewRef.current = url;
    setFile(f);
    setPreviewUrl(url);
    setStage('preview');
  }

  function handleClear() {
    if (previewRef.current) URL.revokeObjectURL(previewRef.current);
    previewRef.current = null;
    setFile(null);
    setPreviewUrl(null);
    setResult(null);
    setManualBrandId(null);
    setStage('idle');
  }

  function handleScan() {
    if (!file) return;
    setStage('scanning');
    scan.mutate(file, {
      onSuccess: (data) => { setResult(data); setStage('result'); },
      onError: () => setStage('preview'),
    });
  }

  function handleSelectBrand(brandId: string) {
    setManualBrandId(brandId);
    setStage('manual');
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gradient">Scan a medicine</h1>
        <p className="text-sm text-white/50 mt-1">
          Take a clear, well-lit photo of the front of the strip or box.
        </p>
      </div>

      <GlassCard className="p-5">
        <ScanQuotaBar quota={quota.data} isLoading={quota.isLoading} />
      </GlassCard>

      <GlassCard intensity="strong" className="p-5 sm:p-7">
        {stage === 'idle' && <ImageDropzone onFile={handleFile} disabled={Boolean(exhausted)} />}
        {(stage === 'preview' || stage === 'scanning') && file && previewUrl && (
          <ImagePreview
            file={file}
            previewUrl={previewUrl}
            onClear={handleClear}
            onScan={handleScan}
            isScanning={stage === 'scanning'}
          />
        )}
        {stage === 'result' && result && result.matched && (
          <ScanResultCard
            brand={result.brand}
            composition={result.composition}
            alternatives={result.alternatives}
            cheapest={result.cheapest}
            savings={result.savings}
            ocrConfidence={result.ocr.confidence}
            onScanAnother={handleClear}
          />
        )}
        {stage === 'result' && result && !result.matched && result.reason === 'low_confidence' && (
          <ScanFailureCard
            variant="low_confidence"
            result={result}
            onScanAnother={handleClear}
            onSelectBrand={handleSelectBrand}
          />
        )}
        {stage === 'result' && result && !result.matched && result.reason === 'no_match' && (
          <ScanFailureCard
            variant="no_match"
            result={result}
            onScanAnother={handleClear}
            onSelectBrand={handleSelectBrand}
          />
        )}
        {stage === 'manual' && manualBrandId && (
          <BrandDetailsPanel brandId={manualBrandId} onScanAnother={handleClear} />
        )}
      </GlassCard>
    </div>
  );
}