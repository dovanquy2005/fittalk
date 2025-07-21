import { useState } from "react";
import { Search, Users, Plus, TrendingUp, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockCommunities = [
  {
    id: 1,
    name: "Chiến Binh Giảm Cân",
    description: "Một cộng đồng hỗ trợ cho những người đang trên hành trình giảm cân. Chia sẻ mẹo, ăn mừng chiến thắng và động viên lẫn nhau!",
    members: 12845,
    posts: 3421,
    category: "Giảm cân",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200",
    isJoined: false,
    trending: true,
    recentActivity: "2 giờ trước"
  },
  {
    id: 2,
    name: "Trung Tâm Tập Luyện Sức Mạnh",
    description: "Dành cho powerlifter, bodybuilder và bất kỳ ai muốn xây dựng sức mạnh. Kiểm tra form, thảo luận chương trình và các kỷ lục cá nhân (PR)!",
    members: 8932,
    posts: 2156,
    category: "Sức mạnh",
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200",
    isJoined: true,
    trending: false,
    recentActivity: "1 giờ trước"
  },
  {
    id: 3,
    name: "Yoga & Chánh Niệm",
    description: "Tìm kiếm sự tĩnh tại cùng các yogi. Chia sẻ tư thế, mẹo thiền và kiến thức về sức khỏe.",
    members: 15234,
    posts: 4567,
    category: "Yoga",
    image: "https://images.unsplash.com/photo-1506629905607-61b21050e5e9?w=200",
    isJoined: false,
    trending: true,
    recentActivity: "30 phút trước"
  },
  {
    id: 4,
    name: "Câu Lạc Bộ Chạy Bộ",
    description: "Xỏ giày và tham gia cùng những người chạy bộ! Kế hoạch luyện tập, báo cáo cuộc đua và động lực cho mọi cự ly.",
    members: 6789,
    posts: 1890,
    category: "Cardio",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=200",
    isJoined: true,
    trending: false,
    recentActivity: "4 giờ trước"
  },
  {
    id: 5,
    name: "Khoa Học Dinh Dưỡng",
    description: "Thảo luận về dinh dưỡng dựa trên bằng chứng. Vạch trần những lầm tưởng, chia sẻ nghiên cứu và tối ưu hóa chế độ ăn uống của bạn.",
    members: 4521,
    posts: 987,
    category: "Dinh dưỡng",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200",
    isJoined: false,
    trending: false,
    recentActivity: "6 giờ trước"
  },
  {
    id: 6,
    name: "Anh Hùng Tập Tại Nhà",
    description: "Không có phòng gym? Không vấn đề! Chia sẻ các bài tập tại nhà, đánh giá thiết bị và mẹo tiết kiệm không gian.",
    members: 9876,
    posts: 2345,
    category: "Tập tại nhà",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200",
    isJoined: false,
    trending: true,
    recentActivity: "1 giờ trước"
  }
];

export const Communities = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>(
    mockCommunities.filter(c => c.isJoined).map(c => c.id)
  );

  const handleJoinCommunity = (communityId: number) => {
    setJoinedCommunities(prev => 
      prev.includes(communityId)
        ? prev.filter(id => id !== communityId)
        : [...prev, communityId]
    );
  };

  const filteredCommunities = mockCommunities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const trendingCommunities = filteredCommunities.filter(c => c.trending);
  const joinedCommunitiesList = filteredCommunities.filter(c => joinedCommunities.includes(c.id));

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Cộng đồng</h1>
          <p className="text-muted-foreground">
            Kết nối với những người đam mê thể hình cùng chí hướng và cùng nhau phát triển
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm cộng đồng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Bộ lọc
          </Button>
          <Button className="bg-gradient-primary text-white">
            <Plus className="h-4 w-4 mr-2" />
            Tạo cộng đồng
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Tất cả cộng đồng</TabsTrigger>
            <TabsTrigger value="trending">Xu hướng</TabsTrigger>
            <TabsTrigger value="joined">Cộng đồng của tôi</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  isJoined={joinedCommunities.includes(community.id)}
                  onJoin={() => handleJoinCommunity(community.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="trending" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {trendingCommunities.map((community) => (
                <CommunityCard
                  key={community.id}
                  community={community}
                  isJoined={joinedCommunities.includes(community.id)}
                  onJoin={() => handleJoinCommunity(community.id)}
                />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="joined" className="mt-6">
            {joinedCommunitiesList.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {joinedCommunitiesList.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    isJoined={true}
                    onJoin={() => handleJoinCommunity(community.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Chưa có cộng đồng nào</h3>
                <p className="text-muted-foreground mb-4">
                  Tham gia một vài cộng đồng để kết nối với những người đam mê thể hình!
                </p>
                <Button>Khám phá cộng đồng</Button>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface CommunityCardProps {
  community: any;
  isJoined: boolean;
  onJoin: () => void;
}

const CommunityCard = ({ community, isJoined, onJoin }: CommunityCardProps) => {
  return (
    <Card className="hover:shadow-medium transition-all duration-200 bg-gradient-card border-0">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={community.image} alt={community.name} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {community.name.split(' ').map((word: string) => word[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {community.name}
                {community.trending && (
                  <Badge className="bg-energy text-black text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Xu hướng
                  </Badge>
                )}
              </CardTitle>
              <Badge variant="secondary" className="text-xs">
                {community.category}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <CardDescription className="text-sm leading-relaxed">
          {community.description}
        </CardDescription>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{community.members.toLocaleString()} thành viên</span>
            </div>
            <div>
              {community.posts.toLocaleString()} bài viết
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          Hoạt động gần nhất: {community.recentActivity}
        </div>

        <Button
          onClick={onJoin}
          className={`w-full ${
            isJoined 
              ? "bg-muted text-muted-foreground hover:bg-muted/80" 
              : "bg-gradient-primary text-white hover:opacity-90"
          }`}
        >
          {isJoined ? "Đã tham gia" : "Tham gia cộng đồng"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default Communities;