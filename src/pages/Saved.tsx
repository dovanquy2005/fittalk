import { useState } from "react";
import { Bookmark, Search, Filter, Play, Clock, Star, Download, Share, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockSavedItems = [
  {
    id: 1,
    type: "workout",
    title: "Full Body HIIT Blast",
    description: "30-minute high-intensity workout to burn calories and build strength",
    author: "Sarah Johnson",
    authorHandle: "@sarahfit",
    authorAvatar: "/placeholder.svg",
    duration: "30 min",
    difficulty: "Intermediate",
    savedDate: "2024-01-15",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300",
    tags: ["HIIT", "Full Body", "Cardio"],
    rating: 4.8
  },
  {
    id: 2,
    type: "nutrition",
    title: "High Protein Breakfast Bowl",
    description: "Delicious and nutritious breakfast recipe with 35g protein",
    author: "Mike Chen",
    authorHandle: "@mikenutrition",
    authorAvatar: "/placeholder.svg",
    prepTime: "15 min",
    calories: "420 kcal",
    savedDate: "2024-01-14",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300",
    tags: ["High Protein", "Breakfast", "Quick"],
    rating: 4.6
  },
  {
    id: 3,
    type: "article",
    title: "The Science of Progressive Overload",
    description: "Understanding how to continuously challenge your muscles for growth",
    author: "Dr. Emma Wilson",
    authorHandle: "@dremmafit",
    authorAvatar: "/placeholder.svg",
    readTime: "8 min read",
    savedDate: "2024-01-12",
    thumbnail: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=300",
    tags: ["Science", "Strength Training", "Education"],
    rating: 4.9
  },
  {
    id: 4,
    type: "workout",
    title: "Morning Yoga Flow",
    description: "Gentle 20-minute yoga sequence to start your day with mindfulness",
    author: "Lisa Park",
    authorHandle: "@lisayoga",
    authorAvatar: "/placeholder.svg",
    duration: "20 min",
    difficulty: "Beginner",
    savedDate: "2024-01-10",
    thumbnail: "https://images.unsplash.com/photo-1506629905607-61b21050e5e9?w=300",
    tags: ["Yoga", "Morning", "Flexibility"],
    rating: 4.7
  },
  {
    id: 5,
    type: "nutrition",
    title: "Post-Workout Recovery Smoothie",
    description: "Perfect blend of protein and carbs for muscle recovery",
    author: "Alex Rodriguez",
    authorHandle: "@alexnutrition",
    authorAvatar: "/placeholder.svg",
    prepTime: "5 min",
    calories: "280 kcal",
    savedDate: "2024-01-08",
    thumbnail: "https://images.unsplash.com/photo-1553979459-d2229ba7433a?w=300",
    tags: ["Smoothie", "Recovery", "Post-Workout"],
    rating: 4.5
  }
];

export const Saved = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [savedItems, setSavedItems] = useState(mockSavedItems);
  const [activeTab, setActiveTab] = useState("all");

  const handleRemoveItem = (itemId: number) => {
    setSavedItems(prev => prev.filter(item => item.id !== itemId));
  };

  const filteredItems = savedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    if (activeTab === "all") return matchesSearch;
    return matchesSearch && item.type === activeTab;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "workout": return "🏋️";
      case "nutrition": return "🥗";
      case "article": return "📖";
      default: return "📄";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "workout": return "bg-primary";
      case "nutrition": return "bg-secondary";
      case "article": return "bg-accent";
      default: return "bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Saved Items</h1>
          <p className="text-muted-foreground">
            Your collection of workouts, recipes, and articles
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search saved items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Sort by Date
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({savedItems.length})</TabsTrigger>
            <TabsTrigger value="workout">Workouts ({savedItems.filter(i => i.type === "workout").length})</TabsTrigger>
            <TabsTrigger value="nutrition">Nutrition ({savedItems.filter(i => i.type === "nutrition").length})</TabsTrigger>
            <TabsTrigger value="article">Articles ({savedItems.filter(i => i.type === "article").length})</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-6">
            {filteredItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <SavedItemCard
                    key={item.id}
                    item={item}
                    onRemove={() => handleRemoveItem(item.id)}
                  />
                ))}
              </div>
            ) : (
              <Card className="p-8 text-center">
                <Bookmark className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  {searchTerm ? "No Results Found" : "No Saved Items Yet"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm 
                    ? "Try adjusting your search terms" 
                    : "Start saving workouts, recipes, and articles you love!"
                  }
                </p>
                {!searchTerm && <Button>Explore Content</Button>}
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

interface SavedItemCardProps {
  item: any;
  onRemove: () => void;
}

const SavedItemCard = ({ item, onRemove }: SavedItemCardProps) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case "workout": return "bg-primary";
      case "nutrition": return "bg-secondary";
      case "article": return "bg-accent";
      default: return "bg-muted";
    }
  };

  const getItemMetrics = () => {
    switch (item.type) {
      case "workout":
        return [
          { label: "Duration", value: item.duration, icon: Clock },
          { label: "Level", value: item.difficulty }
        ];
      case "nutrition":
        return [
          { label: "Prep Time", value: item.prepTime, icon: Clock },
          { label: "Calories", value: item.calories }
        ];
      case "article":
        return [
          { label: "Read Time", value: item.readTime, icon: Clock }
        ];
      default:
        return [];
    }
  };

  return (
    <Card className="hover:shadow-medium transition-all duration-200 bg-gradient-card border-0 overflow-hidden group">
      <div className="relative">
        <div 
          className="h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${item.thumbnail})` }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all" />
          
          {/* Type Badge */}
          <div className="absolute top-3 left-3">
            <Badge className={`${getTypeColor(item.type)} text-white`}>
              {getItemMetrics()[0]?.icon && <Clock className="h-3 w-3 mr-1" />}
              {item.type === "workout" && "🏋️"}
              {item.type === "nutrition" && "🥗"}
              {item.type === "article" && "📖"}
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
          </div>

          {/* Quick Actions */}
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex space-x-2">
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Share className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
              <Button 
                size="icon" 
                variant="destructive" 
                className="h-8 w-8"
                onClick={onRemove}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Play Button for Videos */}
          {item.type === "workout" && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Button size="icon" className="h-12 w-12 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm">
                <Play className="h-6 w-6 text-white fill-current" />
              </Button>
            </div>
          )}

          {/* Rating */}
          <div className="absolute bottom-3 right-3">
            <div className="flex items-center space-x-1 bg-black/50 backdrop-blur-sm rounded-full px-2 py-1">
              <Star className="h-3 w-3 text-yellow-400 fill-current" />
              <span className="text-white text-xs font-medium">{item.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Author */}
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={item.authorAvatar} alt={item.author} />
            <AvatarFallback className="bg-gradient-primary text-white text-xs">
              {item.author.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{item.author}</p>
            <p className="text-xs text-muted-foreground">{item.authorHandle}</p>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            {getItemMetrics().map((metric, index) => (
              <div key={index} className="flex items-center space-x-1">
                {metric.icon && <metric.icon className="h-4 w-4" />}
                <span>{metric.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag: string, index: number) => (
            <Badge key={index} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Saved Date */}
        <div className="text-xs text-muted-foreground">
          Saved on {new Date(item.savedDate).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export default Saved;