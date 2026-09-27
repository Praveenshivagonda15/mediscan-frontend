import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { cn } from '@/lib/utils';
import { useDrugSearch } from '../hooks';

interface Props {
  placeholder?: string;
  autoFocus?: boolean;
  onSelectBrand: (brandId: string) => void;
}

export function DrugSearch({ placeholder = 'Search any medicine…', autoFocus, onSelectBrand }: Props) {
  const [query, setQuery] = useState('');
  const [debounced, setDebounced] = useState('');

  // Tiny inline debounce — no need for a separate hook file
  useState(() => {
    const id = setInterval(() => setDebounced(query), 300);
    return () => clearInterval(id);
  });

  const { data, isFetching, isError } = useDrugSearch(debounced);
  const hasResults = (data?.brands?.length ?? 0) > 0 || (data?.genericDrugs?.length ?? 0) > 0;
  const showEmpty = debounced.length >= 2 && !isFetching && !isError && !hasResults;

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-white/30" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          className="pl-10 pr-10"
        />
        {isFetching && (
          <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-white/40" />
        )}
      </div>

      {hasResults && (
        <div className="space-y-3">
          {data!.brands.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Brands</p>
              {data!.brands.map((b) => (
                <button
                  key={b.id}
                  onClick={() => onSelectBrand(b.id)}
                  className={cn(
                    'w-full flex items-center justify-between gap-3 rounded-xl p-3 text-left',
                    'border border-white/[0.08] bg-white/[0.03] hover:bg-white/[0.06] transition-colors',
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white truncate">{b.brandName}</p>
                    <p className="text-xs text-white/40 truncate">
                      {b.compositionSummary ?? b.manufacturer ?? ''}
                    </p>
                  </div>
                  <p className="font-semibold tabular-nums text-white shrink-0">
                    ₹{(b.mrpPaise / 100).toFixed(2)}
                  </p>
                </button>
              ))}
            </div>
          )}

          {data!.genericDrugs.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-white/40 uppercase tracking-wider">Salt names</p>
              <div className="flex flex-wrap gap-2">
                {data!.genericDrugs.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => setQuery(g.genericName)}
                    className="rounded-full border border-white/[0.10] bg-white/[0.04] px-3 py-1 text-sm text-white/80 hover:bg-white/[0.08] transition-colors"
                  >
                    {g.genericName}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {showEmpty && (
        <p className="text-sm text-white/40 py-4 text-center">
          No matches for &ldquo;{debounced}&rdquo;.
        </p>
      )}

      {isError && (
        <p className="text-sm text-red-400 py-4 text-center">Search unavailable.</p>
      )}
    </div>
  );
}