import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { GlassBackdrop } from '@/components/ui/GlassBackdrop';

export function NotFoundPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-6">
      <GlassBackdrop variant="auth" />
      <div className="relative text-center">
        <h1 className="text-6xl font-bold text-gradient mb-3">404</h1>
        <p className="text-white/50 mb-6">That page doesn&apos;t exist.</p>
        <Button asChild><Link to="/">Go home</Link></Button>
      </div>
    </div>
  );
}