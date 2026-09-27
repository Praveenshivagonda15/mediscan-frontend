import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
}

export function AuthLayout({ title, subtitle, children, footer, className }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50/50 to-background">
      <header className="p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-lg font-bold text-primary">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">
            M
          </span>
          MediScan
        </Link>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className={cn('w-full max-w-md', className)}>
          <div className="mb-6 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="rounded-xl border bg-card p-6 shadow-sm">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-muted-foreground">{footer}</div>}
        </div>
      </main>
    </div>
  );
}