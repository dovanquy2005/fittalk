import { useState } from "react";
import { Plus, Clock, Utensils, Search, Filter, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Header } from "@/components/layout/Header";
// import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

const mockMeals = [
  {
    id: 1,
    name: "Salad Gà Nướng",
    category: "lunch",
    calories: 350,
    protein: 35,
    carbs: 15,
    fat: 18,
    prepTime: 15,
    difficulty: "Dễ",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    ingredients: ["Ức gà", "Rau xà lách trộn", "Cà chua bi", "Dưa chuột"],
    instructions: ["Nướng ức gà", "Chuẩn bị salad", "Trộn đều và thưởng thức"]
  },
  {
    id: 2,
    name: "Tô Sinh Tố Protein",
    category: "breakfast",
    calories: 285,
    protein: 25,
    carbs: 32,
    fat: 8,
    prepTime: 10,
    difficulty: "Dễ",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
    ingredients: ["Bột protein", "Chuối", "Các loại quả mọng", "Ngũ cốc Granola"],
    instructions: ["Xay các nguyên liệu", "Đổ ra tô", "Thêm topping"]
  },
  {
    id: 3,
    name: "Tô Năng Lượng Quinoa",
    category: "dinner",
    calories: 420,
    protein: 18,
    carbs: 65,
    fat: 12,
    prepTime: 25,
    difficulty: "Trung bình",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    ingredients: ["Diêm mạch", "Đậu đen", "Bơ", "Khoai lang"],
    instructions: ["Nấu diêm mạch", "Nướng rau củ", "Trình bày ra tô"]
  },
  {
    id: 4,
    name: "Yến Mạch Qua Đêm",
    category: "breakfast",
    calories: 320,
    protein: 12,
    carbs: 48,
    fat: 10,
    prepTime: 5,
    difficulty: "Dễ",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571197119282-621c26817a73?w=400",
    ingredients: ["Yến mạch", "Sữa chua Hy Lạp", "Hạt chia", "Các loại quả mọng"],
    instructions: ["Trộn các nguyên liệu", "Để tủ lạnh qua đêm", "Thưởng thức lạnh"]
  }
];

const mealPlans = [
  {
    id: 1,
    name: "Kế Hoạch Giàu Protein",
    description: "Hoàn hảo để xây dựng và phục hồi cơ bắp",
    duration: "7 ngày",
    calories: "2200-2500/ngày",
    meals: 21,
    rating: 4.8
  },
  {
    id: 2,
    name: "Kế Hoạch Giảm Cân", 
    description: "Dinh dưỡng cân bằng để giảm cân lành mạnh",
    duration: "14 ngày",
    calories: "1500-1800/ngày",
    meals: 42,
    rating: 4.6
  },
  {
    id: 3,
    name: "Kế Hoạch Ăn Chay",
    description: "Dinh dưỡng từ thực vật cho sức khỏe tối ưu",
    duration: "7 ngày",
    calories: "1800-2200/ngày",
    meals: 21,
    rating: 4.7
  }
];

const Nutrition = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showAddMeal, setShowAddMeal] = useState(false);

  const filteredMeals = mockMeals.filter(meal => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || meal.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
  
      <div className="flex">
    
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Bữa ăn & Công thức
                </h1>
                <p className="text-muted-foreground mt-2">
                  Khám phá các công thức và kế hoạch bữa ăn lành mạnh
                </p>
              </div>
              <Dialog open={showAddMeal} onOpenChange={setShowAddMeal}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Thêm công thức
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Thêm công thức mới</DialogTitle>
                    <DialogDescription>
                      Chia sẻ công thức lành mạnh yêu thích của bạn với cộng đồng
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipe-name">Tên công thức</Label>
                      <Input id="recipe-name" placeholder="Nhập tên công thức" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prep-time">Thời gian chuẩn bị (phút)</Label>
                        <Input id="prep-time" type="number" placeholder="15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="calories">Lượng calo</Label>
                        <Input id="calories" type="number" placeholder="350" />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Lưu công thức
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {/* Search and Filters */}
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Tìm kiếm công thức..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Danh mục" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tất cả danh mục</SelectItem>
                      <SelectItem value="breakfast">Bữa sáng</SelectItem>
                      <SelectItem value="lunch">Bữa trưa</SelectItem>
                      <SelectItem value="dinner">Bữa tối</SelectItem>
                      <SelectItem value="snack">Bữa phụ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="recipes" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recipes">Công thức</TabsTrigger>
                <TabsTrigger value="meal-plans">Kế hoạch bữa ăn</TabsTrigger>
              </TabsList>

              <TabsContent value="recipes" className="space-y-6">
                {/* Recipe Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMeals.map((meal) => (
                    <Card key={meal.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-elevated transition-shadow overflow-hidden group">
                      <div className="relative overflow-hidden">
                        <img 
                          src={meal.image} 
                          alt={meal.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-black/50 text-white">
                            {meal.calories} calo
                          </Badge>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className={`${
                            meal.difficulty === 'Dễ' ? 'bg-green-500' :
                            meal.difficulty === 'Trung bình' ? 'bg-yellow-500' : 'bg-red-500'
                          } text-white`}>
                            {meal.difficulty}
                          </Badge>
                        </div>
                      </div>
                      
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          <div>
                            <h3 className="font-semibold text-lg mb-1">{meal.name}</h3>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-muted-foreground">{meal.rating}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3" />
                              {meal.prepTime}m
                            </div>
                            <div className="flex items-center">
                              <Utensils className="mr-1 h-3 w-3" />
                              {meal.category}
                            </div>
                          </div>

                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <div className="text-center p-2 bg-muted/50 rounded">
                              <div className="font-medium text-primary">{meal.protein}g</div>
                              <div className="text-muted-foreground">Đạm</div>
                            </div>
                            <div className="text-center p-2 bg-muted/50 rounded">
                              <div className="font-medium text-primary">{meal.carbs}g</div>
                              <div className="text-muted-foreground">Carb</div>
                            </div>
                            <div className="text-center p-2 bg-muted/50 rounded">
                              <div className="font-medium text-primary">{meal.fat}g</div>
                              <div className="text-muted-foreground">Chất béo</div>
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-primary hover:opacity-90">
                            Xem công thức
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="meal-plans" className="space-y-6">
                {/* Meal Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mealPlans.map((plan) => (
                    <Card key={plan.id} className="bg-gradient-card border-0 shadow-soft hover:shadow-elevated transition-shadow">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          {plan.name}
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm">{plan.rating}</span>
                          </div>
                        </CardTitle>
                        <p className="text-muted-foreground text-sm">{plan.description}</p>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Thời lượng:</span>
                            <span className="font-medium">{plan.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Lượng calo:</span>
                            <span className="font-medium">{plan.calories}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Tổng số bữa ăn:</span>
                            <span className="font-medium">{plan.meals}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-primary hover:opacity-90">
                          Bắt đầu kế hoạch
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

export default Nutrition;