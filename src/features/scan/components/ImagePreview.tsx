import { X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { formatFileSize } from '../utils';

interface Props {
  file: File;
  previewUrl: string;
  onClear: () => void;
  onScan: () => void;
  isScanning: boolean;
}

export function ImagePreview({ file, previewUrl, onClear, onScan, isScanning }: Props) {
  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.10] bg-black/40">
        <img
          src={previewUrl}
          alt="Medicine preview"
          className="w-full max-h-[420px] object-contain"
        />
        {!isScanning && (
          <button
            onClick={onClear}
            className="absolute top-3 right-3 rounded-full glass-strong p-2 text-white/70 hover:text-white transition-colors"
            aria-label="Remove image"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {isScanning && (
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin text-emerald-400 mx-auto" />
              <p className="mt-3 text-sm text-white/80">Reading the label…</p>
              <p className="text-xs text-white/40 mt-1">Takes about 2–4 seconds</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-white/40 px-1">
        <span className="truncate">{file.name}</span>
        <span className="tabular-nums shrink-0 ml-2">{formatFileSize(file.size)}</span>
      </div>

      {!isScanning && (
        <Button size="lg" className="w-full" onClick={onScan}>
          Scan this medicine
        </Button>
      )}
    </div>
  );
}