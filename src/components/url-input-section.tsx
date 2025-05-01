import VideoUrlInput from "@/components/video-url-input";
import type { User } from "better-auth";

type UrlInputSectionProps = {
  user: User | undefined;
};

export default function UrlInput({ user }: UrlInputSectionProps) {
  return (
    <section className="flex-1 py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-3xl space-y-8">
          <div className="space-y-2 text-center">
            <h2 className="text-3xl font-bold tracking-tighter">
              Paste a YouTube Video URL to Get Started
            </h2>
          </div>
          <VideoUrlInput user={user} />
        </div>
      </div>
    </section>
  );
}
