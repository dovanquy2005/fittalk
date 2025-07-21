import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

import { MessengerProvider } from "@/components/messages/MessengerContext";
import { MessengerLayout } from "@/components/messages/MessengerLayout";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

import Explore from "./pages/Explore";
import Communities from "./pages/Communities";
import Saved from "./pages/Saved";
import MyGoals from "./pages/MyGoals";
import Workout from "./pages/Workout";
import Achievements from "./pages/Achievements";
import Health from "./pages/Health";
import Nutrition from "./pages/Nutrition";
import { Meals } from "./components/meals/Meals";
import { ProfilePage } from "@/components/profile/ProfilePage";
// import { SettingsLayout as SettingsPage } from "@/components/settings/SettingsLayout";
import { Settings } from "@/components/settings/Settings";
import { Messages } from "@/components/messages/Messages";

import { Login } from "@/components/auth/Login";
import { Register } from "@/components/auth/Register";
import {ForgotPassword} from "@/components/auth/ForgotPassword";
import { VerifyEmail } from "@/components/auth/VerifyEmail";
import { TwoFactor } from "@/components/auth/TwoFactor";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <MessengerProvider>
          <BrowserRouter>
            <Routes>

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-email" element={<VerifyEmail />} />
              <Route path="/2fa" element={<TwoFactor />} />
              
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/saved" element={<Saved />} />
              <Route path="/goals" element={<MyGoals />} />
              <Route path="/workout" element={<Workout />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/health" element={<Health />} />
              {/* meals và nutrition ở đây là một */}
              <Route path="/meals" element={<Meals />} />       
              <Route path="/nutrition" element={<Nutrition />} /> 

              <Route path="/messages" element={<Messages />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/settings" element={<Settings />} />
              {/* <Route path="/settings" element={<SettingsPage />} /> */}


              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>

          {/* Floating chat windows */}
          <MessengerLayout />
        </MessengerProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
