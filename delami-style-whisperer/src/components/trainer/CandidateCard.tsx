"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Check, X, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Candidate, LabelSubmission } from '@/types/sku';
import { submitFeedback, convertLabelToAcceptReject } from '@/services/feedbackService';
// Removed mockSKUs import as we're using real data now

interface CandidateCardProps {
  candidate: Candidate;
  baseSKU: string;
  baseProductId?: number; // Add base product ID for feedback
  onLabelChange: (submission: Partial<LabelSubmission>) => void;
  onSubmit: (submission: LabelSubmission) => void;
  currentLabel?: 'good' | 'bad' | 'unknown';
  currentComment?: string;
  isSubmitting?: boolean;
}

export function CandidateCard({ 
  candidate, 
  baseSKU, 
  baseProductId,
  onLabelChange, 
  onSubmit,
  currentLabel = 'unknown',
  currentComment = '',
  isSubmitting = false
}: CandidateCardProps) {
  const [comment, setComment] = useState(currentComment);
  
  const handleLabelClick = (label: 'good' | 'bad') => {
    const newLabel = currentLabel === label ? 'unknown' : label;
    onLabelChange({
      base_sku: baseSKU,
      candidate_sku: candidate.sku_id,
      label: newLabel,
      comment
    });
  };

  const handleCommentChange = (value: string) => {
    setComment(value);
    onLabelChange({
      base_sku: baseSKU,
      candidate_sku: candidate.sku_id,
      label: currentLabel,
      comment: value
    });
  };

  const handleSubmit = async () => {
    try {
      // First, call the local onSubmit for UI state management
      const submission: LabelSubmission = {
        base_sku: baseSKU,
        candidate_sku: candidate.sku_id,
        label: currentLabel,
        comment: comment
      };
      onSubmit(submission);

      // Then send feedback to backend
      await submitFeedback({
        sku_id: candidate.sku_id,
        accept_reject: convertLabelToAcceptReject(currentLabel),
        komentar: comment || undefined,
        image_url: candidate.image
      });
    } catch (error) {
      console.error('Failed to submit feedback to backend:', error);
      // Note: We don't throw here to avoid breaking the UI flow
      // The local state is already updated via onSubmit
    }
  };

  return (
    <Card className={cn(
      "shadow-card border-0 overflow-hidden transition-all duration-200",
      currentLabel === 'good' && "ring-2 ring-success",
      currentLabel === 'bad' && "ring-2 ring-destructive"
    )}>
      <div className="aspect-[3/4] bg-muted relative">
        <img 
          src={candidate.image} 
          alt={`Product ${candidate.sku_id}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Failed to load candidate image:', candidate.image);
            e.currentTarget.style.display = 'none';
          }}
        />
        <Badge 
          variant="secondary" 
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm"
        >
          {(candidate.score * 100).toFixed(0)}%
        </Badge>
      </div>
      
      <CardContent className="p-4 space-y-4">
        <div>
          <h4 className="font-medium text-sm">{candidate.title || 'Recommended Product'}</h4>
          <p className="text-xs text-muted-foreground">{candidate.sku_id}</p>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
            {candidate.proposed_reason}
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={currentLabel === 'good' ? 'success' : 'success-outline'}
            onClick={() => handleLabelClick('good')}
            className="flex-1"
          >
            <Check className="w-4 h-4 mr-1" />
            Accept
          </Button>
          <Button
            size="sm"
            variant={currentLabel === 'bad' ? 'destructive' : 'destructive-outline'}
            onClick={() => handleLabelClick('bad')}
            className="flex-1"
          >
            <X className="w-4 h-4 mr-1" />
            Reject
          </Button>
        </div>

        <Textarea
          placeholder="Add your reasoning (optional)..."
          value={comment}
          onChange={(e) => handleCommentChange(e.target.value)}
          className="text-xs resize-none"
          rows={2}
        />

        <Button
          onClick={handleSubmit}
          disabled={isSubmitting || currentLabel === 'unknown'}
          className="w-full"
          size="sm"
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? 'Mengirim...' : 'Kirim'}
        </Button>
      </CardContent>
    </Card>
  );
}