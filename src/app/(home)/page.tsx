import HomeView from "@/modules/home/ui/views/hove-view";
import { HydrateClient } from "@/trpc/server";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    <HydrateClient>
      <HomeView />
    </HydrateClient>
  );
}
