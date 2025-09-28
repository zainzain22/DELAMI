"use client";

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface TrainerNavigationProps {
  currentIndex: number;
  totalItems: number;
  onPrevious: () => void;
  onNext: () => void;
}

export function TrainerNavigation({ 
  currentIndex, 
  totalItems, 
  onPrevious, 
  onNext 
}: TrainerNavigationProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/30 border-t border-border">
      <Button 
        variant="outline" 
        size="sm"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>
      
      <div className="flex items-center gap-2">
        <Badge variant="secondary">
          {currentIndex + 1} of {totalItems}
        </Badge>
        <div className="text-xs text-muted-foreground">
          Use [A] / [D] keys to navigate
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm"
        onClick={onNext}
        disabled={currentIndex === totalItems - 1}
        className="flex items-center gap-2"
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}