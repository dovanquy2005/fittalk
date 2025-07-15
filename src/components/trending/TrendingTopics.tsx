import { TrendingUp, Users, Hash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const trendingTopics = [
  { 
    tag: "30DayChallenge", 
    posts: "2.1k bài viết", 
    growth: "+15%",
    category: "Challenge"
  },
  { 
    tag: "PlantBasedFitness", 
    posts: "892 bài viết", 
    growth: "+23%",
    category: "Nutrition"
  },
  { 
    tag: "MorningWorkout", 
    posts: "1.5k bài viết", 
    growth: "+8%",
    category: "Routine"
  },
  { 
    tag: "FitnessMotivation", 
    posts: "3.2k bài viết", 
    growth: "+12%",
    category: "Motivation"
  },
  { 
    tag: "HomeGym", 
    posts: "967 bài viết", 
    growth: "+31%",
    category: "Equipment"
  }
];

const liveStats = [
  { label: "Người dùng đang hoạt động", value: "12.4k", trend: "+5%" },
  { label: "Bài viết hôm nay", value: "847", trend: "+12%" },
  { label: "Thành viên mới", value: "156", trend: "+8%" }
];

interface TrendingTopicsProps {
  className?: string;
}

export const TrendingTopics = ({ className }: TrendingTopicsProps) => {
  return (
    <aside className="hidden xl:flex w-80 flex-col p-6 space-y-6">
      {/* Live Stats */}
      <Card className="p-4 bg-gradient-card border-0 shadow-soft">
        <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider flex items-center">
          <TrendingUp className="mr-2 h-4 w-4" />
          Hoạt động trực tiếp
        </h3>
        <div className="space-y-3">
          {liveStats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">{stat.label}</span>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">{stat.value}</span>
                <Badge className="bg-success text-white text-xs">
                  {stat.trend}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Trending Topics */}
      <Card className="p-4 bg-gradient-card border-0 shadow-soft">
        <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider flex items-center">
          <Hash className="mr-2 h-4 w-4" />
          Xu hướng nổi bật
        </h3>
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div 
              key={topic.tag} 
              className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer group"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    #{index + 1}
                  </span>
                  <span className="font-medium text-sm group-hover:text-primary transition-colors">
                    #{topic.tag}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-muted-foreground">{topic.posts}</span>
                  <Badge className="bg-energy text-black text-xs">
                    {topic.growth}
                  </Badge>
                </div>
              </div>
              <Badge variant="outline" className="text-xs">
                {topic.category}
              </Badge>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full text-sm text-primary mt-3">
          Xem tất cả xu hướng
        </Button>
      </Card>

      {/* Quick Actions */}
      <Card className="p-4 bg-gradient-card border-0 shadow-soft">
        <h3 className="font-semibold text-sm text-muted-foreground mb-4 uppercase tracking-wider flex items-center">
          <Users className="mr-2 h-4 w-4" />
          Hành động nhanh
        </h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start text-sm">
            Tìm bạn tập luyện
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm">
            Tham gia thử thách
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm">
            Khám phá thực đơn
          </Button>
          <Button variant="outline" className="w-full justify-start text-sm">
            Theo dõi tiến trình
          </Button>
        </div>
      </Card>

      {/* Community Guidelines */}
      <div className="text-xs text-muted-foreground space-y-1">
        <p>Khi sử dụng FitTalk, bạn đồng ý với Nguyên tắc cộng đồng và Điều khoản dịch vụ của chúng tôi.</p>
        <div className="flex space-x-3">
          <a href="#" className="hover:text-primary transition-colors">Riêng tư</a>
          <a href="#" className="hover:text-primary transition-colors">Điều khoản</a>
          <a href="#" className="hover:text-primary transition-colors">Trợ giúp</a>
        </div>
      </div>
    </aside>
  );
};
