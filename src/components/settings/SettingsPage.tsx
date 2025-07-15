import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

export const SettingsPage = () => {
  const [email, setEmail] = useState("sarah@example.com");
  const [username, setUsername] = useState("sarahfit");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Settings</h1>

      {/* Profile Info */}
      <Card className="p-6 space-y-4">
        <div>
          <Label>Email</Label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div>
          <Label>Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <Button className="mt-2">Save Changes</Button>
      </Card>

      {/* Notifications */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label>Enable Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Get updates about comments, followers, and more
            </p>
          </div>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
      </Card>
    </div>
  );
};
