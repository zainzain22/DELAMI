export interface SKU {
  sku_id: string;
  name: string;
  category: 'top' | 'bottom' | 'outerwear' | 'dress' | 'accessory' | 'shoes';
  sub_category?: string;
  color_hex?: string;
  color_name: string;
  fit: string;
  style_tags?: string;
  materials?: string;
  images: string[];
  price_idr?: number;
  season?: string;
  stock_available?: boolean;
}

export interface PairLabel {
  base_sku: string;
  candidate_sku: string;
  label: 'good' | 'bad' | 'unknown';
  comment?: string;
  rationale_prompt?: string;
  created_by?: string;
  created_at?: string;
  source?: 'human_trainer' | 'rule' | 'model';
}

export interface TrainerBatch {
  items: TrainerItem[];
}

export interface TrainerItem {
  base_sku: string;
  base_image: string;
  base_title?: string;
  base_product_id?: number;
  candidates: Candidate[];
}

export interface Candidate {
  sku_id: string;
  image: string;
  score: number;
  proposed_reason: string;
  title?: string;
}

export interface LabelSubmission {
  base_sku: string;
  candidate_sku: string;
  label: 'good' | 'bad' | 'unknown';
  comment: string;
  rationale_prompt_used?: string;
}