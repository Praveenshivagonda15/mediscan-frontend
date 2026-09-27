import { MAX_IMAGE_BYTES, ALLOWED_IMAGE_MIMES } from '@/config/constants';

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_IMAGE_MIMES.includes(file.type as (typeof ALLOWED_IMAGE_MIMES)[number])) {
    return 'Only JPEG, PNG, and WebP images are supported.';
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return `Image is too large. Maximum size is ${Math.round(MAX_IMAGE_BYTES / 1024 / 1024)} MB.`;
  }
  return null;
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}