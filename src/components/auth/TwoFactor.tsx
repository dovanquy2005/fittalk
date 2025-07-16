// src/components/auth/TwoFactor.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthPage } from "./AuthPage";
import { ShieldCheck } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";

export const TwoFactor = () => {
  return (
    <AuthPage>
      <Card className="p-8 space-y-6 bg-card text-card-foreground backdrop-blur shadow-strong">
        <CardHeader className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <ShieldCheck className="text-white w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Xác thực 2 bước
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Vui lòng nhập mã xác minh được gửi đến email hoặc ứng dụng xác thực của bạn.
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="otp">Mã xác minh (6 số)</Label>
            <Input id="otp" type="text" placeholder="123456" maxLength={6} />
          </div>

          <Button className="w-full bg-[image:var(--gradient-primary)] shadow-glow hover:opacity-90">
            Xác nhận
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Không nhận được mã?{" "}
            <button className="text-primary hover:underline">Gửi lại</button>
          </p>

          <Link to="/login" className="text-sm text-center text-primary hover:underline block">
            Quay lại đăng nhập
          </Link>
        </CardContent>
      </Card>
    </AuthPage>
  );
};


