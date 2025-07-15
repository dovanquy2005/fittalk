// MessagesPage.tsx
import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { MessageWindow } from "@/components/messages/MessageWindow";

const mockChats = [
  {
    name: "NP Thanh Tuấn",
    message: "ok",
    time: "1 giờ",
    avatar: "/images/profile-1.jpg",
    online: true,
  },
  {
    name: "Đỗ Văn Quý",
    message: "Ok",
    time: "1 giờ",
    avatar: "/images/profile-2.jpg",
    online: true,
  },
  {
    name: "Cộng đồng SGU",
    message: "Mik pass PIDC, tiết...",
    time: "5 giờ",
    avatar: "/images/profile-3.jpg",
    online: false,
  },
];

export const MessagesPage = () => {
  const [selectedChat, setSelectedChat] = useState<any | null>(null);

  return (
    <div className="flex h-[calc(100vh-4rem)]">
      {/* Sidebar chat list */}
      <div className="w-80 border-r p-4 space-y-4">
        <Input placeholder="Tìm kiếm cuộc trò chuyện" className="text-sm" />
        <ScrollArea className="h-full">
          {mockChats.map((chat, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedChat(chat)}
              className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer"
            >
              <img src={chat.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-medium text-sm truncate">{chat.name}</p>
                <p className="text-xs text-muted-foreground truncate">Bạn: {chat.message}</p>
              </div>
              <div className="text-xs text-muted-foreground whitespace-nowrap">{chat.time}</div>
            </div>
          ))}
        </ScrollArea>
      </div>

      {/* Chat window */}
      <div className="flex-1">
        {selectedChat ? (
          <MessageWindow chat={selectedChat} onClose={() => setSelectedChat(null)} />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Chọn một cuộc trò chuyện để bắt đầu
          </div>
        )}
      </div>
    </div>
  );
};

