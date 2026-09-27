import { useCallback, useRef, useState } from 'react';
import { Camera, ImageIcon, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import { validateImageFile } from '../utils';

interface Props {
  onFile: (file: File) => void;
  disabled?: boolean;
}

export function ImageDropzone({ onFile, disabled }: Props) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(
    (file: File) => {
      const err = validateImageFile(file);
      if (err) { setError(err); return; }
      setError(null);
      onFile(file);
    },
    [onFile],
  );

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-3">
      <div
        onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        className={cn(
          'relative rounded-2xl border-2 border-dashed p-8 sm:p-12 text-center transition-all duration-300',
          isDragging
            ? 'border-emerald-400/60 bg-emerald-400/[0.06] shadow-[0_0_40px_-8px_rgba(52,211,153,0.4)]'
            : 'border-white/[0.12] bg-white/[0.02]',
          disabled && 'opacity-50 cursor-not-allowed',
        )}
      >
        <div className="flex flex-col items-center gap-4">
          <div className={cn(
            'rounded-2xl p-4 transition-all',
            isDragging ? 'bg-emerald-400/20 shadow-[0_0_24px_-4px_rgba(52,211,153,0.6)]' : 'bg-white/[0.05]',
          )}>
            <Upload className="h-7 w-7 text-emerald-400" />
          </div>
          <div>
            <p className="font-medium text-white">Drop a photo of your medicine strip</p>
            <p className="text-sm text-white/40 mt-1">JPEG, PNG, or WebP · max 5 MB</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <Button onClick={() => cameraRef.current?.click()} disabled={disabled}>
              <Camera className="h-4 w-4" />
              Take photo
            </Button>
            <Button variant="glass" onClick={() => galleryRef.current?.click()} disabled={disabled}>
              <ImageIcon className="h-4 w-4" />
              Choose file
            </Button>
          </div>

          <input
            ref={cameraRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            capture="environment"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
          />
          <input
            ref={galleryRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFile(f);
              e.target.value = '';
            }}
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400 text-center" role="alert">{error}</p>
      )}
    </div>
  );
}