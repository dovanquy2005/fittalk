import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

import {
  AccountSection,
  PasswordSection,
  NotificationSection,
  PrivacySection,
  LanguageSection,
  TwoFactorSection, 
  DangerZone 
} from "./sections";

const sections = [
  { key: "account", label: "Tài khoản" },
  { key: "password", label: "Mật khẩu" },
  { key: "notifications", label: "Thông báo" },
  { key: "privacy", label: "Bảo mật & riêng tư" },
  { key: "language", label: "Ngôn ngữ" },
  { key: "2fa", label: "Xác thực 2 bước" },
  { key: "danger", label: "Nguy hiểm" },
];

export const SettingsLayout = () => {
  const [active, setActive] = useState("account");

  const renderSection = () => {
    switch (active) {
      case "account": return <AccountSection />;
      case "password": return <PasswordSection />;
      case "notifications": return <NotificationSection />;
      case "privacy": return <PrivacySection />;
      case "language": return <LanguageSection />;
      case "2fa": return <TwoFactorSection />;
      case "danger": return <DangerZone />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-1/4 bg-card p-4 shadow-strong">
        <h2 className="text-xl font-bold mb-4">Cài đặt</h2>
        <div className="space-y-2">
          {sections.map((s) => (
            <Button
              key={s.key}
              variant="ghost"
              className={cn(
                "w-full justify-start text-left",
                active === s.key && "bg-muted text-primary font-semibold"
              )}
              onClick={() => setActive(s.key)}
            >
              {s.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <Card className="p-6 shadow-strong bg-card text-card-foreground rounded-xl animate-fade-in">
          {renderSection()}
        </Card>
      </div>
    </div>
  );
};
