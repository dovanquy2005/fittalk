import { useState } from "react";
import { Users, TrendingUp, Star, UserPlus, Bookmark, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

const suggestedUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    handle: "@sarahfit",
    avatar: "/placeholder.svg",
    bio: "Personal trainer & nutrition coach. Helping people transform their lives through fitness 💪",
    followers: 15420,
    following: 892,
    posts: 1247,
    verified: true,
    interests: ["Strength Training", "Nutrition", "HIIT"],
    mutualFollowers: 12
  },
  {
    id: 2,
    name: "Mike Chen",
    handle: "@mikelifts",
    avatar: "/placeholder.svg",
    bio: "Powerlifter | Form > Weight | Sharing my strength journey",
    followers: 8930,
    following: 445,
    posts: 756,
    verified: false,
    interests: ["Powerlifting", "Form", "Strength"],
    mutualFollowers: 8
  },
  {
    id: 3,
    name: "Emma Wilson",
    handle: "@emmayoga",
    avatar: "/placeholder.svg",
    bio: "Yoga instructor 🧘‍♀️ Finding balance in mind, body & soul",
    followers: 12340,
    following: 567,
    posts: 892,
    verified: true,
    interests: ["Yoga", "Mindfulness", "Flexibility"],
    mutualFollowers: 15
  },
  {
    id: 4,
    name: "Alex Rodriguez",
    handle: "@alexruns",
    avatar: "/placeholder.svg",
    bio: "Marathon runner | Boston qualifier | Running tips & motivation",
    followers: 6780,
    following: 234,
    posts: 445,
    verified: false,
    interests: ["Running", "Marathon", "Endurance"],
    mutualFollowers: 5
  }
];

const suggestedPosts = [
  {
    id: 1,
    author: {
      name: "Fitness Coach Mike",
      handle: "@coachmike",
      avatar: "/placeholder.svg"
    },
    content: "The 5 biggest mistakes I see in the gym and how to fix them 🏋️‍♂️",
    likes: 1240,
    comments: 89,
    shares: 156,
    time: "2 hours ago",
    tags: ["#GymTips", "#FormCheck", "#FitnessEducation"]
  },
  {
    id: 2,
    author: {
      name: "Nutrition Expert",
      handle: "@nutritionpro",
      avatar: "/placeholder.svg"
    },
    content: "Post-workout nutrition: What to eat and when for optimal recovery 🥗",
    likes: 987,
    comments: 67,
    shares: 123,
    time: "4 hours ago",
    tags: ["#Nutrition", "#Recovery", "#PostWorkout"]
  },
  {
    id: 3,
    author: {
      name: "Yoga Master",
      handle: "@yogamaster",
      avatar: "/placeholder.svg"
    },
    content: "5-minute morning flow to energize your day ☀️ Try this sequence!",
    likes: 2340,
    comments: 145,
    shares: 298,
    time: "6 hours ago",
    tags: ["#Yoga", "#MorningFlow", "#Mindfulness"]
  }
];

const suggestedCommunities = [
  {
    id: 1,
    name: "HIIT Warriors",
    description: "High-intensity training enthusiasts sharing workouts and motivation",
    members: 12450,
    posts: 3420,
    category: "Cardio",
    isPrivate: false
  },
  {
    id: 2,
    name: "Plant-Based Athletes",
    description: "Nutrition and fitness for plant-based lifestyles",
    members: 8930,
    posts: 2156,
    category: "Nutrition",
    isPrivate: false
  },
  {
    id: 3,
    name: "Beginner's Fitness",
    description: "A supportive community for those starting their fitness journey",
    members: 18670,
    posts: 5432,
    category: "General",
    isPrivate: false
  }
];

export const Suggested = () => {
  const [followedUsers, setFollowedUsers] = useState<number[]>([]);
  const [joinedCommunities, setJoinedCommunities] = useState<number[]>([]);
  const [likedPosts, setLikedPosts] = useState<number[]>([]);

  const handleFollow = (userId: number) => {
    setFollowedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleJoinCommunity = (communityId: number) => {
    setJoinedCommunities(prev => 
      prev.includes(communityId) 
        ? prev.filter(id => id !== communityId)
        : [...prev, communityId]
    );
  };

  const handleLikePost = (postId: number) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Suggested for You
              </h1>
              <p className="text-muted-foreground mt-2">
                Discover new people, content, and communities based on your interests
              </p>
            </div>

            <Tabs defaultValue="people" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="people">People</TabsTrigger>
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="communities">Communities</TabsTrigger>
              </TabsList>

              <TabsContent value="people" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {suggestedUsers.map((user) => (
                    <Card key={user.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-elevated transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback className="bg-gradient-primary text-white text-lg">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2 mb-1">
                              <h3 className="font-semibold truncate">{user.name}</h3>
                              {user.verified && (
                                <Badge className="h-4 w-4 p-0 bg-primary flex items-center justify-center">
                                  ✓
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{user.handle}</p>
                            <p className="text-sm leading-relaxed mb-3 line-clamp-2">{user.bio}</p>
                            
                            <div className="flex items-center space-x-4 text-xs text-muted-foreground mb-3">
                              <span><strong>{user.followers.toLocaleString()}</strong> followers</span>
                              <span><strong>{user.posts}</strong> posts</span>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-4">
                              {user.interests.slice(0, 3).map((interest) => (
                                <Badge key={interest} variant="secondary" className="text-xs">
                                  {interest}
                                </Badge>
                              ))}
                            </div>

                            {user.mutualFollowers > 0 && (
                              <p className="text-xs text-muted-foreground mb-3">
                                Followed by {user.mutualFollowers} people you follow
                              </p>
                            )}

                            <Button
                              onClick={() => handleFollow(user.id)}
                              className={`w-full ${
                                followedUsers.includes(user.id)
                                  ? 'bg-muted text-foreground hover:bg-muted/80'
                                  : 'bg-gradient-primary hover:opacity-90'
                              }`}
                            >
                              <UserPlus className="mr-2 h-4 w-4" />
                              {followedUsers.includes(user.id) ? 'Following' : 'Follow'}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="posts" className="space-y-6">
                <div className="space-y-4">
                  {suggestedPosts.map((post) => (
                    <Card key={post.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-elevated transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={post.author.avatar} alt={post.author.name} />
                            <AvatarFallback className="bg-gradient-primary text-white">
                              {post.author.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-medium">{post.author.name}</h4>
                              <span className="text-sm text-muted-foreground">{post.author.handle}</span>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-muted-foreground">{post.time}</span>
                            </div>
                            
                            <p className="text-sm leading-relaxed mb-3">{post.content}</p>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {post.tags.map((tag) => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center space-x-6">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleLikePost(post.id)}
                                className={`${likedPosts.includes(post.id) ? 'text-red-500' : ''}`}
                              >
                                <Heart className={`mr-1 h-4 w-4 ${likedPosts.includes(post.id) ? 'fill-current' : ''}`} />
                                {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                              </Button>
                              
                              <Button variant="ghost" size="sm">
                                <MessageCircle className="mr-1 h-4 w-4" />
                                {post.comments}
                              </Button>
                              
                              <Button variant="ghost" size="sm">
                                <Bookmark className="mr-1 h-4 w-4" />
                                Save
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="communities" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestedCommunities.map((community) => (
                    <Card key={community.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-elevated transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="truncate">{community.name}</span>
                          <Badge variant="secondary">{community.category}</Badge>
                        </CardTitle>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {community.description}
                        </p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Users className="mr-1 h-4 w-4" />
                            <span>{community.members.toLocaleString()} members</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="mr-1 h-4 w-4" />
                            <span>{community.posts} posts</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleJoinCommunity(community.id)}
                          className={`w-full ${
                            joinedCommunities.includes(community.id)
                              ? 'bg-muted text-foreground hover:bg-muted/80'
                              : 'bg-gradient-primary hover:opacity-90'
                          }`}
                        >
                          {joinedCommunities.includes(community.id) ? 'Joined' : 'Join Community'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};
