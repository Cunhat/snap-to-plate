import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CookingPot, Search } from "lucide-react";
import SavedRecipesHeader from "../sections/saved-recipes-header";
import { SavedRecipesList } from "../sections/saved-recipes-list";

export default function SavedRecipesView() {
  return (
    <main className="flex-1 py-8">
      <div className="container px-4 md:px-6">
        <SavedRecipesHeader />
        <SavedRecipesList />
      </div>
    </main>
  );
}
