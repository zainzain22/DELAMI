"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Target, BarChart3 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold">Delami Colorbox</h1>
            <Badge variant="outline">AI Trainer</Badge>
          </div>
          
          <Link href="/trainer">
            <Button variant="brand" className="shadow-elevated">
              Open Trainer
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-screen-xl mx-auto px-6 py-16">
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground">
              AI-Powered SKU
              <br />
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Recommendation Trainer
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Train and curate fashion recommendations with human-in-the-loop labeling. 
              Build better AI that understands style, fit, and color harmony.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/trainer">
              <Button size="lg" variant="brand" className="shadow-elevated text-lg px-8 py-6">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Training
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              <BarChart3 className="w-5 h-5 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Smart Pairing</CardTitle>
              <CardDescription>
                AI suggests optimal SKU combinations based on color theory, fit compatibility, and style harmony.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Human Feedback</CardTitle>
              <CardDescription>
                Merchandisers validate and curate recommendations with binary labels and detailed reasoning.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="shadow-card border-0">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle>Production API</CardTitle>
              <CardDescription>
                Deploy trained models via REST API for real-time recommendations on your e-commerce platform.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="mt-20 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">1,500</div>
              <div className="text-sm text-muted-foreground">Total SKUs</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">512</div>
              <div className="text-sm text-muted-foreground">Labeled Pairs</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">72%</div>
              <div className="text-sm text-muted-foreground">Accept Rate</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-foreground">99.5%</div>
              <div className="text-sm text-muted-foreground">API Uptime</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}