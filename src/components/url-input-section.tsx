import VideoUrlInput from "@/components/video-url-input";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function UrlInput() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <section className="flex-1 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">
              Paste a Video URL to Get Started
            </h2>
            <p className="text-muted-foreground">
              Works with YouTube, Instagram, and TikTok cooking videos
            </p>
          </div>
          <VideoUrlInput user={session?.user} />
        </div>
      </div>
    </section>
  );
}
