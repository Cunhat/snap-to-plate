"use client";

import { Progress } from "@/components/ui/progress";
import { cn, SubscriptionTiers } from "@/lib/utils";

import { InfoIcon } from "lucide-react";
import Link from "next/link";

interface TokenDisplayProps {
  totalTokens: number;
}

export default function TokenDisplay({ totalTokens }: TokenDisplayProps) {
  const maxTokens = SubscriptionTiers.freeTier;
  const percentage = Math.min(
    100,
    Math.max(0, Math.round((totalTokens / maxTokens) * 100)),
  );

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium">Daily Tokens</span>
        </div>
        <span
          className={cn(
            "text-muted-foreground text-sm",
            totalTokens >= maxTokens && "text-red-500",
          )}
        >
          {totalTokens.toLocaleString()} / {maxTokens.toLocaleString()}
        </span>
      </div>
      <Progress value={percentage} className="h-2" />
    </div>
  );
}
