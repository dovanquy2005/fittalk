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
    title: "HIIT Toàn Thân Đốt Mỡ",
    description: "Bài tập cường độ cao ngắt quãng (HIIT) tác động vào tất cả các nhóm cơ chính để đốt cháy calo tối đa",
    instructor: "Sarah Johnson",
    instructorAvatar: "/placeholder.svg",
    duration: 30,
    difficulty: "Trung cấp",
    bodyPart: "Toàn thân",
    equipment: "Không dụng cụ",
    calories: 350,
    rating: 4.8,
    reviews: 1234,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    isPremium: false,
    tags: ["HIIT", "Không dụng cụ", "Đốt mỡ"],
    completions: 15678
  },
  {
    id: 2,
    title: "Xây Dựng Sức Mạnh Thân Trên",
    description: "Xây dựng cơ bắp săn chắc ở tay, ngực và lưng với bài tập sức mạnh toàn diện này",
    instructor: "Mike Chen",
    instructorAvatar: "/placeholder.svg",
    duration: 45,
    difficulty: "Nâng cao",
    bodyPart: "Thân trên",
    equipment: "Tạ đơn",
    calories: 280,
    rating: 4.9,
    reviews: 856,
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
    isPremium: true,
    tags: ["Sức mạnh", "Xây dựng cơ bắp", "Tạ đơn"],
    completions: 9234
  },
  {
    id: 3,
    title: "Yoga Chào Buổi Sáng",
    description: "Chuỗi động tác yoga nhẹ nhàng để đánh thức cơ thể và tâm trí của bạn bằng chuyển động chánh niệm",
    instructor: "Emma Wilson",
    instructorAvatar: "/placeholder.svg",
    duration: 20,
    difficulty: "Cơ bản",
    bodyPart: "Toàn thân",
    equipment: "Thảm Yoga",
    calories: 120,
    rating: 4.7,
    reviews: 2341,
    thumbnail: "https://images.unsplash.com/photo-1506629905607-61b21050e5e9?w=400",
    isPremium: false,
    tags: ["Yoga", "Linh hoạt", "Buổi sáng"],
    completions: 18456
  },
  {
    id: 4,
    title: "Tiệc Nhảy Cardio",
    description: "Bài tập nhảy vui nhộn và tràn đầy năng lượng sẽ khiến tim bạn đập nhanh và cơ thể chuyển động",
    instructor: "Lisa Rodriguez",
    instructorAvatar: "/placeholder.svg",
    duration: 35,
    difficulty: "Trung cấp",
    bodyPart: "Toàn thân",
    equipment: "Không dụng cụ",
    calories: 420,
    rating: 4.6,
    reviews: 1567,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    isPremium: false,
    tags: ["Nhảy", "Cardio", "Vui nhộn"],
    completions: 12789
  },
  {
    id: 5,
    title: "Thử Thách Cơ Bụng",
    description: "Bài tập cơ bụng cường độ cao để xây dựng một vùng trung tâm khỏe mạnh, ổn định chỉ trong 15 phút",
    instructor: "Alex Thompson",
    instructorAvatar: "/placeholder.svg",
    duration: 15,
    difficulty: "Nâng cao",
    bodyPart: "Core",
    equipment: "Không dụng cụ",
    calories: 180,
    rating: 4.8,
    reviews: 934,
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400",
    isPremium: true,
    tags: ["Core", "Bụng", "Nhanh"],
    completions: 7823
  },
  {
    id: 6,
    title: "Sức Mạnh Thân Dưới",
    description: "Tăng cường và làm săn chắc chân và mông của bạn với bài tập thân dưới đầy thử thách này",
    instructor: "Jamie Martinez",
    instructorAvatar: "/placeholder.svg",
    duration: 40,
    difficulty: "Trung cấp",
    bodyPart: "Thân dưới",
    equipment: "Dây kháng lực",
    calories: 310,
    rating: 4.7,
    reviews: 1123,
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400",
    isPremium: false,
    tags: ["Thân dưới", "Chân", "Mông"],
    completions: 10456
  }
];

const bodyParts = ["Tất cả", "Toàn thân", "Thân trên", "Thân dưới", "Core"];
const difficulties = ["Tất cả", "Cơ bản", "Trung cấp", "Nâng cao"];
const durations = ["Tất cả", "Dưới 20 phút", "20-40 phút", "Trên 40 phút"];
const equipment = ["Tất cả", "Không dụng cụ", "Tạ đơn", "Dây kháng lực", "Thảm Yoga"];

export const Workout = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [bodyPartFilter, setBodyPartFilter] = useState("Tất cả");
  const [difficultyFilter, setDifficultyFilter] = useState("Tất cả");
  const [durationFilter, setDurationFilter] = useState("Tất cả");
  const [equipmentFilter, setEquipmentFilter] = useState("Tất cả");
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
    
    const matchesBodyPart = bodyPartFilter === "Tất cả" || workout.bodyPart === bodyPartFilter;
    const matchesDifficulty = difficultyFilter === "Tất cả" || workout.difficulty === difficultyFilter;
    const matchesEquipment = equipmentFilter === "Tất cả" || workout.equipment === equipmentFilter;
    
    const matchesDuration = durationFilter === "Tất cả" || 
      (durationFilter === "Under 20 min" && workout.duration < 20) ||
      (durationFilter === "20-40 min" && workout.duration >= 20 && workout.duration <= 40) ||
      (durationFilter === "40+ min" && workout.duration > 40);

    return matchesSearch && matchesBodyPart && matchesDifficulty && matchesDuration && matchesEquipment;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Cơ bản": return "bg-success text-white";
      case "Trung cấp": return "bg-warning text-black";
      case "Nâng cao": return "bg-destructive text-white";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Bài tập</h1>
          <p className="text-muted-foreground">
            Tìm bài tập hoàn hảo cho mục tiêu và lịch trình của bạn
          </p>
        </div>

        {/* Search and Filters */}
        <div className="space-y-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Tìm bài tập, huấn luyện viên, hoặc động tác..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
            <Select value={bodyPartFilter} onValueChange={setBodyPartFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Nhóm cơ" />
              </SelectTrigger>
              <SelectContent>
                {bodyParts.map(part => (
                  <SelectItem key={part} value={part}>{part}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Độ khó" />
              </SelectTrigger>
              <SelectContent>
                {difficulties.map(diff => (
                  <SelectItem key={diff} value={diff}>{diff}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={durationFilter} onValueChange={setDurationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Thời lượng" />
              </SelectTrigger>
              <SelectContent>
                {durations.map(duration => (
                  <SelectItem key={duration} value={duration}>{duration}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={equipmentFilter} onValueChange={setEquipmentFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Dụng cụ" />
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
                setBodyPartFilter("Tất cả");
                setDifficultyFilter("Tất cả");
                setDurationFilter("Tất cả");
                setEquipmentFilter("Tất cả");
                setSearchTerm("");
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">
            Hiển thị {filteredWorkouts.length} trên {mockWorkouts.length} bài tập
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
            <h3 className="text-lg font-semibold mb-2">Không tìm thấy bài tập</h3>
            <p className="text-muted-foreground mb-4">
              Hãy thử điều chỉnh tiêu chí tìm kiếm hoặc duyệt tất cả các bài tập
            </p>
            <Button 
              onClick={() => {
                setBodyPartFilter("Tất cả");
                setDifficultyFilter("Tất cả");
                setDurationFilter("Tất cả");
                setEquipmentFilter("Tất cả");
                setSearchTerm("");
              }}
            >
              Hiển thị tất cả bài tập
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
      case "Cơ bản": return "bg-success text-white";
      case "Trung cấp": return "bg-warning text-black";
      case "Nâng cao": return "bg-destructive text-white";
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
              <Badge className="bg-accent text-black font-semibold">
                ⭐ Cao cấp
              </Badge>
            </div>
          )}

          {/* Duration Badge */}
          <div className="absolute top-3 right-3">
            <Badge className="bg-black/50 text-white">
              <Clock className="h-3 w-3 mr-1" />
              {workout.duration} phút
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
            <p className="text-xs text-muted-foreground">Calo</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span>{workout.rating}</span>
            </div>
            <p className="text-xs text-muted-foreground">{workout.reviews} đánh giá</p>
          </div>
          <div>
            <div className="flex items-center justify-center space-x-1 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{(workout.completions / 1000).toFixed(1)}k</span>
            </div>
            <p className="text-xs text-muted-foreground">Hoàn thành</p>
          </div>
        </div>

        {/* Equipment */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">Dụng cụ: {workout.equipment}</p>
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
          Bắt đầu tập
        </Button>
      </CardContent>
    </Card>
  );
};

export default Workout;