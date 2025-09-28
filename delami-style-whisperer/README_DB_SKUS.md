# Database SKUs JSON

## File: batch_20_db_skus_clean.json

### Source
- **Database**: PostgreSQL `belami`
- **Tables**: `delami_products` + `delami_product_images`
- **Records**: 20 SKUs with images
- **Generated**: 2025-09-26 20:14:01

### Structure
```json
{
  "success": true,
  "batch_result": {
    "total_skus": 20,
    "successful_skus": 20,
    "failed_skus": 0,
    "total_recommendations": 100,
    "results": [
      {
        "sku_id": "DB_8052_9097896591618",
        "sku_category": "Pants",
        "sku_title": "Multiple Pocket Denim Pants",
        "sku_description": "...",
        "sku_image_url": "https://cdn.shopify.com/...",
        "sku_image_base64": "data:image/jpeg;base64,...",
        "analysis": {...},
        "recommendations": [...]
      }
    ]
  }
}
```

### Key Features
- ✅ **20 SKUs** from database `delami_product_images`
- ✅ **Real product images** from Shopify CDN
- ✅ **Base64 encoded images** for offline use
- ✅ **5 recommendations per SKU** (100 total)
- ✅ **Clean JSON format** without escape characters
- ✅ **Ready for frontend** display

### Usage in Frontend
```javascript
// Load JSON data
const data = await fetch('./batch_20_db_skus_clean.json').then(r => r.json());

// Display SKUs
data.batch_result.results.forEach(sku => {
  console.log(`SKU: ${sku.sku_title}`);
  console.log(`Image: ${sku.sku_image_url}`);
  console.log(`Recommendations: ${sku.recommendations.length}`);
});
```
