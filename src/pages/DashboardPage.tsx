import { Link } from 'react-router-dom';
import { ScanLine, ChevronRight, Loader2, History } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useAuthStore } from '@/stores/authStore';
import { useScanHistory, useScanQuota } from '@/features/scan/hooks';
import { ScanQuotaBar } from '@/features/scan/components/ScanQuotaBar';
import { formatINR } from '@/lib/utils';

export function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const quota = useScanQuota();
  const history = useScanHistory(5);
  const exhausted = quota.data?.remaining === 0;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gradient">
          Hi {user?.name.split(' ')[0] ?? 'there'} 👋
        </h1>
        <p className="text-sm text-white/50 mt-1">
          Scan a medicine to see how much you could save.
        </p>
      </div>

      <GlassCard className="p-5">
        <ScanQuotaBar quota={quota.data} isLoading={quota.isLoading} />
      </GlassCard>

      <GlassCard className="p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-20 h-48 w-48 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">Scan a medicine</h2>
            <p className="text-sm text-white/50 mt-1 max-w-md">
              {exhausted
                ? "You've hit today's limit. Come back tomorrow."
                : "Snap a photo of any strip. We'll find the generic and cheaper options."}
            </p>
          </div>
          <Button asChild size="lg" disabled={exhausted} className="gap-2 shrink-0">
            <Link to="/scan">
              <ScanLine className="h-4 w-4" />
              Start scanning
            </Link>
          </Button>
        </div>
      </GlassCard>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-white">Recent scans</h2>
          <Link
            to="/history"
            className="text-sm text-emerald-400 hover:text-emerald-300 flex items-center gap-0.5 transition-colors"
          >
            View all <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {history.isLoading && (
          <GlassCard className="p-6 flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin text-white/40" />
          </GlassCard>
        )}

        {history.data && history.data.length === 0 && (
          <GlassCard className="p-10 text-center">
            <History className="h-8 w-8 mx-auto text-white/20" />
            <p className="mt-3 text-sm text-white/50">
              No scans yet. Your history will appear here.
            </p>
          </GlassCard>
        )}

        {history.data && history.data.length > 0 && (
          <div className="space-y-2">
            {history.data.map((s) => (
              <Link
                key={s.id}
                to={`/history/${s.id}`}
                className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`View scan details for ${s.brand?.brandName ?? s.ocrBrandName ?? 'unknown medicine'}`}
              >
              <GlassCard className="p-3 flex items-center gap-3 hover:bg-white/[0.06]">
                {!s.imageDeleted && s.imageUrl ? (
                  <img src={s.imageUrl} alt="" className="h-12 w-12 rounded-lg object-cover bg-white/[0.04] shrink-0" />
                ) : (
                  <div className="h-12 w-12 rounded-lg bg-white/[0.04] shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-white truncate">
                    {s.brand?.brandName ?? s.ocrBrandName ?? 'Unknown medicine'}
                  </p>
                  <p className="text-xs text-white/40 truncate">
                    {s.brand?.compositionSummary ?? (s.matched ? 'Match found' : 'No match')}
                  </p>
                </div>
                {s.brand && (
                  <p className="text-sm font-semibold tabular-nums text-white shrink-0">
                    {formatINR(s.brand.mrpPaise)}
                  </p>
                )}
              </GlassCard>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}