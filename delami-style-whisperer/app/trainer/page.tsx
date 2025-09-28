"use client";

import { useState, useEffect, useCallback } from 'react';
import { TrainerHeader } from '@/components/trainer/TrainerHeader';
import { TrainerNavigation } from '@/components/trainer/TrainerNavigation';
import { BaseSKUCard } from '@/components/trainer/BaseSKUCard';
import { CandidateCard } from '@/components/trainer/CandidateCard';
import { useToast } from '@/hooks/use-toast';
import type { LabelSubmission, TrainerBatch } from '@/types/sku';
import { loadBatchData } from '@/data/batchDataParser';

export default function TrainerPage() {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [labels, setLabels] = useState<Map<string, LabelSubmission>>(new Map());
  const [trainerBatch, setTrainerBatch] = useState<TrainerBatch | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [submittingStates, setSubmittingStates] = useState<Map<string, boolean>>(new Map());
  const { toast } = useToast();

  // Load batch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const batchData = await loadBatchData();
        setTrainerBatch(batchData);
      } catch (error) {
        console.error('Failed to load batch data:', error);
        toast({
          title: "Error loading data",
          description: "Failed to load training data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  const currentItem = trainerBatch?.items[currentItemIndex];

  const handleLabelChange = useCallback((submission: Partial<LabelSubmission>) => {
    if (!submission.base_sku || !submission.candidate_sku) return;

    const key = `${submission.base_sku}-${submission.candidate_sku}`;
    const existingLabel = labels.get(key);
    
    const newLabel: LabelSubmission = {
      base_sku: submission.base_sku,
      candidate_sku: submission.candidate_sku,
      label: submission.label || existingLabel?.label || 'unknown',
      comment: submission.comment || existingLabel?.comment || '',
    };

    // Update labels
    setLabels(new Map(labels.set(key, newLabel)));
  }, [labels]);

  const handleIndividualSubmit = async (submission: LabelSubmission) => {
    const key = `${submission.base_sku}-${submission.candidate_sku}`;
    
    // Set submitting state
    setSubmittingStates(new Map(submittingStates.set(key, true)));
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update labels
      setLabels(new Map(labels.set(key, submission)));
      
      toast({
        title: "Submission successful",
        description: `Successfully submitted label for ${submission.candidate_sku}`,
      });
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "Failed to submit label. Please try again.",
        variant: "destructive",
      });
    } finally {
      // Clear submitting state
      setSubmittingStates(new Map(submittingStates.set(key, false)));
    }
  };

  const navigateToItem = (index: number) => {
    if (trainerBatch && index >= 0 && index < trainerBatch.items.length) {
      setCurrentItemIndex(index);
    }
  };

  const handlePrevious = useCallback(() => navigateToItem(currentItemIndex - 1), [currentItemIndex, trainerBatch]);
  const handleNext = useCallback(() => navigateToItem(currentItemIndex + 1), [currentItemIndex, trainerBatch]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
        return; // Don't trigger shortcuts when typing
      }

      switch (event.key.toLowerCase()) {
        case 'a':
          event.preventDefault();
          handlePrevious();
          break;
        case 'd':
          event.preventDefault();
          handleNext();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5': {
          event.preventDefault();
          const candidateIndex = parseInt(event.key) - 1;
          const candidate = currentItem?.candidates[candidateIndex];
          if (candidate) {
            const label = event.shiftKey ? 'bad' : 'good';
            handleLabelChange({
              base_sku: currentItem.base_sku,
              candidate_sku: candidate.sku_id,
              label,
              comment: ''
            });
          }
          break;
        }
        // Removed save functionality as we now use individual submit buttons
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentItemIndex, currentItem, handleLabelChange, handleNext, handlePrevious]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <h2 className="text-lg font-semibold mb-2">Loading training data...</h2>
          <p className="text-muted-foreground">Please wait while we load the 15 SKUs and their recommendations.</p>
        </div>
      </div>
    );
  }

  if (!trainerBatch || !currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold mb-2">No training data available</h2>
          <p className="text-muted-foreground">Please load a batch to begin training.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <TrainerHeader />

      <main className="max-w-screen-2xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6 min-h-[calc(100vh-8rem)]">
          {/* Base SKU Panel - Left 38% */}
          <div className="col-span-12 lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Base SKU</h2>
              <BaseSKUCard 
                baseSKU={currentItem.base_sku}
                baseImage={currentItem.base_image}
                baseTitle={currentItem.base_title}
              />
            </div>

            <TrainerNavigation
              currentIndex={currentItemIndex}
              totalItems={trainerBatch.items.length}
              onPrevious={handlePrevious}
              onNext={handleNext}
            />
          </div>

          {/* Candidates Panel - Right 62% */}
          <div className="col-span-12 lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-foreground">Candidates</h2>
              <div className="text-sm text-muted-foreground">
                Use [1-5] to accept, [Shift+1-5] to reject
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentItem.candidates.map((candidate, index) => {
                const key = `${currentItem.base_sku}-${candidate.sku_id}`;
                const currentLabel = labels.get(key);
                const isSubmitting = submittingStates.get(key) || false;
                
                return (
                  <CandidateCard
                    key={candidate.sku_id}
                    candidate={candidate}
                    baseSKU={currentItem.base_sku}
                    baseProductId={currentItem.base_product_id}
                    onLabelChange={handleLabelChange}
                    onSubmit={handleIndividualSubmit}
                    currentLabel={currentLabel?.label}
                    currentComment={currentLabel?.comment}
                    isSubmitting={isSubmitting}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}