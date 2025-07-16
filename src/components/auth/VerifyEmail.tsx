// src/components/auth/VerifyEmail.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthPage } from "./AuthPage";
import { MailCheck } from "lucide-react";
import { Link } from "react-router-dom";

export const VerifyEmail = () => {
  return (
    <AuthPage>
      <Card className="p-8 space-y-6 bg-card text-card-foreground backdrop-blur shadow-strong">
        <CardHeader className="text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
            <MailCheck className="text-white w-7 h-7" />
          </div>
          <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Xác minh email
          </CardTitle>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Chúng tôi đã gửi liên kết xác minh đến địa chỉ email của bạn. Vui lòng kiểm tra và xác nhận để hoàn tất đăng ký.
          </p>
        </CardHeader>

        <CardContent className="space-y-4 text-center">
          <Button className="w-full bg-[image:var(--gradient-primary)] shadow-glow hover:opacity-90">
            Gửi lại email
          </Button>
          <Link to="/login" className="text-sm text-primary hover:underline block">
            Quay lại đăng nhập
          </Link>
        </CardContent>
      </Card>
    </AuthPage>
  );
};


