"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SimpleTestPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Simple Component Test</h1>
        
        {/* Button Tests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Buttons</h2>
          <div className="flex gap-4 flex-wrap">
            <Button>Default Button</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
            <Button variant="brand">Brand Button</Button>
          </div>
        </div>

        {/* Badge Tests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Badges</h2>
          <div className="flex gap-4 flex-wrap">
            <Badge>Default Badge</Badge>
            <Badge variant="secondary">Secondary Badge</Badge>
            <Badge variant="outline">Outline Badge</Badge>
            <Badge variant="destructive">Destructive Badge</Badge>
          </div>
        </div>

        {/* Card Tests */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Card 1</CardTitle>
                <CardDescription>This is a test card description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>This is the card content area.</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Test Card 2</CardTitle>
                <CardDescription>Another test card</CardDescription>
              </CardHeader>
              <CardContent>
                <p>More card content here.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tailwind Test */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Tailwind Classes Test</h2>
          <div className="bg-blue-500 text-white p-4 rounded-lg">
            <p>If you can see this blue box with white text, Tailwind is working!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

