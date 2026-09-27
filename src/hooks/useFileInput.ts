import { useRef } from 'react';

interface Options {
  capture?: boolean;
}

export function useFileInput(onFile: (file: File) => void, options: Options = {}) {
  const inputRef = useRef<HTMLInputElement>(null);

  return {
    open: () => inputRef.current?.click(),
    inputProps: {
      ref: inputRef,
      type: 'file' as const,
      accept: 'image/jpeg,image/png,image/webp',
      capture: options.capture ? ('environment' as const) : undefined,
      className: 'sr-only',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) onFile(file);
        event.target.value = '';
      },
    },
  };
}
