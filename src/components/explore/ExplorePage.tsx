import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { TrendingTopics } from "@/components/trending/TrendingTopics";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

const videos = [
  {
    src: "/videos/video-1.mp4",
    user: "@emmayoga",
    caption: "🔥 HIIT 15s thử thách tim mạch #HIIT"
  },
  {
    src: "/videos/video-2.mp4",
    user: "@yogamaster",
    caption: "🧘 Yoga sáng để khởi động #wellness"
  },
  {
    src: "/videos/video-3.mp4",
    user: "@coreking",
    caption: "💪 Thử thách plank 30s mỗi ngày #plank"
  }
];

const ShortVideoCard = ({ videoSrc, user, caption }: { videoSrc: string; user: string; caption: string }) => (
  <div className="rounded-xl overflow-hidden bg-black relative aspect-video shadow-lg">
    <video
      src={videoSrc}
      controls
      muted
      className="object-cover w-full h-full"
    />
    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white">
      <p className="font-semibold">{user}</p>
      <p className="text-sm">{caption}</p>
    </div>
  </div>
);

export const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />

      <div className="flex h-[calc(100vh-4rem)] max-w-full overflow-x-hidden">
        {/* Sidebar */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] w-80 overflow-y-auto overflow-x-hidden scroll-on-hover hidden lg:block">
          <Sidebar />
        </div>

        {/* Main content - video shorts */}
        <main className="flex-1 min-w-0 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden scroll-on-hover px-2 py-6 box-border space-y-6">
          <h1 className="text-2xl font-bold px-2">Khám phá video</h1>
          {videos.map((v, idx) => (
            <ShortVideoCard
              key={idx}
              videoSrc={v.src}
              user={v.user}
              caption={v.caption}
            />
          ))}
        </main>

        {/* Trending topics */}
        <div className="sticky top-16 h-[calc(100vh-4rem)] w-80 overflow-y-auto overflow-x-hidden scroll-on-hover hidden xl:block pr-2 box-border">
          <TrendingTopics />
        </div>
      </div>

      <MobileNavigation />
    </div>
  );
};


