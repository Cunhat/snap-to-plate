import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Clock } from "lucide-react";
import Link from "next/link";

type RecipeCardProps = {
  id: string;
  title: string;
  image: string;
  source: string;
  duration: string;
  category: string;
  saved: string;
};

export default function RecipeCard({
  id,
  title,
  image,
  source,
  duration,
  category,
  saved,
}: RecipeCardProps) {
  return (
    <Card key={id} className="h-full gap-0 overflow-hidden py-0">
      <div className="relative aspect-video max-h-[250px]">
        <img
          src={image || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover"
        />
        <Badge className="absolute top-2 right-2">{source}</Badge>
      </div>
      <CardContent className="p-4">
        <Link href={`/recipe/${id}`}>
          <h3 className="hover:text-primary text-lg font-semibold transition-colors">
            {title}
          </h3>
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <Badge variant="outline">{category}</Badge>
          <div className="text-muted-foreground flex items-center text-sm">
            <Clock className="mr-1 h-3.5 w-3.5" />
            {duration}
          </div>
        </div>
      </CardContent>
      {saved && (
        <CardFooter className="p-4 pt-0">
          <div className="text-muted-foreground text-sm">Saved {saved}</div>
        </CardFooter>
      )}
    </Card>
  );
}
