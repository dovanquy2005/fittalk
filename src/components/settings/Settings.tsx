import { useState } from "react";
import { User, Bell, Shield, Eye, Smartphone, Globe, HelpCircle, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/layout/Header";
// import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

export const Settings = () => {
  const [notifications, setNotifications] = useState({
    posts: true,
    comments: true,
    follows: true,
    workouts: false,
    goals: true,
    email: true,
    push: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    activityStatus: true,
    readReceipts: true,
    dataCollection: false
  });

  const [profile, setProfile] = useState({
    name: "John Doe",
    username: "@johndoe",
    bio: "Fitness enthusiast passionate about health and wellness",
    location: "New York, NY"
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        {/* <Sidebar /> */}
        <main className="flex-1 p-6 lg:p-8 max-w-4xl mx-auto">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Cài đặt & Riêng tư
              </h1>
              <p className="text-muted-foreground mt-2">
                Quản lý cài đặt tài khoản và tùy chọn riêng tư của bạn
              </p>
            </div>

            {/* Profile Settings */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="mr-2 h-5 w-5" />
                  Cài đặt hồ sơ
                </CardTitle>
                <CardDescription>
                  Cập nhật thông tin cá nhân và chi tiết hồ sơ của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Upload */}
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg" alt="Profile" />
                    <AvatarFallback className="bg-gradient-primary text-white text-lg">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm">
                      Thay đổi ảnh
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG hoặc GIF. Tối đa 2MB.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Họ và tên</Label>
                    <Input
                      id="name"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="username">Tên người dùng</Label>
                    <Input
                      id="username"
                      value={profile.username}
                      onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Tiểu sử</Label>
                  <Textarea
                    id="bio"
                    placeholder="Hãy cho chúng tôi biết về bạn..."
                    value={profile.bio}
                    onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Vị trí</Label>
                  <Input
                    id="location"
                    placeholder="Thành phố, Quốc gia"
                    value={profile.location}
                    onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="mr-2 h-5 w-5" />
                  Thông báo
                </CardTitle>
                <CardDescription>
                  Chọn những thông báo bạn muốn nhận
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="posts-notif">Bài viết mới</Label>
                      <p className="text-sm text-muted-foreground">Nhận thông báo khi người bạn theo dõi đăng bài</p>
                    </div>
                    <Switch
                      id="posts-notif"
                      checked={notifications.posts}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, posts: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="comments-notif">Bình luận & Trả lời</Label>
                      <p className="text-sm text-muted-foreground">Khi ai đó bình luận về bài viết của bạn</p>
                    </div>
                    <Switch
                      id="comments-notif"
                      checked={notifications.comments}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, comments: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="follows-notif">Người theo dõi mới</Label>
                      <p className="text-sm text-muted-foreground">Khi ai đó bắt đầu theo dõi bạn</p>
                    </div>
                    <Switch
                      id="follows-notif"
                      checked={notifications.follows}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, follows: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="workouts-notif">Nhắc nhở tập luyện</Label>
                      <p className="text-sm text-muted-foreground">Thông báo nhắc nhở tập luyện hàng ngày</p>
                    </div>
                    <Switch
                      id="workouts-notif"
                      checked={notifications.workouts}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, workouts: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="goals-notif">Tiến độ mục tiêu</Label>
                      <p className="text-sm text-muted-foreground">Cập nhật về mục tiêu thể chất của bạn</p>
                    </div>
                    <Switch
                      id="goals-notif"
                      checked={notifications.goals}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, goals: checked }))}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h4 className="font-medium">Phương thức nhận</h4>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notif">Thông báo qua Email</Label>
                      <p className="text-sm text-muted-foreground">Nhận thông báo qua email</p>
                    </div>
                    <Switch
                      id="email-notif"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, email: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="push-notif">Thông báo đẩy</Label>
                      <p className="text-sm text-muted-foreground">Nhận thông báo đẩy trên thiết bị của bạn</p>
                    </div>
                    <Switch
                      id="push-notif"
                      checked={notifications.push}
                      onCheckedChange={(checked) => setNotifications(prev => ({ ...prev, push: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Settings */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="mr-2 h-5 w-5" />
                  Riêng tư & Bảo mật
                </CardTitle>
                <CardDescription>
                  Kiểm soát ai có thể xem nội dung và hoạt động của bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-visibility">Hiển thị hồ sơ</Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) => setPrivacy(prev => ({ ...prev, profileVisibility: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Công khai - Bất kỳ ai cũng có thể xem hồ sơ của bạn</SelectItem>
                        <SelectItem value="friends">Chỉ bạn bè - Chỉ những người bạn theo dõi</SelectItem>
                        <SelectItem value="private">Riêng tư - Chỉ bạn mới có thể xem hồ sơ của bạn</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="activity-status">Trạng thái hoạt động</Label>
                      <p className="text-sm text-muted-foreground">Hiển thị khi bạn hoạt động trên FitTalk</p>
                    </div>
                    <Switch
                      id="activity-status"
                      checked={privacy.activityStatus}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, activityStatus: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="read-receipts">Thông báo đã xem</Label>
                      <p className="text-sm text-muted-foreground">Cho mọi người biết khi bạn đã đọc tin nhắn của họ</p>
                    </div>
                    <Switch
                      id="read-receipts"
                      checked={privacy.readReceipts}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, readReceipts: checked }))}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="data-collection">Thu thập dữ liệu</Label>
                      <p className="text-sm text-muted-foreground">Cho phép FitTalk thu thập dữ liệu sử dụng để cải thiện</p>
                    </div>
                    <Switch
                      id="data-collection"
                      checked={privacy.dataCollection}
                      onCheckedChange={(checked) => setPrivacy(prev => ({ ...prev, dataCollection: checked }))}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="mr-2 h-5 w-5" />
                  Tài khoản & Hỗ trợ
                </CardTitle>
                <CardDescription>
                  Quản lý tài khoản của bạn và nhận trợ giúp
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start">
                  <Smartphone className="mr-2 h-4 w-4" />
                  Thiết bị đã kết nối
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <Eye className="mr-2 h-4 w-4" />
                  Tải xuống dữ liệu của bạn
                </Button>
                
                <Button variant="outline" className="w-full justify-start">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Trợ giúp & Hỗ trợ
                </Button>

                <Separator />

                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <LogOut className="mr-2 h-4 w-4" />
                    Đăng xuất
                  </Button>
                  
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    Xóa tài khoản
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Save Changes */}
            <div className="flex justify-end space-x-4 pt-6">
              <Button variant="outline">Hủy</Button>
              <Button className="bg-gradient-primary hover:opacity-90">
                Lưu thay đổi
              </Button>
            </div>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};
