# API Integration Documentation

## Backend Integration

The frontend now integrates with the backend feedback service to save user feedback to the database.

### Configuration

1. **Environment Variables**: Create a `.env.local` file in the project root:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

2. **Backend Service**: Ensure the backend service is running on the configured URL.

### API Endpoint

- **URL**: `POST /feedback`
- **Payload**:
```json
{
  "selected_product_id": 5624979194006,
  "recommended_product_id": 5624979423382,
  "is_good": true,
  "comment": "Great recommendation!"
}
```

### Data Flow

1. User selects Accept/Reject for a recommendation
2. User adds optional comment
3. User clicks "Kirim" button
4. Frontend sends feedback to backend API
5. Backend saves to `recommendation_feedback` table
6. Frontend shows success/error notification

### Error Handling

- If backend is unavailable, the UI still updates locally
- Network errors are logged to console
- User gets toast notification for success/failure

### Database Schema

The feedback is saved to the `recommendation_feedback` table with:
- `selected_product_id`: ID of the base SKU product
- `recommended_product_id`: ID of the recommended product
- `is_good`: Boolean (true for accept, false for reject)
- `comment`: Optional user comment
- `created_at`: Timestamp

### Testing

1. Start the backend service: `python -m uvicorn app.main:app --reload`
2. Start the frontend: `npm run dev`
3. Navigate to `/trainer`
4. Select Accept/Reject for recommendations
5. Add comments and click "Kirim"
6. Check the database for saved feedback





