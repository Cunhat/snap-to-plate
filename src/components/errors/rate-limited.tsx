import { Clock } from "lucide-react";
import React from "react";

export default function RateLimited() {
  return (
    <main className="flex h-full items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
          <Clock className="text-primary h-8 w-8" />
        </div>
        <h2 className="text-lg font-semibold">Rate Limited</h2>
        <p className="text-muted-foreground text-sm">
          You have made too many requests. Please try again later.
        </p>
      </div>
    </main>
  );
}
