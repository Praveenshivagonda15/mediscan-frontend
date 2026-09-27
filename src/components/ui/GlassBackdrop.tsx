interface GlassBackdropProps {
  variant?: 'auth' | 'default' | 'landing';
}

export function GlassBackdrop({ variant = 'default' }: GlassBackdropProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${variant === 'auth' ? 'bg-emerald-950/5' : 'bg-background'}`}
    >
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
    </div>
  );
}