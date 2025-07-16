import { useState } from "react";
import { Search, Filter, Play, Clock, Zap, Users, Star, Bookmark, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockWorkouts = [
  {
    id: 1,
    title: "Full Body HIIT Blast",
    description: "High-intensity interval training targeting all major muscle groups for maximum calorie burn",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg",
    duration: 30,
    difficulty: "Intermediate",
    bodyPart: "Full Body",
    equipment: "None",
    calories: 350,
    rating: 4.8,
    reviews: 1234,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    isPremium: false,
    tags: ["HIIT", "No Equipment", "Fat Burn"],
    completions: 15678
  },
  {
    id: 2,
    title: "Upper Body Strength Builder",
    description: "Build lean muscle in your arms, chest, and back with this comprehensive strength workout",
    instructor: "Mike Chen",
    instructorAvatar: "/placeholder.svg",
    duration: 45,
    difficulty: "Advanced",
    bodyPart: "Upper Body",
    equipment: "Dumbbells",
    calories: 280,
    rating: 4.9,
    reviews: 856,
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
    isPremium: true,
    tags: ["Strength", "Muscle Building", "Dumbbells"],
    completions: 9234
  },
  {
    id: 3,
    title: "Morning Yoga Flow",
    description: "Gentle yoga sequence to wake up your body and mind with mindful movement",
    instructor: "Emma Wilson",
    instructorAvatar: "/placeholder.svg",
    duration: 20,
    difficulty: "Beginner",
    bodyPart: "Full Body",
    equipment: "Yoga Mat",
    calories: 120,
    rating: 4.7,
    reviews: 2341,
    thumbnail: "https://images.unsplash.com/photo-1506629905607-61b21050e5e9?w=400",
    isPremium: false,
    tags: ["Yoga", "Flexibility", "Morning"],
    completions: 18456
  },
  {
    id: 4,
    title: "Cardio Dance Party",
    description: "Fun and energetic dance workout that'll get your heart pumping and body moving",
    instructor: "Lisa Rodriguez",
    instructorAvatar: "/placeholder.svg",
    duration: 35,
    difficulty: "Intermediate",
    bodyPart: "Full Body",
    equipment: "None",
    calories: 420,
    rating: 4.6,
    reviews: 1567,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    isPremium: false,
    tags: ["Dance", "Cardio", "Fun"],
    completions: 12789
  },
  {
    id: 5,
    title: "Core Crusher Challenge",
    description: "Intense core workout to build a strong, stable midsection in just 15 minutes",
    instructor: "Alex Thompson",
    instructorAvatar: "/placeholder.svg",
    duration: 15,
    difficulty: "Advanced",
    bodyPart: "Core",
    equipment: "None",
    calories: 180,
    rating: 4.8,
    reviews: 934,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    isPremium: true,
    tags: ["Core", "Abs", "Quick"],
    completions: 7823
  },
  {
    id: 6,
    title: "Lower Body Power",
    description: "Strengthen and tone your legs and glutes with this challenging lower body workout",
    instructor: "Jamie Martinez",
    instructorAvatar: "/placeholder.svg",
    duration: 40,
    difficulty: "Intermediate",
    bodyPart: "Lower Body",
    equipment: "Resistance Bands",
    calories: 310,
    rating: 4.7,
    reviews: 1123,
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
    isPremium: false,
    tags: ["Lower Body", "Legs", "Glutes"],
    completions: 10456
  }
];

const bodyParts = ["All", "Full Body", "Upper Body", "Lower Body", "Core"];
const difficulties = ["All", "Beginner", "Intermediate", "Advanced"];
const durations = ["All", "Under 20 min", "20-40 min", "40+ min"];
const equipment = ["All", "None", "Dumbbells", "Resistance Bands", "Yoga Mat"];

export const Workout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bodyPartFilter, setBodyPartFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [durationFilter, setDurationFilter] = useState("All");
  const [equipmentFilter, setEquipmentFilter] = useState("All");
  const [savedWorkouts, setSavedWorkouts] = useState<number[]>([]);
  const [likedWorkouts, setLikedWorkouts] = useState<number[]>([]);

  const handleSaveWorkout = (workoutId: number) => {
    setSavedWorkouts(prev => 
      prev.includes(workoutId)
        ? prev.filter(id => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  const handleLikeWorkout = (workoutId: number) => {
    setLikedWorkouts(prev => 
      prev.includes(workoutId)
        ? prev.filter(id => id !== workoutId)
        : [...prev, workoutId]
    );
  };

  const filteredWorkouts = mockWorkouts.filter(workout => {
    const matchesSearch = workout.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesBodyPart = bodyPartFilter === "All" || workout.bodyPart === bodyPartFilter;
    const matchesDifficulty = difficultyFilter === "All" || workout.difficulty === difficultyFilter;
    const matchesEquipment = equipmentFilter === "All" || workout.equipment === equipmentFilter;
    
    const matchesDuration = durationFilter === "All" || 
      (durationFilter === "Under 20 min" && workout.duration < 20) ||
      (durationFilter === "20-40 min" && workout.duration >= 20 && workout.duration <= 40) ||
      (durationFilter === "40+ min" && workout.duration > 40);

    return matchesSearch && matchesBodyPart && matchesDifficulty && matchesDuration && matchesEquipment;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-white";
      case "Intermediate": return "bg-warning text-black";
      case "Advanced": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Workouts</h1>
          <p className="text-muted-foreground">
            Find the perfect workout for your fitness goals and schedule
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workouts, instructors, or exercises..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <Select value={bodyPartFilter} onValueChange={setBodyPartFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Body Part" />
              </SelectTrigger>
              <SelectContent>
                {bodyParts.map(part => (
                  <SelectItem key={part} value={part}>{part}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(diff => (
                  <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Duration" />
              </SelectTrigger>
              <SelectContent>
                {durations.map(duration => (
                  <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Equipment" />
              </SelectTrigger>
              <SelectContent>
                {equipment.map(eq => (
                  <SelectItem key={eq} value={eq}>{eq}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setBodyPartFilter("All");
                setDifficultyFilter("All");
                setDurationFilter("All");
                setEquipmentFilter("All");
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Showing {filteredWorkouts.length} of {mockWorkouts.length} workouts
          </p>
        </div>

        {/* Workouts Grid */}
        {filteredWorkouts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <WorkoutCard
                key={workout.id}
                workout={workout}
                isSaved={savedWorkouts.includes(workout.id)}
                isLiked={likedWorkouts.includes(workout.id)}
                onSave={() => handleSaveWorkout(workout.id)}
                onLike={() => handleLikeWorkout(workout.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Workouts Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or browse all workouts
            </p>
            <Button 
              onClick={() => {
                setBodyPartFilter("All");
                setDifficultyFilter("All");
                setDurationFilter("All");
                setEquipmentFilter("All");
                setSearchTerm("");
              }}
            >
              Show All Workouts
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

interface WorkoutCardProps {
  workout: any;
  isSaved: boolean;
  isLiked: boolean;
  onSave: () => void;
  onLike: () => void;
}

const WorkoutCard = ({ workout, isSaved, isLiked, onSave, onLike }: WorkoutCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-white";
      case "Intermediate": return "bg-warning text-black";
      case "Advanced": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  return (
    <Card className="hover:shadow-medium transition-all duration-200 bg-gradient-card border-0 overflow-hidden group">
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${workout.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
          
          {/* Premium Badge */}
          {workout.isPremium && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-accent text-black">
                ⭐ Premium
              </Badge>
            </div>
          )}

          {/* Duration Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/50 text-white">
              <Clock className="h-3 w-3 mr-1" />
              {workout.duration} min
            </Badge>
          </div>

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <Button size="icon" className="h-16 w-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
              <Play className="h-8 w-8 text-white fill-current" />
            </Button>
          </div>

          {/* Quick Actions */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-2">
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8"
                onClick={onLike}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button 
                size="icon" 
                variant="secondary" 
                className="h-8 w-8"
                onClick={onSave}
              >
                <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg line-clamp-2 mb-2">{workout.title}</CardTitle>
            <div className="flex items-center space-x-2 mb-2">
              <Badge className={getDifficultyColor(workout.difficulty)}>
                {workout.difficulty}
              </Badge>
              <Badge variant="secondary">{workout.bodyPart}</Badge>
            </div>
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {workout.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Instructor */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={workout.instructorAvatar} alt={workout.instructor} />
            <AvatarFallback className="bg-gradient-primary text-white text-xs">
              {workout.instructor.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{workout.instructor}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <Zap className="h-4 w-4" />
              <span>{workout.calories}</span>
            </div>
            <p className="text-xs text-muted-foreground">Calories</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{workout.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">{workout.reviews} reviews</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{(workout.completions / 1000).toFixed(1)}k</span>
            </div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
        </div>

        {/* Equipment */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Equipment: {workout.equipment}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {workout.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Start Button */}
        <Button className="w-full bg-gradient-primary text-white hover:opacity-90">
          Start Workout
        </Button>
      </CardContent>
    </Card>
  );
};

export default Workout;