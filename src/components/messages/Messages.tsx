import { useState } from "react";
import { Search, Phone, Video, MoreVertical, Send, Smile, Paperclip, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Header } from "@/components/layout/Header";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

const mockConversations = [
  {
    id: 1,
    user: {
      name: "Sarah Johnson",
      handle: "@sarahfit",
      avatar: "/placeholder.svg",
      isOnline: true
    },
    lastMessage: "Buổi tập hôm nay tuyệt vời! 💪",
    timestamp: "2 phút trước",
    unreadCount: 2,
    isActive: true
  },
  {
    id: 2,
    user: {
      name: "Mike Chen",
      handle: "@mikelifts",
      avatar: "/placeholder.svg",
      isOnline: false
    },
    lastMessage: "Cảm ơn vì đã chỉ dẫn form nhé!",
    timestamp: "1 giờ trước",
    unreadCount: 0,
    isActive: false
  },
  {
    id: 3,
    user: {
      name: "Emma Wilson",
      handle: "@emmayoga",
      avatar: "/placeholder.svg",
      isOnline: true
    },
    lastMessage: "Buổi tập yoga thật tuyệt vời",
    timestamp: "3 giờ trước",
    unreadCount: 1,
    isActive: false
  },
  {
    id: 4,
    user: {
      name: "Alex Rodriguez",
      handle: "@alexruns",
      avatar: "/placeholder.svg",
      isOnline: false
    },
    lastMessage: "Hẹn gặp bạn ở phòng gym ngày mai",
    timestamp: "1 ngày trước",
    unreadCount: 0,
    isActive: false
  }
];

const mockMessages = [
  {
    id: 1,
    senderId: 1,
    text: "Này! Buổi tập hôm nay của bạn thế nào?",
    timestamp: "10:30 SA",
    isOwn: false
  },
  {
    id: 2,
    senderId: "me",
    text: "Tuyệt vời lắm! Mình đã tập HIIT 45 phút",
    timestamp: "10:32 SA",
    isOwn: true
  },
  {
    id: 3,
    senderId: 1,
    text: "Tuyệt thật! Mình rất thích các bài tập HIIT",
    timestamp: "10:33 SA",
    isOwn: false
  },
  {
    id: 4,
    senderId: "me",
    text: "Yeah! Mai muốn tập cùng mình không?",
    timestamp: "10:35 SA",
    isOwn: true
  },
  {
    id: 5,
    senderId: 1,
    text: "Buổi tập hôm nay tuyệt vời! 💪",
    timestamp: "Vừa xong",
    isOwn: false
  }
];

export const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      console.log("Sending:", newMessage);
      setNewMessage("");
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.user.handle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
      
        <main className="flex-1 flex h-[calc(100vh-4rem)]">
          {/* Conversations List */}
          <div className="w-full md:w-80 bg-card border-r border-border">
            <div className="p-4 border-b border-border">
              <h2 className="text-xl font-semibold mb-4">Tin nhắn</h2>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Tìm kiếm cuộc trò chuyện..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-2">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      conversation.isActive ? 'bg-muted' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.user.avatar} alt={conversation.user.name} />
                        <AvatarFallback className="bg-gradient-primary text-white">
                          {conversation.user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.user.isOnline && (
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card" />
                      )}
                    </div>
                    
                    <div className="flex-1 ml-3 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium truncate">{conversation.user.name}</h3>
                        <span className="text-xs text-muted-foreground">
                          {conversation.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate mt-1">
                        {conversation.lastMessage}
                      </p>
                    </div>

                    {conversation.unreadCount > 0 && (
                      <Badge className="ml-2 bg-primary text-white h-5 w-5 p-0 flex items-center justify-center text-xs">
                        {conversation.unreadCount}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col hidden md:flex">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={selectedConversation.user.avatar} alt={selectedConversation.user.name} />
                      <AvatarFallback className="bg-gradient-primary text-white">
                        {selectedConversation.user.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.user.isOnline && (
                      <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">{selectedConversation.user.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.user.isOnline ? 'Đang hoạt động' : 'Hoạt động 2 giờ trước'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button size="icon" variant="ghost">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="ghost">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {mockMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                      message.isOwn
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex items-center space-x-2">
                <Button size="icon" variant="ghost">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Camera className="h-4 w-4" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    placeholder="Nhập tin nhắn..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="pr-10"
                  />
                  <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1 h-8 w-8"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                <Button onClick={handleSendMessage} className="bg-gradient-primary hover:opacity-90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile placeholder */}
          <div className="flex-1 flex items-center justify-center md:hidden">
            <div className="text-center">
              <h3 className="text-lg font-medium">Chọn một cuộc trò chuyện</h3>
              <p className="text-muted-foreground">Chọn một cuộc trò chuyện để bắt đầu nhắn tin</p>
            </div>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};
