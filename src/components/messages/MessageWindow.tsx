// MessageWindow.tsx
import { X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface MessageWindowProps {
  chat: {
    name: string;
    avatar: string;
    online: boolean;
  };
  onClose: () => void;
  positionRight?: number;
}

export const MessageWindow = ({
  chat,
  onClose,
  positionRight = 0,
}: MessageWindowProps) => {
  return (
    <div
      className="fixed bottom-4 w-[360px] h-[430px] bg-background  border shadow-lg rounded-xl flex flex-col overflow-hidden z-50 animate-fade-in"
      style={{ right: `${positionRight}px` }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b bg-muted">
        <div className="flex items-center gap-2">
          <div className="relative">
            <img
              src={chat.avatar}
              className="w-8 h-8 rounded-full object-cover"
              alt="avatar"
            />
            {chat.online && (
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium leading-none">{chat.name}</p>
            <p className="text-xs text-muted-foreground">
              {chat.online ? "Đang hoạt động" : "Ngoại tuyến"}
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-black"
        >
          <X size={18} />
        </button>
      </div>

      {/* Message content */}
      <ScrollArea className="flex-1 px-3 py-2 space-y-2 bg-background  text-sm">
        <div className="text-left bg-muted p-2 rounded-lg w-fit max-w-[75%]">
          Xin chào bạn! 👋
        </div>
        <div className="text-right bg-primary text-white p-2 rounded-lg w-fit ml-auto max-w-[75%]">
          Hello nha!
        </div>
        <div className="text-left bg-muted p-2 rounded-lg w-fit max-w-[75%]">
          Dạo này sao rồi?
        </div>
        <div className="text-right bg-primary text-white p-2 rounded-lg w-fit ml-auto max-w-[75%]">
          Cũng ổn lắm luôn!
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-2 border-t bg-background">
        <div className="flex items-center gap-2">
          <Input placeholder="Nhắn tin..." className="text-sm flex-1" />
          <Button size="sm">Gửi</Button>
        </div>
      </div>
    </div>
  );
};
