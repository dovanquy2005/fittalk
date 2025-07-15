import { useState } from "react";
import {
  Image,
  Video,
  Calendar,
  Target,
  Heart,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  { value: "workout", label: "Workout", icon: Target, color: "bg-primary text-white" },
  { value: "nutrition", label: "Nutrition", icon: Heart, color: "bg-secondary text-white" },
  { value: "motivation", label: "Motivation", icon: TrendingUp, color: "bg-energy text-black" },
  { value: "progress", label: "Progress", icon: Trophy, color: "bg-info text-white" },
];

export const CreatePost = () => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handlePost = () => {
    if (content.trim() && category) {
      console.log("Creating post:", { content, category });
      setContent("");
      setCategory("");
    }
  };

  return (
    <Card className="p-6 space-y-4 bg-gradient-card border-0 shadow-soft animate-fade-in">
      <div className="flex items-start space-x-4">
        {/* Avatar */}
        <Avatar className="h-12 w-12 flex-shrink-0">
          <AvatarImage src="/images/profile-3.jpg" alt="Your avatar" />
          <AvatarFallback className="bg-gradient-primary text-white">
            You
          </AvatarFallback>
        </Avatar>

        {/* Post Content */}
        <div className="flex-1 space-y-4">
          <Textarea
            placeholder="Chia sẻ hành trình tập thể dục, mẹo hoặc đặt câu hỏi của bạn..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-none bg-muted/30 focus:bg-background transition-colors"
          />

          {/* Action Buttons */}
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center flex-wrap gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Image className="h-4 w-4 mr-2" />
                Photo
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Video className="h-4 w-4 mr-2" />
                Video
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule
              </Button>

              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-40 h-8 border-none bg-muted/50">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex items-center space-x-2">
                          <Icon className="h-4 w-4" />
                          <span>{cat.label}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <Button
              onClick={handlePost}
              disabled={!content.trim() || !category}
              className="bg-gradient-to-r from-green-200 to-orange-500 text-white font-semibold py-2 px-4 rounded shadow-lg transition-all duration-300 ease-in-out disabled:opacity-50">
              Đăng
            </Button>
          </div>

          {/* Selected Category Info */}
          {category && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Posting to:</span>
              {categories.find((c) => c.value === category) && (
                <Badge className={categories.find((c) => c.value === category)?.color}>
                  {(() => {
                    const cat = categories.find((c) => c.value === category);
                    const Icon = cat?.icon;
                    return (
                      <>
                        {Icon && <Icon className="h-3 w-3 mr-1" />}
                        {cat?.label}
                      </>
                    );
                  })()}
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
