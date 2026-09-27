export interface Brand {
  id: string;
  brandName: string;
  manufacturer: string | null;
  mrpPaise: number;
  packSize: number;
  packUnit: string;
  dosageForm: string;
  isGeneric: boolean;
}

export interface Alternative extends Brand {
  unitPricePaise: number;
}

export interface Composition {
  drugId: string;
  genericName: string;
  drugClass: string | null;
  isOtc: boolean;
  strengthValue: number;
  strengthUnit: string;
}

export interface Savings {
  savingsPaise: number;
  savingsPercent: number;
  perPackSize: number;
}

export interface BrandWithAlternatives {
  brand: Brand;
  composition: Composition[];
  alternatives: Alternative[];
  cheapest: Alternative | null;
  savings: Savings | null;
}

export interface BrandSearchHit extends Brand {
  compositionSummary: string | null;
  score: number;
}

export interface DrugSearchHit {
  id: string;
  genericName: string;
  drugClass: string | null;
  isOtc: boolean;
  score: number;
}

export interface DrugSearchResults {
  query: string;
  normalizedQuery: string;
  brands: BrandSearchHit[];
  genericDrugs: DrugSearchHit[];
}