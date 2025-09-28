"use client";

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BaseSKUCardProps {
  baseSKU: string;
  baseImage: string;
  baseTitle?: string;
}

export function BaseSKUCard({ baseSKU, baseImage, baseTitle }: BaseSKUCardProps) {
  return (
    <Card className="shadow-card border-0 overflow-hidden">
      <div className="aspect-[3/4] bg-muted">
        <img 
          src={baseImage} 
          alt={`SKU ${baseSKU}`}
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error('Failed to load SKU image:', baseImage);
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
      <CardContent className="p-6">
        <div className="space-y-3">
          <div>
            <h3 className="text-lg font-semibold text-foreground">{baseTitle || baseSKU}</h3>
            <p className="text-sm text-muted-foreground">{baseSKU}</p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-xs">
              Base SKU
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}