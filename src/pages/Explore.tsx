import { useState } from "react";
import { Play, Heart, MessageCircle, Share, MoreVertical, VolumeX, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mockVideos = [
  {
    id: 1,
    user: { name: "Sarah Johnson", handle: "@sarahfit", avatar: "/placeholder.svg" },
    description: "Morning HIIT workout 🔥 Who's joining me today? #MorningMotivation #HIIT",
    likes: 1234,
    comments: 89,
    shares: 45,
    hashtags: ["#MorningMotivation", "#HIIT", "#FitnessGoals"],
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    duration: "0:45"
  },
  {
    id: 2,
    user: { name: "Mike Chen", handle: "@mikelifts", avatar: "/placeholder.svg" },
    description: "Perfect form deadlift tutorial 💪 Save this for your next leg day!",
    likes: 2456,
    comments: 156,
    shares: 78,
    hashtags: ["#DeadliftForm", "#StrengthTraining", "#LegDay"],
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
    duration: "1:23"
  },
  {
    id: 3,
    user: { name: "Emma Wilson", handle: "@emmayoga", avatar: "/placeholder.svg" },
    description: "5-minute morning stretch routine 🧘‍♀️ Start your day right!",
    likes: 987,
    comments: 67,
    shares: 34,
    hashtags: ["#MorningYoga", "#Stretching", "#Mindfulness"],
    thumbnail: "https://images.unsplash.com/photo-1506629905607-61b21050e5e9?w=400",
    duration: "5:12"
  }
];

export const Explore = () => {
  const [currentVideo, setCurrentVideo] = useState(0);
  const [muted, setMuted] = useState(true);
  const [liked, setLiked] = useState<number[]>([]);

  const handleLike = (videoId: number) => {
    setLiked(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-first short video interface */}
      <div className="relative h-screen overflow-hidden">
        {mockVideos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 transition-transform duration-300 ${
              index === currentVideo ? 'translate-y-0' : 
              index < currentVideo ? '-translate-y-full' : 'translate-y-full'
            }`}
          >
            {/* Video Container */}
            <div className="relative h-full w-full bg-black">
              {/* Video Thumbnail/Placeholder */}
              <div 
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${video.thumbnail})` }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  size="icon"
                  className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
                >
                  <Play className="h-8 w-8 text-white fill-current" />
                </Button>
              </div>

              {/* Duration Badge */}
              <div className="absolute top-4 right-4">
                <Badge className="bg-black/50 text-white">
                  {video.duration}
                </Badge>
              </div>

              {/* Volume Control */}
              <div className="absolute top-4 left-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white"
                  onClick={() => setMuted(!muted)}
                >
                  {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              </div>

              {/* Right Side Actions */}
              <div className="absolute right-4 bottom-24 flex flex-col items-center space-y-6">
                {/* User Avatar */}
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white">
                    <AvatarImage src={video.user.avatar} alt={video.user.name} />
                    <AvatarFallback className="bg-primary text-white">
                      {video.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-6 w-6 rounded-full bg-primary text-white"
                  >
                    <span className="text-xs">+</span>
                  </Button>
                </div>

                {/* Like Button */}
                <div className="flex flex-col items-center space-y-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="text-white"
                    onClick={() => handleLike(video.id)}
                  >
                    <Heart 
                      className={`h-7 w-7 ${
                        liked.includes(video.id) ? 'fill-red-500 text-red-500' : ''
                      }`} 
                    />
                  </Button>
                  <span className="text-white text-xs font-medium">
                    {video.likes + (liked.includes(video.id) ? 1 : 0)}
                  </span>
                </div>

                {/* Comment Button */}
                <div className="flex flex-col items-center space-y-1">
                  <Button size="icon" variant="ghost" className="text-white">
                    <MessageCircle className="h-7 w-7" />
                  </Button>
                  <span className="text-white text-xs font-medium">{video.comments}</span>
                </div>

                {/* Share Button */}
                <div className="flex flex-col items-center space-y-1">
                  <Button size="icon" variant="ghost" className="text-white">
                    <Share className="h-7 w-7" />
                  </Button>
                  <span className="text-white text-xs font-medium">{video.shares}</span>
                </div>

                {/* More Options */}
                <Button size="icon" variant="ghost" className="text-white">
                  <MoreVertical className="h-6 w-6" />
                </Button>
              </div>

              {/* Bottom Content */}
              <div className="absolute bottom-4 left-4 right-20 text-white">
                {/* User Info */}
                <div className="flex items-center space-x-3 mb-3">
                  <span className="font-semibold">{video.user.name}</span>
                  <span className="text-white/70">{video.user.handle}</span>
                </div>

                {/* Description */}
                <p className="text-sm mb-2 leading-relaxed">
                  {video.description}
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1">
                  {video.hashtags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="text-xs text-blue-300">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2">
          {mockVideos.map((_, index) => (
            <button
              key={index}
              className={`w-1 h-8 rounded-full transition-all ${
                index === currentVideo ? 'bg-white' : 'bg-white/30'
              }`}
              onClick={() => setCurrentVideo(index)}
            />
          ))}
        </div>

        {/* Scroll Navigation */}
        <div className="absolute inset-0 flex flex-col">
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => setCurrentVideo(Math.max(0, currentVideo - 1))}
          />
          <div 
            className="flex-1 cursor-pointer"
            onClick={() => setCurrentVideo(Math.min(mockVideos.length - 1, currentVideo + 1))}
          />
        </div>
      </div>
    </div>
  );
};

export default Explore;