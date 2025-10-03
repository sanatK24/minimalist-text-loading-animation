"use client";

import { useState } from "react";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function Home() {
  const [text, setText] = useState("Loading");
  const [speed, setSpeed] = useState(1);
  const [key, setKey] = useState(0);
  const [showContent, setShowContent] = useState(false);

  const presetTexts = [
    "Loading",
    "Welcome",
    "Processing",
    "Please Wait",
    "Almost There",
    "Just a Moment",
  ];

  const handleReplay = () => {
    setShowContent(false);
    setKey((prev) => prev + 1);
  };

  const handleAnimationComplete = () => {
    setShowContent(true);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
      {!showContent ? (
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center">
          <LoadingAnimation 
            key={key} 
            text={text} 
            speed={speed}
            onComplete={handleAnimationComplete}
          />
        </div>
      ) : (
        <div className="max-w-4xl w-full space-y-12 animate-in fade-in duration-500">
          {/* Animation Display */}
          <div className="flex items-center justify-center min-h-[300px] bg-gradient-to-br from-background via-secondary/20 to-background rounded-3xl border border-border/40 shadow-2xl">
            <LoadingAnimation key={key} text={text} speed={speed} />
          </div>

          {/* Controls */}
          <Card className="p-8 space-y-8 bg-card/50 backdrop-blur border-border/60">
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight">
                Animation Controls
              </h2>
              <p className="text-sm text-muted-foreground">
                Customize the Apple-style loading animation
              </p>
            </div>

            {/* Text Input */}
            <div className="space-y-3">
              <Label htmlFor="text-input" className="text-sm font-medium">
                Custom Text
              </Label>
              <Input
                id="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text..."
                className="max-w-md"
              />
            </div>

            {/* Preset Buttons */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Quick Presets</Label>
              <div className="flex flex-wrap gap-2">
                {presetTexts.map((preset) => (
                  <Button
                    key={preset}
                    variant={text === preset ? "default" : "outline"}
                    size="sm"
                    onClick={() => setText(preset)}
                    className="rounded-full"
                  >
                    {preset}
                  </Button>
                ))}
              </div>
            </div>

            {/* Speed Control */}
            <div className="space-y-3">
              <Label htmlFor="speed-slider" className="text-sm font-medium">
                Animation Speed: {speed.toFixed(1)}x
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  id="speed-slider"
                  value={[speed]}
                  onValueChange={(value) => setSpeed(value[0])}
                  min={0.5}
                  max={3}
                  step={0.1}
                  className="flex-1 max-w-md"
                />
                <span className="text-sm text-muted-foreground min-w-[60px] text-right">
                  {speed.toFixed(1)}x
                </span>
              </div>
            </div>

            {/* Replay Button */}
            <div className="pt-4">
              <Button
                onClick={handleReplay}
                size="lg"
                className="rounded-full px-8"
              >
                Replay Animation
              </Button>
            </div>
          </Card>

          {/* Info Section */}
          <div className="text-center space-y-3 pb-8">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Features
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="space-y-1">
                <div className="font-medium">Smooth Rise</div>
                <div className="text-muted-foreground">
                  Y-axis translation with easing
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Blur to Sharp</div>
                <div className="text-muted-foreground">
                  Progressive focus effect
                </div>
              </div>
              <div className="space-y-1">
                <div className="font-medium">Scale Pop</div>
                <div className="text-muted-foreground">
                  Subtle scale animation
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}