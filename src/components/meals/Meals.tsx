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
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNavigation } from "@/components/layout/MobileNavigation";

const mockMeals = [
  {
    id: 1,
    name: "Grilled Chicken Salad",
    category: "lunch",
    calories: 350,
    protein: 35,
    carbs: 15,
    fat: 18,
    prepTime: 15,
    difficulty: "Easy",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    ingredients: ["Chicken breast", "Mixed greens", "Cherry tomatoes", "Cucumber"],
    instructions: ["Grill chicken breast", "Prepare salad", "Combine and serve"]
  },
  {
    id: 2,
    name: "Protein Smoothie Bowl",
    category: "breakfast",
    calories: 285,
    protein: 25,
    carbs: 32,
    fat: 8,
    prepTime: 10,
    difficulty: "Easy",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=400",
    ingredients: ["Protein powder", "Banana", "Berries", "Granola"],
    instructions: ["Blend ingredients", "Pour into bowl", "Add toppings"]
  },
  {
    id: 3,
    name: "Quinoa Power Bowl",
    category: "dinner",
    calories: 420,
    protein: 18,
    carbs: 65,
    fat: 12,
    prepTime: 25,
    difficulty: "Medium",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1546793665-c74683f339c1?w=400",
    ingredients: ["Quinoa", "Black beans", "Avocado", "Sweet potato"],
    instructions: ["Cook quinoa", "Roast vegetables", "Assemble bowl"]
  },
  {
    id: 4,
    name: "Overnight Oats",
    category: "breakfast",
    calories: 320,
    protein: 12,
    carbs: 48,
    fat: 10,
    prepTime: 5,
    difficulty: "Easy",
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1571197119282-621c26817a73?w=400",
    ingredients: ["Oats", "Greek yogurt", "Chia seeds", "Berries"],
    instructions: ["Mix ingredients", "Refrigerate overnight", "Enjoy cold"]
  }
];

const mealPlans = [
  {
    id: 1,
    name: "High Protein Plan",
    description: "Perfect for muscle building and recovery",
    duration: "7 days",
    calories: "2200-2500/day",
    meals: 21,
    rating: 4.8
  },
  {
    id: 2,
    name: "Weight Loss Plan", 
    description: "Balanced nutrition for healthy weight loss",
    duration: "14 days",
    calories: "1500-1800/day",
    meals: 42,
    rating: 4.6
  },
  {
    id: 3,
    name: "Vegetarian Plan",
    description: "Plant-based nutrition for optimal health",
    duration: "7 days",
    calories: "1800-2200/day",
    meals: 21,
    rating: 4.7
  }
];

export const Meals = () => {
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
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 lg:p-8">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  Meals & Recipes
                </h1>
                <p className="text-muted-foreground mt-2">
                  Discover healthy recipes and meal plans
                </p>
              </div>
              <Dialog open={showAddMeal} onOpenChange={setShowAddMeal}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:opacity-90">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Recipe
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Recipe</DialogTitle>
                    <DialogDescription>
                      Share your favorite healthy recipe with the community
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="recipe-name">Recipe Name</Label>
                      <Input id="recipe-name" placeholder="Enter recipe name" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="prep-time">Prep Time (min)</Label>
                        <Input id="prep-time" type="number" placeholder="15" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="calories">Calories</Label>
                        <Input id="calories" type="number" placeholder="350" />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-primary hover:opacity-90">
                      Save Recipe
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
                      placeholder="Search recipes..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full md:w-48">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="breakfast">Breakfast</SelectItem>
                      <SelectItem value="lunch">Lunch</SelectItem>
                      <SelectItem value="dinner">Dinner</SelectItem>
                      <SelectItem value="snack">Snacks</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Tabs defaultValue="recipes" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="recipes">Recipes</TabsTrigger>
                <TabsTrigger value="meal-plans">Meal Plans</TabsTrigger>
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
                            {meal.calories} cal
                          </Badge>
                        </div>
                        <div className="absolute top-3 left-3">
                          <Badge className={`${
                            meal.difficulty === 'Easy' ? 'bg-green-500' :
                            meal.difficulty === 'Medium' ? 'bg-yellow-500' : 'bg-red-500'
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
                              <div className="text-muted-foreground">Protein</div>
                            </div>
                            <div className="text-center p-2 bg-muted/50 rounded">
                              <div className="font-medium text-primary">{meal.carbs}g</div>
                              <div className="text-muted-foreground">Carbs</div>
                            </div>
                            <div className="text-center p-2 bg-muted/50 rounded">
                              <div className="font-medium text-primary">{meal.fat}g</div>
                              <div className="text-muted-foreground">Fat</div>
                            </div>
                          </div>

                          <Button className="w-full bg-gradient-primary hover:opacity-90">
                            View Recipe
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
                            <span className="text-muted-foreground">Duration:</span>
                            <span className="font-medium">{plan.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Calories:</span>
                            <span className="font-medium">{plan.calories}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Total Meals:</span>
                            <span className="font-medium">{plan.meals}</span>
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-primary hover:opacity-90">
                          Start Plan
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

