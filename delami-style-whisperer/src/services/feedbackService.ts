interface FeedbackPayload {
  sku_id: string;
  accept_reject: number; // 0=reject, 1=accept
  komentar?: string;
  image_url?: string;
}

interface FeedbackResponse {
  id: number;
  sku_id: string;
  accept_reject: number;
  komentar?: string;
  image_url?: string;
  created_at: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export async function submitFeedback(payload: FeedbackPayload): Promise<FeedbackResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/feedback`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
}

export function convertLabelToAcceptReject(label: 'good' | 'bad' | 'unknown'): number {
  return label === 'good' ? 1 : 0;
}

