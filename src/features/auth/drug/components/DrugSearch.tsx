import { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useDebounce } from '@/hooks/useDebounce';
import { useDrugSearch } from '../hooks';
import { BrandRow } from './BrandRow';

interface Props {
  placeholder?: string;
  autoFocus?: boolean;
  onSelectBrand: (brandId: string) => void;
}

export function DrugSearch({ placeholder = 'Search any medicine…', autoFocus, onSelectBrand }: Props) {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 350);
  const { data, isFetching, isError } = useDrugSearch(debounced);

  const hasResults = (data?.brands.length ?? 0) > 0 || (data?.genericDrugs.length ?? 0) > 0;
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
          <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-emerald-400" />
        )}
      </div>

      {debounced.length < 2 && (
        <p className="text-xs text-white/35">
          Type at least 2 characters. Brand name or salt name both work.
        </p>
      )}

      {hasResults && (
        <div className="space-y-3">
          {data!.brands.length > 0 && (
            <div className="space-y-1.5">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider px-1">
                Brands
              </p>
              {data!.brands.map((b) => (
                <BrandRow key={b.id} brand={b} onClick={() => onSelectBrand(b.id)} />
              ))}
            </div>
          )}

          {data!.genericDrugs.length > 0 && (
            <div className="space-y-2 pt-2">
              <p className="text-[10px] font-semibold text-white/40 uppercase tracking-wider px-1">
                Salt names
              </p>
              <div className="flex flex-wrap gap-2">
                {data!.genericDrugs.map((g) => (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setQuery(g.genericName)}
                    className="rounded-full glass px-3 py-1 text-xs text-white/70 hover:text-emerald-300 hover:border-emerald-400/30 transition-colors"
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
        <p className="text-sm text-white/40 py-6 text-center">
          No matches for &ldquo;{debounced}&rdquo;. Try the salt name or a different spelling.
        </p>
      )}

      {isError && (
        <p className="text-sm text-red-400 py-6 text-center">
          Search is unavailable. Please try again.
        </p>
      )}
    </div>
  );
}