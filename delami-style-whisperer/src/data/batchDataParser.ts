import type { TrainerBatch, TrainerItem, Candidate } from '@/types/sku';

interface BatchResult {
  success: boolean;
  total_skus: number;
  successful_skus: number;
  failed_skus: number;
  total_recommendations: number;
  results: SKUResult[];
}

interface SKUResult {
  sku_id: string;
  sku_title?: string;
  sku_category: string;
  sku_image_url: string;
  sku_image_base64: string;
  analysis: {
    detected_category: string;
    detected_style: string;
    detected_colors: string[];
    detected_materials: string[];
    detected_occasion: string;
    analysis_explanation: string;
    confidence_score: number;
  };
  recommendations: Recommendation[];
}

interface Recommendation {
  product_id: number;
  title: string;
  description: string;
  product_type: string;
  tags: string[];
  min_price: number;
  image_url: string;
  reason: string;
  shopify_id: string;
}

interface BatchData {
  success: boolean;
  batch_result: BatchResult;
}

export function parseBatchData(jsonData: BatchData): TrainerBatch {
  const items: TrainerItem[] = jsonData.batch_result.results.map((result) => {
    const candidates: Candidate[] = result.recommendations.map((rec, index) => ({
      sku_id: rec.shopify_id,
      image: rec.image_url,
      score: 0.8 - (index * 0.1), // Generate decreasing scores
      proposed_reason: rec.reason,
      title: rec.title, // Add title for recommendations
    }));

    // Extract product ID from SKU (e.g., "5624979194006" -> 5624979194006)
    const baseProductId = extractProductIdFromSku(result.sku_id);

    return {
      base_sku: result.sku_id,
      base_image: result.sku_image_url,
      base_title: result.sku_title || result.sku_id, // Add title for SKU
      base_product_id: baseProductId, // Add product ID for feedback
      candidates,
    };
  });

  return {
    items,
  };
}

function extractProductIdFromSku(skuId: string): number {
  // SKU ID is now directly the shopify_id (e.g., "5624979194006")
  // Convert string to number
  const productId = parseInt(skuId, 10);
  
  // If conversion fails, fallback to hash method
  if (isNaN(productId)) {
    let hash = 0;
    for (let i = 0; i < skuId.length; i++) {
      const char = skuId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash) % 1000000 + 1;
  }
  
  return productId;
}

export async function loadBatchData(): Promise<TrainerBatch> {
  try {
    const response = await fetch('/batch_15_data.json');
    const jsonData: BatchData = await response.json();
    return parseBatchData(jsonData);
  } catch (error) {
    console.error('Error loading batch data:', error);
    throw new Error('Failed to load batch data');
  }
}
