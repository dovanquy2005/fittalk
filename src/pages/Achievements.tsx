import { useState } from "react";
import { Trophy, Medal, Star, Target, Flame, Calendar, Users, TrendingUp, Award, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockAchievements = [
  {
    id: 1,
    title: "First Workout",
    description: "Complete your first workout",
    icon: "🏃",
    type: "milestone",
    category: "Workout",
    isUnlocked: true,
    unlockedDate: "2024-01-01",
    rarity: "common",
    points: 10
  },
  {
    id: 2,
    title: "Week Warrior",
    description: "Complete 7 workouts in a week",
    icon: "💪",
    type: "streak",
    category: "Consistency",
    isUnlocked: true,
    unlockedDate: "2024-01-08",
    rarity: "uncommon",
    points: 50
  },
  {
    id: 3,
    title: "Calorie Crusher",
    description: "Burn 500 calories in a single workout",
    icon: "🔥",
    type: "achievement",
    category: "Performance",
    isUnlocked: true,
    unlockedDate: "2024-01-15",
    rarity: "rare",
    points: 100
  },
  {
    id: 4,
    title: "30-Day Challenge",
    description: "Work out for 30 consecutive days",
    icon: "📅",
    type: "challenge",
    category: "Consistency",
    isUnlocked: false,
    progress: 18,
    target: 30,
    rarity: "epic",
    points: 500
  },
  {
    id: 5,
    title: "Social Butterfly",
    description: "Follow 10 fitness enthusiasts",
    icon: "👥",
    type: "social",
    category: "Community",
    isUnlocked: true,
    unlockedDate: "2024-01-20",
    rarity: "common",
    points: 25
  },
  {
    id: 6,
    title: "Early Bird",
    description: "Complete 5 morning workouts",
    icon: "🌅",
    type: "habit",
    category: "Lifestyle",
    isUnlocked: false,
    progress: 3,
    target: 5,
    rarity: "uncommon",
    points: 75
  },
  {
    id: 7,
    title: "Strength Master",
    description: "Increase your max lift by 50lbs",
    icon: "🏋️",
    type: "progress",
    category: "Strength",
    isUnlocked: false,
    progress: 35,
    target: 50,
    rarity: "rare",
    points: 200
  },
  {
    id: 8,
    title: "Marathon Mindset",
    description: "Run a total of 26.2 miles",
    icon: "🏃‍♂️",
    type: "cumulative",
    category: "Cardio",
    isUnlocked: false,
    progress: 18.5,
    target: 26.2,
    rarity: "epic",
    points: 300
  }
];

const mockStats = {
  totalAchievements: 8,
  unlockedAchievements: 4,
  totalPoints: 185,
  currentStreak: 18,
  longestStreak: 23,
  totalWorkouts: 45,
  totalCaloriesBurned: 15420,
  level: 8,
  nextLevelPoints: 315
};

const rarityColors = {
  common: "bg-gray-500",
  uncommon: "bg-green-500",
  rare: "bg-blue-500",
  epic: "bg-purple-500",
  legendary: "bg-yellow-500"
};

export const Achievements = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredAchievements = mockAchievements.filter(achievement => {
    if (activeTab === "all") return true;
    if (activeTab === "unlocked") return achievement.isUnlocked;
    if (activeTab === "progress") return !achievement.isUnlocked && achievement.progress !== undefined;
    return achievement.category.toLowerCase() === activeTab;
  });

  const getProgressPercentage = (achievement: any) => {
    if (achievement.isUnlocked) return 100;
    if (!achievement.progress || !achievement.target) return 0;
    return Math.min(100, (achievement.progress / achievement.target) * 100);
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common": return "🥉";
      case "uncommon": return "🥈";
      case "rare": return "🥇";
      case "epic": return "💎";
      case "legendary": return "👑";
      default: return "🏆";
    }
  };

  const levelProgress = (mockStats.totalPoints % 100) / 100 * 100;

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Achievements</h1>
          <p className="text-muted-foreground">
            Track your progress and celebrate your fitness milestones
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Level Card */}
          <Card className="bg-gradient-primary text-white border-0 shadow-glow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-white/20 rounded-full">
                    <Star className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">Level {mockStats.level}</p>
                    <p className="text-sm opacity-80">Fitness Enthusiast</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {mockStats.level + 1}</span>
                  <span>{mockStats.totalPoints % 100}/100 XP</span>
                </div>
                <Progress value={levelProgress} className="h-2 bg-white/20" />
              </div>
            </CardContent>
          </Card>

          {/* Achievements Count */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-success/10 rounded-full">
                  <Trophy className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockStats.unlockedAchievements}/{mockStats.totalAchievements}</p>
                  <p className="text-sm text-muted-foreground">Achievements</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Current Streak */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-warning/10 rounded-full">
                  <Flame className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockStats.currentStreak}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Total Points */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Award className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{mockStats.totalPoints}</p>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Highlights */}
        <Card className="mb-8 bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Your Progress</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{mockStats.totalWorkouts}</div>
                <p className="text-sm text-muted-foreground">Total Workouts</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{mockStats.totalCaloriesBurned.toLocaleString()}</div>
                <p className="text-sm text-muted-foreground">Calories Burned</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">{mockStats.longestStreak}</div>
                <p className="text-sm text-muted-foreground">Longest Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit lg:grid-cols-7">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="unlocked">Unlocked</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="workout">Workout</TabsTrigger>
            <TabsTrigger value="consistency">Consistency</TabsTrigger>
            <TabsTrigger value="community" className="hidden lg:flex">Community</TabsTrigger>
            <TabsTrigger value="performance" className="hidden lg:flex">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredAchievements.length === 0 && (
          <Card className="p-8 text-center">
            <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Achievements Found</h3>
            <p className="text-muted-foreground">
              Keep working out to unlock more achievements!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

interface AchievementCardProps {
  achievement: any;
}

const AchievementCard = ({ achievement }: AchievementCardProps) => {
  const progress = getProgressPercentage(achievement);
  
  function getProgressPercentage(achievement: any) {
    if (achievement.isUnlocked) return 100;
    if (!achievement.progress || !achievement.target) return 0;
    return Math.min(100, (achievement.progress / achievement.target) * 100);
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common": return "🥉";
      case "uncommon": return "🥈";
      case "rare": return "🥇";
      case "epic": return "💎";
      case "legendary": return "👑";
      default: return "🏆";
    }
  };

  return (
    <Card className={`hover:shadow-medium transition-all duration-200 bg-gradient-card border-0 ${
      achievement.isUnlocked ? "ring-2 ring-primary/20" : "opacity-75"
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={`text-4xl p-3 rounded-full ${
              achievement.isUnlocked ? "bg-primary/10" : "bg-muted/50"
            }`}>
              {achievement.icon}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg flex items-center space-x-2">
                <span className={achievement.isUnlocked ? "" : "text-muted-foreground"}>
                  {achievement.title}
                </span>
                {achievement.isUnlocked && (
                  <CheckCircle className="h-5 w-5 text-success" />
                )}
              </CardTitle>
              <div className="flex items-center space-x-2 mt-1">
                <Badge 
                  className={`${rarityColors[achievement.rarity as keyof typeof rarityColors]} text-white text-xs`}
                >
                  {getRarityIcon(achievement.rarity)} {achievement.rarity}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  {achievement.category}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <CardDescription className="text-sm">
          {achievement.description}
        </CardDescription>

        {/* Progress Bar */}
        {!achievement.isUnlocked && achievement.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">
                {achievement.progress}/{achievement.target}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="text-xs text-muted-foreground">
              {Math.round(progress)}% complete
            </div>
          </div>
        )}

        {/* Unlocked Date */}
        {achievement.isUnlocked && achievement.unlockedDate && (
          <div className="text-xs text-muted-foreground">
            Unlocked on {new Date(achievement.unlockedDate).toLocaleDateString()}
          </div>
        )}

        {/* Points */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-sm">
            <Star className="h-4 w-4 text-accent" />
            <span className="font-medium">{achievement.points} XP</span>
          </div>
          <div className="text-xs text-muted-foreground">
            {achievement.type}
          </div>
        </div>

        {/* Share Button for Unlocked Achievements */}
        {achievement.isUnlocked && (
          <Button variant="outline" size="sm" className="w-full">
            Share Achievement
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Achievements;