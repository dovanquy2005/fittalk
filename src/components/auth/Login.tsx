// src/components/auth/Login.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { AuthPage } from "./AuthPage";
import { Mail, Lock } from "lucide-react";

export const Login = () => {
  return (
    <AuthPage>
      <Card className="p-8 space-y-6 bg-card text-card-foreground backdrop-blur shadow-strong">
        <CardHeader className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <span className="text-white font-bold text-xl">FT</span>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Đăng nhập FitTalk
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@example.com" className="pl-10" />
            </div>
          </div>

          <div>
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" className="pl-10" />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox" />
              <span>Ghi nhớ</span>
            </label>
            <Link to="/forgot-password" className="text-primary hover:underline">Quên mật khẩu?</Link>
          </div>

          <Button className="w-full shadow-glow bg-[image:var(--gradient-primary)] hover:opacity-90">
            Đăng nhập
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-primary hover:underline">Đăng ký</Link>
          </p>
        </CardContent>
      </Card>
    </AuthPage>
  );
};


