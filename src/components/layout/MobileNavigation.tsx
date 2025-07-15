import { Home, Search, PlusSquare, Heart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const MobileNavigation = () => {
  const navItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Search, label: "Search" },
    { icon: PlusSquare, label: "Create" },
    { icon: Heart, label: "Activity", badge: 5 },
    { icon: User, label: "Profile" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border md:hidden z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="icon"
              className={`flex flex-col items-center space-y-1 h-14 w-14 relative ${
                item.active ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className={`h-5 w-5 ${item.active ? "fill-current" : ""}`} />
              <span className="text-xs font-medium">{item.label}</span>
              {item.badge && (
                <Badge className="absolute top-1 right-2 h-4 w-4 p-0 bg-destructive text-xs flex items-center justify-center">
                  {item.badge}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};