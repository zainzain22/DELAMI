"use client";

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface TrainerHeaderProps {
  // Removed save-related props as we're removing Save All button
}

export function TrainerHeader({}: TrainerHeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-screen-2xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-lg font-semibold">Colorbox</h1>
            <Badge variant="outline" className="text-xs">AI Trainer</Badge>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search SKU..." 
              className="pl-10 w-64 bg-background"
            />
          </div>
        </div>
      </div>
    </header>
  );
}