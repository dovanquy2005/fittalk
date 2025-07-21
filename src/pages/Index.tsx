import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { Feed } from "@/components/feed/Feed";
import { TrendingTopics } from "@/components/trending/TrendingTopics";
import { WelcomeFlow } from "@/components/onboarding/WelcomeFlow";
import { MobileNavigation } from "@/components/layout/MobileNavigation";
import { ProfilePage } from "@/components/profile/ProfilePage";

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [currentView, setCurrentView] = useState<"feed" | "profile" | "settings">("feed");


  //  if (showOnboarding) {
  //    return <WelcomeFlow onComplete={() => setShowOnboarding(false)} />;
  //  }

  return (
      <div className="min-h-screen bg-background overflow-x-hidden">
  <Header />

  <div className="flex h-[calc(100vh-4rem)] max-w-full overflow-x-hidden">
    
    {/* Sidebar */}
    <div className="sticky top-16 h-[calc(100vh-4rem)] w-80 overflow-y-auto overflow-x-hidden scroll-on-hover hidden lg:block">
      <Sidebar />
    </div>

    {/* Main content */}
    <main className="flex-1 min-w-0 h-[calc(100vh-4rem)] overflow-y-auto overflow-x-hidden scroll-on-hover px-2 py-6 box-border">
      {currentView === "feed" ? <Feed /> : <ProfilePage />}
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

export default Index;
