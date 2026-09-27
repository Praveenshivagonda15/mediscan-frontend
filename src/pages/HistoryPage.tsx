import { Link } from 'react-router-dom';
import { History, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { GlassCard } from '@/components/ui/GlassCard';
import { useScanHistory } from '@/features/scan/hooks';
import { formatINR } from '@/lib/utils';

export function HistoryPage() {
  const history = useScanHistory(50);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-gradient">Scan history</h1>
        <p className="text-sm text-white/50 mt-1">
          Your last 50 scans. Images are removed after 24 hours.
        </p>
      </div>

      {history.isLoading && (
        <GlassCard className="p-12 flex justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-white/40" />
        </GlassCard>
      )}

      {history.isError && (
        <GlassCard className="p-8 text-center">
          <p className="font-medium text-white">Could not load scan history</p>
          <p className="mt-1 text-sm text-white/50">Check your connection, then try again.</p>
          <Button className="mt-4" onClick={() => history.refetch()} disabled={history.isFetching}>
            {history.isFetching ? 'Retrying…' : 'Try again'}
          </Button>
        </GlassCard>
      )}

      {history.data && history.data.length === 0 && (
        <GlassCard className="p-12 text-center">
          <History className="h-10 w-10 mx-auto text-white/20" />
          <p className="mt-3 font-medium text-white">No scans yet</p>
          <p className="text-sm text-white/50 mt-1">Start scanning to build your history.</p>
          <Button asChild className="mt-5"><Link to="/scan">Scan a medicine</Link></Button>
        </GlassCard>
      )}

      {history.data && history.data.length > 0 && (
        <div className="space-y-2">
          {history.data.map((s) => (
            <Link
              key={s.id}
              to={`/history/${s.id}`}
              className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label={`View scan details for ${s.brand?.brandName ?? s.ocrBrandName ?? 'unrecognized medicine'}`}
            >
            <GlassCard className="p-3 sm:p-4 flex items-center gap-3 sm:gap-4 hover:bg-white/[0.06]">
              {!s.imageDeleted && s.imageUrl ? (
                <img src={s.imageUrl} alt="" className="h-14 w-14 rounded-lg object-cover bg-white/[0.04] shrink-0" />
              ) : (
                <div className="h-14 w-14 rounded-lg bg-white/[0.04] flex items-center justify-center shrink-0">
                  <History className="h-5 w-5 text-white/20" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <p className="font-medium text-white truncate">
                  {s.brand?.brandName ?? s.ocrBrandName ?? 'Unrecognized'}
                </p>
                <p className="text-xs text-white/40 truncate">
                  {s.brand?.compositionSummary ?? (s.matched ? 'Match found' : 'No match')}
                </p>
                <p className="text-xs text-white/30 mt-0.5">
                  {new Date(s.createdAt).toLocaleString('en-IN', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  })}
                </p>
              </div>

              {s.brand && (
                <p className="font-semibold tabular-nums text-white shrink-0">
                  {formatINR(s.brand.mrpPaise)}
                </p>
              )}
            </GlassCard>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}