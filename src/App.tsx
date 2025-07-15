import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { ProfilePage } from "@/components/profile/ProfilePage";
import { SettingsPage } from "@/components/settings/SettingsPage";
import { ExplorePage } from "@/components/explore/ExplorePage";

import { MessagesPage } from "@/components/messages/MessagesPage";
import { MessengerProvider } from "@/components/messages/MessengerContext";
import { MessengerLayout } from "@/components/messages/MessengerLayout";

import { ThemeProvider } from "@/components/layout/ThemeProvider"; // 👈 thêm dòng này

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider> {/* 👈 bọc toàn bộ app để theme đồng bộ */}
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MessengerProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/messages" element={<MessagesPage />} />
              <Route path="/explore" element={<ExplorePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

          {/* Khung tin nhắn (popup + windows) */}
          <MessengerLayout />
        </MessengerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
