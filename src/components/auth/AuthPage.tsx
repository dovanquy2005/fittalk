// src/components/auth/AuthPage.tsx
import { PropsWithChildren } from "react";

export const AuthPage = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-xl animate-slide-up">
        {children}
      </div>
    </div>
  );
};
