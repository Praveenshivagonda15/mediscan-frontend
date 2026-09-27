import { useRef } from 'react';

export function useFileInput(
  onFile: (file: File) => void,
  options: { capture?: boolean } = {},
) {
  const ref = useRef<HTMLInputElement | null>(null);
  const open = () => ref.current?.click();

  const inputProps = {
    ref,
    type: 'file' as const,
    accept: 'image/jpeg,image/png,image/webp',
    ...(options.capture ? { capture: 'environment' as const } : {}),
    style: { display: 'none' },
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onFile(file);
      e.target.value = '';
    },
  };

  return { open, inputProps };
}