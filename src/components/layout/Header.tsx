import { useState } from "react";
import { NavLink,useNavigate } from "react-router-dom";
import { Search, Bell, MessageCircle, User, Menu, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "./ThemeToggle";
import { useMessenger } from "@/components/messages/MessengerContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { openPopup } = useMessenger();
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-sm">FT</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                FitTalk
              </span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              {[
                { label: "Khám phá", to: "/discover" },
                { label: "Công đồng", to: "/communities" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `text-sm font-medium px-2 py-1 rounded transition-colors ${
                      isActive
                        ? "text-primary font-semibold border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* Search Bar */}
          <div className="hidden sm:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Tìm kiếm tập luyện, dinh dưỡng, con người..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted/50 border-none focus:bg-background transition-colors"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Create Post Button */}
            <Button
              size="sm"
              className="hidden sm:flex bg-gradient-primary hover:opacity-90 shadow-glow"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tạo
            </Button>

            <ThemeToggle />

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-energy text-xs">
                3
              </Badge>
            </Button>

            {/* Messages */}
            <Button
              onClick={openPopup}
              variant="ghost"
              size="icon"
              className="relative h-9 w-9"
            >
              <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
              <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-secondary text-xs">
                1
              </Badge>
            </Button>

            {/* Profile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/images/profile-3.jpg" alt="Profile" />
                    <AvatarFallback className="bg-gradient-primary text-white">JD</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuItem onClick={() => navigate("/profile")}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Trang cá nhân</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  Cài đặt & bảo mật
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
