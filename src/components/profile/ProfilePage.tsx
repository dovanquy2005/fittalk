import { useState } from "react";
import { 
  MapPin, 
  Calendar, 
  Users, 
  TrendingUp, 
  Target, 
  Trophy,
  Settings,
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PostCard } from "@/components/posts/PostCard";

const userProfile = {
  name: "Sarah Johnson",
  handle: "@sarahfit",
  bio: "🏋️‍♀️ Người đam mê thể hình | 💪 Huấn luyện viên cá nhân | 🥗 Người ủng hộ dinh dưỡng | Giúp đỡ người khác đạt được mục tiêu thể chất của họ.",
  avatar: "/images/profile-3.jpg",
  coverImage: "/images/profile-3.jpg",
  verified: true,
  location: "Los Angeles, CA",
  joinDate: "Tháng 3 2023",
  followers: 12500,
  following: 342,
  posts: 156,
  goals: [
    { icon: Target, label: "Giảm cân", progress: 85 },
    { icon: TrendingUp, label: "Xây dựng sức mạnh", progress: 70 },
    { icon: Trophy, label: "Luyện tập Marathon", progress: 45 }
  ],
  achievements: [
    { title: "Chuỗi 30 ngày", icon: "🔥", description: "Tập luyện 30 ngày liên tiếp" },
    { title: "Vô địch giảm cân", icon: "🎯", description: "Giảm 20lbs trong 3 tháng" },
    { title: "Người giúp đỡ cộng đồng", icon: "❤️", description: "Đã giúp hơn 100 thành viên" }
  ]
};

const userPosts = [
  {
    author: {
      name: "Sarah Johnson",
      handle: "@sarahfit",
      avatar: "/images/profile-3.jpg",
      verified: true
    },
    content: "Vừa hoàn thành một buổi tập HIIT 45 phút tuyệt vời! 🔥 Cảm giác hưng phấn thật khó tin. Hãy nhớ rằng, sự nhất quán đánh bại sự hoàn hảo.",
    timestamp: "2 giờ trước",
    likes: 124,
    comments: 18,
    shares: 7,
    category: "workout" as const,
    tags: ["HIIT", "cardio", "động lực"]
  },
  {
    author: {
      name: "Sarah Johnson",
      handle: "@sarahfit",
      avatar: "/images/profile-3.jpg",
      verified: true
    },
    content: "Chia sẻ công thức sinh tố sau tập yêu thích của tôi! 🥤 Chuối, bột protein, rau bina và sữa hạnh nhân. Đơn giản nhưng hiệu quả!",
    image: "/images/feed-4.jpg",
    timestamp: "1 ngày trước",
    likes: 89,
    comments: 23,
    shares: 15,
    category: "nutrition" as const,
    tags: ["sinh tố", "protein", "phục hồi"]
  }
];

export const ProfilePage = () => {
  const [isFollowing, setIsFollowing] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 pb-20 md:pb-6">
      {/* Cover Image */}
      <div className="relative h-48 md:h-64 rounded-xl overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-4 right-4">
          <Button variant="ghost" size="icon" className="bg-white/20 backdrop-blur-sm hover:bg-white/30">
            <Settings className="h-4 w-4 text-white" />
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="relative -mt-16 md:-mt-20">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row md:items-end space-y-4 md:space-y-0 md:space-x-4">
            <Avatar className="h-24 w-24 md:h-32 md:w-32 border-4 border-background shadow-strong">
              <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              <AvatarFallback className="bg-gradient-primary text-white text-2xl font-bold">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <h1 className="text-2xl md:text-3xl font-bold">{userProfile.name}</h1>
                {userProfile.verified && (
                  <Badge className="h-5 w-5 p-0 bg-primary flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground">{userProfile.handle}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{userProfile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>Đã tham gia {userProfile.joinDate}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              onClick={() => setIsFollowing(!isFollowing)}
              className={`px-6 ${isFollowing ? 'variant-outline' : 'bg-gradient-primary hover:opacity-90'}`}
            >
              {isFollowing ? 'Đang theo dõi' : 'Theo dõi'}
            </Button>
            <Button variant="outline" size="icon">
              <MessageCircle className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Bio */}
        <div className="mt-4">
          <p className="text-sm md:text-base leading-relaxed">{userProfile.bio}</p>
        </div>

        {/* Stats */}
        <div className="flex items-center space-x-6 mt-4">
          <div className="text-center">
            <div className="font-bold text-lg">{userProfile.posts}</div>
            <div className="text-sm text-muted-foreground">Bài viết</div>
          </div>
          <div className="text-center cursor-pointer hover:text-primary transition-colors">
            <div className="font-bold text-lg">{userProfile.followers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Người theo dõi</div>
          </div>
          <div className="text-center cursor-pointer hover:text-primary transition-colors">
            <div className="font-bold text-lg">{userProfile.following}</div>
            <div className="text-sm text-muted-foreground">Đang theo dõi</div>
          </div>
        </div>
      </div>

      {/* Goals & Achievements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fitness Goals */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>Mục tiêu hiện tại</span>
          </h3>
          <div className="space-y-3">
            {userProfile.goals.map((goal, index) => {
              const Icon = goal.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className="h-4 w-4 text-primary" />
                      <span className="font-medium">{goal.label}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{goal.progress}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-primary rounded-full transition-all"
                      style={{ width: `${goal.progress}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 space-y-4">
          <h3 className="text-lg font-semibold flex items-center space-x-2">
            <Trophy className="h-5 w-5 text-energy" />
            <span>Thành tích gần đây</span>
          </h3>
          <div className="space-y-3">
            {userProfile.achievements.map((achievement, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                <span className="text-2xl">{achievement.icon}</span>
                <div>
                  <div className="font-medium">{achievement.title}</div>
                  <div className="text-sm text-muted-foreground">{achievement.description}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Bài viết</TabsTrigger>
          <TabsTrigger value="media">Phương tiện</TabsTrigger>
          <TabsTrigger value="likes">Lượt thích</TabsTrigger>
        </TabsList>
        
        <TabsContent value="posts" className="space-y-6 mt-6">
          {userPosts.map((post, index) => (
            <PostCard key={index} {...post} />
          ))}
        </TabsContent>
        
        <TabsContent value="media" className="mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="likes" className="mt-6">
          <div className="text-center py-12 text-muted-foreground">
            <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Các bài viết đã thích sẽ xuất hiện ở đây</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
