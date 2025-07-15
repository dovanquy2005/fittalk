import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useMessenger } from "./MessengerContext";


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

export const MessengerPopup = () => {
  const { popupOpen, closePopup, openChat } = useMessenger();
  const [activeTab, setActiveTab] = useState("Tất cả");

  if (!popupOpen) return null;

  return (
    <div className="fixed top-16 right-4 w-[360px] bg-background shadow-xl rounded-xl overflow-hidden border z-50 animate-fade-in">
      <div className="p-4 border-b font-semibold text-lg flex justify-between items-center">
        <span>Đoạn chat</span>
        <button onClick={closePopup} className="text-sm text-muted-foreground hover:underline">
          Đóng
        </button>
      </div>

      <div className="px-4 pt-2">
        <Input placeholder="Tìm kiếm trên Messenger" className="text-sm" />
      </div>

      {/* Tabs */}
      <div className="flex px-4 py-2 gap-2 text-sm text-muted-foreground">
        {["Tất cả", "Chưa đọc", "Nhóm"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-3 py-1 rounded-full",
              activeTab === tab ? "bg-primary text-white" : "hover:bg-muted"
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Chat List */}
      <ScrollArea className="h-[360px] px-2 pb-2">
        {mockChats.map((chat, idx) => (
          <div
            key={idx}
            onClick={() => {
              openChat(chat);   // mở cửa sổ chat
              closePopup();     // ẩn danh sách sau khi chọn
            }}
            className="flex items-center gap-3 p-3 hover:bg-muted rounded-lg cursor-pointer"
          >
            <div className="relative">
              <img src={chat.avatar} className="w-10 h-10 rounded-full object-cover" />
              {chat.online && (
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm truncate">{chat.name}</p>
              <p className="text-xs text-muted-foreground truncate">Bạn: {chat.message}</p>
            </div>
            <div className="text-xs text-muted-foreground whitespace-nowrap">{chat.time}</div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
