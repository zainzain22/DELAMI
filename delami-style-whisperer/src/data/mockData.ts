import type { SKU, TrainerBatch } from '@/types/sku';

export const mockSKUs: SKU[] = [
  { sku_id: "CBX-TS-0001", name: "White Crewneck Tee", category: "top", color_name: "White", fit: "regular", images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-JE-0102", name: "Indigo Slim Jeans", category: "bottom", color_name: "Indigo", fit: "slim", images: ["https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-CR-0201", name: "Charcoal Straight Pants", category: "bottom", color_name: "Charcoal", fit: "straight", images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-KN-0310", name: "Navy Lightweight Cardigan", category: "outerwear", color_name: "Navy", fit: "regular", images: ["https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-AC-0407", name: "Black Minimalist Cap", category: "accessory", color_name: "Black", fit: "n/a", images: ["https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop"] },
  { sku_id: "CBX-SN-0503", name: "White Low Sneakers", category: "shoes", color_name: "White", fit: "n/a", images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop"] },
  { sku_id: "CBX-SK-0604", name: "Black A-line Skirt", category: "bottom", color_name: "Black", fit: "regular", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-TS-0005", name: "Black Graphic Tee", category: "top", color_name: "Black", fit: "regular", images: ["https://images.unsplash.com/photo-1583743814966-8936f37f4678?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-SW-0702", name: "Beige Oversized Sweater", category: "top", color_name: "Beige", fit: "oversized", images: ["https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-JK-0801", name: "Light Denim Jacket", category: "outerwear", color_name: "Light Blue", fit: "regular", images: ["https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-TR-0901", name: "Tan Tapered Trousers", category: "bottom", color_name: "Tan", fit: "tapered", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-DR-1001", name: "Navy Shirt Dress", category: "dress", color_name: "Navy", fit: "regular", images: ["https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=400&h=600&fit=crop"] },
  { sku_id: "CBX-AC-0412", name: "Cream Tote Bag", category: "accessory", color_name: "Cream", fit: "n/a", images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop"] },
  { sku_id: "CBX-SH-1102", name: "Black Ankle Boots", category: "shoes", color_name: "Black", fit: "n/a", images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop"] },
  { sku_id: "CBX-BL-1201", name: "White Button-down Blouse", category: "top", color_name: "White", fit: "regular", images: ["https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop"] }
];

export const mockTrainerBatch: TrainerBatch = {
  items: [
    {
      base_sku: "CBX-TS-0001",
      base_image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=600&fit=crop",
      candidates: [
        { sku_id: "CBX-JE-0102", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop", score: 0.86, proposed_reason: "Indigo slim jeans contrast the white tee cleanly." },
        { sku_id: "CBX-CR-0201", image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=600&fit=crop", score: 0.81, proposed_reason: "Charcoal pants add neutral contrast and structure." },
        { sku_id: "CBX-KN-0310", image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=400&h=600&fit=crop", score: 0.78, proposed_reason: "Navy cardigan layers well without clashing." },
        { sku_id: "CBX-AC-0407", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=400&h=400&fit=crop", score: 0.72, proposed_reason: "Minimal black cap complements monochrome palette." },
        { sku_id: "CBX-SN-0503", image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop", score: 0.70, proposed_reason: "White sneakers keep the look cohesive and casual." }
      ]
    },
    {
      base_sku: "CBX-SW-0702",
      base_image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=600&fit=crop",
      candidates: [
        { sku_id: "CBX-SK-0604", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop", score: 0.79, proposed_reason: "Black A-line skirt balances the oversized sweater." },
        { sku_id: "CBX-TR-0901", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop", score: 0.77, proposed_reason: "Tan trousers create a soft neutral palette." },
        { sku_id: "CBX-SH-1102", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", score: 0.74, proposed_reason: "Ankle boots add structure to a loose top." },
        { sku_id: "CBX-AC-0412", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", score: 0.68, proposed_reason: "Cream tote aligns with beige tones for cohesion." },
        { sku_id: "CBX-JE-0102", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=600&fit=crop", score: 0.67, proposed_reason: "Slim denim keeps proportions tidy under volume." }
      ]
    },
    {
      base_sku: "CBX-BL-1201",
      base_image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop",
      candidates: [
        { sku_id: "CBX-TR-0901", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop", score: 0.83, proposed_reason: "Tan trousers pair well with white blouse for smart casual." },
        { sku_id: "CBX-SK-0604", image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=600&fit=crop", score: 0.81, proposed_reason: "Black skirt creates classic office contrast." },
        { sku_id: "CBX-JK-0801", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=600&fit=crop", score: 0.75, proposed_reason: "Light denim jacket dresses down for casual outings." },
        { sku_id: "CBX-AC-0412", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", score: 0.69, proposed_reason: "Cream tote complements clean blouse aesthetic." },
        { sku_id: "CBX-SH-1102", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", score: 0.68, proposed_reason: "Black boots add polish and edge." }
      ]
    }
  ]
};

export const commentPrompts = [
  "Explain color contrast in 1 sentence.",
  "Comment on fit compatibility in 1 sentence.", 
  "Is seasonality appropriate? Answer briefly."
];