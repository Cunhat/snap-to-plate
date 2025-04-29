"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  Utensils,
  CheckCircle2,
  Clock,
  List,
  ChefHat,
  Calculator,
  Hourglass,
  Loader2,
  Loader,
} from "lucide-react";

interface GeneratingRecipeModalProps {
  videoUrl: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function GeneratingRecipeModal({
  videoUrl,
  open,
  onOpenChange,
}: GeneratingRecipeModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  const steps = [
    {
      text: "Analyzing video content...",
      icon: <Clock className="text-primary h-5 w-5 animate-pulse" />,
      duration: 1000,
    },
    {
      text: "Identifying ingredients...",
      icon: <List className="text-primary h-5 w-5 animate-pulse" />,
      duration: 1000,
    },
    {
      text: "Extracting cooking steps...",
      icon: <ChefHat className="text-primary h-5 w-5 animate-pulse" />,
      duration: 1000,
    },
    {
      text: "Calculating nutrition information...",
      icon: <Calculator className="text-primary h-5 w-5 animate-pulse" />,
      duration: 1000,
    },
    {
      text: "Generating complete recipe...",
      icon: <Utensils className="text-primary h-5 w-5 animate-pulse" />,
      duration: 1000,
    },
    {
      text: "Recipe ready!",
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      duration: 500,
    },
  ];

  // Format the URL for display
  const displayUrl =
    videoUrl.length > 50 ? videoUrl.substring(0, 47) + "..." : videoUrl;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <div className="flex flex-col items-center space-y-2 text-center">
          <div className="bg-accent rounded-full p-3">
            <Utensils className="text-accent-foreground h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold">Creating Your Recipe</h2>
          <p className="text-muted-foreground">
            Our AI is analyzing the video and generating a detailed recipe
          </p>
        </div>

        <div className="bg-muted text-muted-foreground rounded-md p-3 text-sm break-all">
          <span className="font-medium">Source:</span> {displayUrl}
        </div>

        <div className="space-y-3 pt-2">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`text-muted-foreground flex items-center gap-3 rounded-md p-2`}
            >
              <Loader className="text-primary h-5 w-5 animate-spin" />
              <span>{step.text}</span>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground text-center text-xs">
          This process typically takes less than a minute
        </p>
      </AlertDialogContent>
    </AlertDialog>
  );
}
