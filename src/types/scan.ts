export interface ScanOCR {
  brandName: string | null;
  confidence: number;
  rawText: string;
}

export interface ScanQuota {
  used: number;
  limit: number;
  remaining: number;
  resetsAt: string;
}

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

export interface ScanMatchedResult {
  scanId: string;
  matched: true;
  ocr: ScanOCR;
  matchScore: number;
  brand: Brand;
  composition: Composition[];
  alternatives: Alternative[];
  cheapest: Alternative | null;
  savings: Savings | null;
  quota: ScanQuota;
}

export interface ScanLowConfidenceResult {
  scanId: string;
  matched: false;
  reason: 'low_confidence';
  ocr: ScanOCR;
  quota: ScanQuota;
}

export interface ScanNoMatchResult {
  scanId: string;
  matched: false;
  reason: 'no_match';
  ocr: ScanOCR;
  suggestions: {
    brands: Array<Brand & { compositionSummary: string | null; score: number }>;
    genericDrugs: Array<{ id: string; genericName: string; score: number }>;
  };
  quota: ScanQuota;
}

export type ScanResult = ScanMatchedResult | ScanLowConfidenceResult | ScanNoMatchResult;

export interface ScanHistoryItem {
  id: string;
  imageUrl: string | null;
  imageDeleted: boolean;
  ocrBrandName: string | null;
  ocrConfidence: number | null;
  matchScore: number | null;
  matched: boolean;
  brand: {
    id: string;
    brandName: string;
    manufacturer: string | null;
    mrpPaise: number;
    packSize: number;
    packUnit: string;
    dosageForm: string;
    compositionSummary: string | null;
  } | null;
  createdAt: string;
}

export interface ScanDetail {
  id: string;
  imageUrl: string | null;
  imageDeleted: boolean;
  ocr: Omit<ScanOCR, 'confidence'> & { confidence: number | null };
  matched: boolean;
  matchScore: number | null;
  brand?: Brand;
  composition?: Composition[];
  alternatives?: Alternative[];
  cheapest?: Alternative | null;
  savings?: Savings | null;
  createdAt: string;
}