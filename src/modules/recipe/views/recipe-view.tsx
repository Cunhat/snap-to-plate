import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Clock,
  Utensils,
  Users,
  BookmarkPlus,
  Share2,
  Printer,
  Youtube,
} from "lucide-react";
import { RecipeSection } from "../sections/recipe-section";

export default function RecipeView({ id }: { id: string }) {
  return <RecipeSection id={id} />;
}
