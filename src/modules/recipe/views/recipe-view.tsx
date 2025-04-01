import { RecipeSection } from "../sections/recipe-section";

export default function RecipeView({ id }: { id: string }) {
  return <RecipeSection id={id} />;
}
