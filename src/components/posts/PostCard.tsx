import { useState } from "react";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  Bookmark,
  MoreHorizontal,
  Play,
  TrendingUp,
  Target,
  Trophy
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface PostCardProps {
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  content: string;
  image?: string;
  video?: boolean;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  category: "workout" | "nutrition" | "motivation" | "progress";
  tags?: string[];
}

const categoryColors = {
  workout: "bg-primary text-white",
  nutrition: "bg-secondary text-white", 
  motivation: "bg-energy text-black",
  progress: "bg-info text-white"
};

const categoryIcons = {
  workout: Target,
  nutrition: Heart,
  motivation: TrendingUp,
  progress: Trophy
};

export const PostCard = ({ 
  author, 
  content, 
  image, 
  video,
  timestamp, 
  likes, 
  comments, 
  shares,
  category,
  tags = []
}: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setCurrentLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const CategoryIcon = categoryIcons[category];

  return (
    <Card className="p-4 md:p-6 space-y-4 bg-gradient-card border-0 shadow-soft hover:shadow-medium hover:scale-[1.02] transition-all duration-300 animate-fade-in group">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10 md:h-12 md:w-12 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback className="bg-gradient-primary text-white text-sm font-semibold">
              {author.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2 flex-wrap">
              <h3 className="font-semibold text-sm md:text-base truncate">{author.name}</h3>
              {author.verified && (
                <Badge className="h-4 w-4 p-0 bg-primary flex items-center justify-center">
                  <span className="text-white text-xs">✓</span>
                </Badge>
              )}
              <Badge className={`text-xs hidden sm:flex ${categoryColors[category]}`}>
                <CategoryIcon className="h-3 w-3 mr-1" />
                {category}
              </Badge>
            </div>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
              <span className="truncate">{author.handle}</span>
              <span>•</span>
              <span>{timestamp}</span>
              <Badge className={`text-xs sm:hidden ${categoryColors[category]}`}>
                <CategoryIcon className="h-3 w-3 mr-1" />
                {category}
              </Badge>
            </div>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Follow {author.name}</DropdownMenuItem>
            <DropdownMenuItem>Report post</DropdownMenuItem>
            <DropdownMenuItem>Hide post</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Content */}
      <div className="space-y-3">
        <p className="text-sm md:text-base leading-relaxed break-words">{content}</p>
        
        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-muted/50">
                #{tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Media */}
        {image && (
          <div className="relative rounded-lg overflow-hidden bg-muted">
            <img 
              src={image} 
              alt="Post content" 
              className="w-full h-auto object-cover"
            />
            {video && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <Button size="lg" className="rounded-full bg-white/90 text-black hover:bg-white">
                  <Play className="h-6 w-6 ml-1" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-border/50">
        <div className="flex items-center space-x-4 md:space-x-6">
          <Button
            variant="ghost"
            size="sm"
            className={`space-x-1 md:space-x-2 p-2 min-w-0 ${isLiked ? 'text-red-500 hover:text-red-600' : 'hover:text-red-500'} transition-colors`}
            onClick={handleLike}
          >
            <Heart className={`h-4 w-4 md:h-5 md:w-5 ${isLiked ? 'fill-current' : ''}`} />
            <span className="text-sm font-medium">{currentLikes}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="space-x-1 md:space-x-2 p-2 min-w-0 hover:text-primary transition-colors">
            <MessageCircle className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm font-medium">{comments}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="space-x-1 md:space-x-2 p-2 min-w-0 hover:text-primary transition-colors">
            <Share className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-sm font-medium hidden sm:inline">{shares}</span>
          </Button>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className={`h-9 w-9 md:h-10 md:w-10 ${isSaved ? 'text-yellow-500 hover:text-yellow-600' : 'hover:text-yellow-500'} transition-colors`}
          onClick={() => setIsSaved(!isSaved)}
        >
          <Bookmark className={`h-4 w-4 md:h-5 md:w-5 ${isSaved ? 'fill-current' : ''}`} />
        </Button>
      </div>
    </Card>
  );
};