import { Outlet, Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, ScanLine, History, User as UserIcon } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useLogout } from '@/features/auth/hooks';

export function AppShell() {
  const user = useAuthStore((s) => s.user);
  const logout = useLogout();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-primary">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm">
              M
            </span>
            <span className="hidden sm:inline">MediScan</span>
          </Link>

          <nav className="flex items-center gap-1">
            <NavBtn to="/dashboard" icon={LayoutDashboard} label="Dashboard" />
            <NavBtn to="/scan" icon={ScanLine} label="Scan" />
            <NavBtn to="/history" icon={History} label="History" />
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/profile')}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <UserIcon className="h-4 w-4" />
              <span className="hidden sm:inline">{user?.name.split(' ')[0]}</span>
            </button>
            <button
              onClick={() => logout.mutate()}
              className="text-sm text-muted-foreground hover:text-destructive"
              aria-label="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <div className="container py-6 sm:py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function NavBtn({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  const active = window.location.pathname.startsWith(to);
  return (
    <Link
      to={to}
      className={
        'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ' +
        (active
          ? 'bg-accent text-accent-foreground'
          : 'text-muted-foreground hover:text-foreground hover:bg-accent/50')
      }
    >
      <Icon className="h-4 w-4" />
      <span className="hidden sm:inline">{label}</span>
    </Link>
  );
}