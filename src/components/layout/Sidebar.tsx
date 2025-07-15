import {
  Home,
  Compass,
  Users,
  MessageSquare,
  Bookmark,
  TrendingUp,
  Calendar,
  Target,
  Settings,
  Trophy,
  Utensils,
  Heart
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const navigationItems = [
  { icon: Home, label: "Trang chủ", to: "/" },
  { icon: Compass, label: "Khám phá", to: "/explore", badge: "Mới" },
  { icon: Users, label: "Cộng đồng", to: "/communities" },
  { icon: MessageSquare, label: "Tin nhắn", to: "/messages", badge: "3" },
  { icon: Bookmark, label: "Đã lưu", to: "/saved" },
  { icon: TrendingUp, label: "Xu hướng", to: "/trending" }
];

const fitnessItems = [
  { icon: Target, label: "Mục tiêu", to: "/goals" },
  { icon: Calendar, label: "Lịch tập", to: "/workouts" },
  { icon: Utensils, label: "dinh dưỡng", to: "/nutrition" }, 
  { icon: Trophy, label: "Thành tích", to: "/achievements" },
  { icon: Heart, label: "Sức khỏe", to: "/health" }
];


const suggestedUsers = [
  { name: "Sarah Johnson", handle: "@sarahfit", avatar: "/placeholder.svg", verified: true },
  { name: "Mike Chen", handle: "@mikelifts", avatar: "/placeholder.svg", verified: false },
  { name: "Emma Wilson", handle: "@emmayoga", avatar: "/placeholder.svg", verified: true }
];

interface SidebarProps {
  className?: string;
}

export const Sidebar = ({ className }: SidebarProps) => {
  return (
    <aside className={`sticky top-0 hidden lg:flex w-80 flex-col p-6 space-y-6 ${className}`}>
      {/* Main Navigation */}
      <Card className="p-4 bg-gradient-card border-0 shadow-soft">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.label} to={item.to} className="block">
                {({ isActive }) => (
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start ${
                      isActive
                        ? "bg-gradient-primary text-white shadow-glow"
                        : "hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                    {item.badge && (
                      <Badge
                        className={`ml-auto text-xs ${
                          item.badge === "New"
                            ? "bg-energy text-black"
                            : "bg-secondary text-white"
                        }`}
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Button>
                )}
              </NavLink>
            );
          })}
        </nav>
      </Card>

      {/* Fitness Tools */}
      <Card className="p-4 bg-gradient-card border-0 shadow-soft">
        <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">
          Fitness Tools
        </h3>
        <nav className="space-y-2">
          {fitnessItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink key={item.label} to={item.to} className="block">
                {({ isActive }) => (
                  <Button
                    variant="ghost"
                    className={`w-full justify-start ${
                      isActive ? "bg-muted text-primary" : "hover:bg-muted/50"
                    }`}
                  >
                    <Icon className="mr-3 h-5 w-5" />
                    {item.label}
                  </Button>
                )}
              </NavLink>
            );
          })}
        </nav>
      </Card>

      {/* Suggested Connections */}
      <Card className="p-4 bg-gradient-card border-0 shadow-soft">
        <h3 className="font-semibold text-sm text-muted-foreground mb-3 uppercase tracking-wider">
          Đề xuất cho bạn
        </h3>
        <div className="space-y-3">
          {suggestedUsers.map((user) => (
            <div key={user.handle} className="flex items-center space-x-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="bg-gradient-primary text-white text-sm">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-1">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  {user.verified && <Badge className="h-4 w-4 p-0 bg-primary">✓</Badge>}
                </div>
                <p className="text-xs text-muted-foreground truncate">{user.handle}</p>
              </div>
              <Button size="sm" variant="outline" className="text-xs px-3">
                Theo dõi
              </Button>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full text-sm text-primary mt-3">
          Xem tất cả đề xuất
        </Button>
      </Card>

      {/* Settings */}
      <NavLink to="/settings">
        {({ isActive }) => (
          <Button
            variant="ghost"
            className={`justify-start text-muted-foreground ${
              isActive ? "text-primary font-semibold" : ""
            }`}
          >
            <Settings className="mr-3 h-5 w-5" />
            Settings & Privacy
          </Button>
        )}
      </NavLink>
    </aside>
  );
};
