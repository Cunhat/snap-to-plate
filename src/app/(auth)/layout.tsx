import { Utensils } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {children}
      <footer className="border-t py-4 md:py-6">
        <div className="container flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Utensils className="text-primary h-5 w-5" />
            <span className="text-lg font-semibold">SnapToPlate</span>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2025 SnapToPlate. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
