import { useState } from "react";
import { Plus, Trash2, Edit, Apple, Utensils } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

const mockMeals = [
  { id: 1, name: "Greek Yogurt Bowl", calories: 320, protein: 20, carbs: 35, fat: 8, time: "Breakfast" },
  { id: 2, name: "Grilled Chicken Salad", calories: 450, protein: 35, carbs: 25, fat: 18, time: "Lunch" },
  { id: 3, name: "Protein Smoothie", calories: 280, protein: 25, carbs: 30, fat: 5, time: "Snack" }
];

const dailyGoals = { calories: 2000, protein: 150, carbs: 250, fat: 70 };

export const Nutrition = () => {
  const [meals, setMeals] = useState(mockMeals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: "", calories: "", protein: "", carbs: "", fat: "", time: "Breakfast" });

  const totalIntake = meals.reduce((acc, meal) => ({
    calories: acc.calories + meal.calories,
    protein: acc.protein + meal.protein,
    carbs: acc.carbs + meal.carbs,
    fat: acc.fat + meal.fat
  }), { calories: 0, protein: 0, carbs: 0, fat: 0 });

  const handleAddMeal = () => {
    if (!newMeal.name || !newMeal.calories) return;
    const meal = {
      id: Date.now(),
      name: newMeal.name,
      calories: Number(newMeal.calories),
      protein: Number(newMeal.protein) || 0,
      carbs: Number(newMeal.carbs) || 0,
      fat: Number(newMeal.fat) || 0,
      time: newMeal.time
    };
    setMeals(prev => [...prev, meal]);
    setNewMeal({ name: "", calories: "", protein: "", carbs: "", fat: "", time: "Breakfast" });
    setIsAddDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Nutrition Tracker</h1>
            <p className="text-muted-foreground">Track your daily nutrition and reach your goals</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Meal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Meal</DialogTitle>
                <DialogDescription>Add a meal to track your nutrition for today.</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="mealName">Meal Name</Label>
                  <Input
                    id="mealName"
                    value={newMeal.name}
                    onChange={(e) => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g., Grilled Chicken Breast"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      value={newMeal.calories}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
                      placeholder="300"
                    />
                  </div>
                  <div>
                    <Label htmlFor="mealTime">Meal Time</Label>
                    <select
                      value={newMeal.time}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                    >
                      <option value="Breakfast">Breakfast</option>
                      <option value="Lunch">Lunch</option>
                      <option value="Dinner">Dinner</option>
                      <option value="Snack">Snack</option>
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="protein">Protein (g)</Label>
                    <Input
                      id="protein"
                      type="number"
                      value={newMeal.protein}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, protein: e.target.value }))}
                      placeholder="25"
                    />
                  </div>
                  <div>
                    <Label htmlFor="carbs">Carbs (g)</Label>
                    <Input
                      id="carbs"
                      type="number"
                      value={newMeal.carbs}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, carbs: e.target.value }))}
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat">Fat (g)</Label>
                    <Input
                      id="fat"
                      type="number"
                      value={newMeal.fat}
                      onChange={(e) => setNewMeal(prev => ({ ...prev, fat: e.target.value }))}
                      placeholder="10"
                    />
                  </div>
                </div>
                <Button onClick={handleAddMeal} className="w-full">Add Meal</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Daily Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-primary text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold">{totalIntake.calories}</div>
              <div className="text-sm opacity-80">of {dailyGoals.calories} calories</div>
              <Progress value={(totalIntake.calories / dailyGoals.calories) * 100} className="mt-2 h-2 bg-white/20" />
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-secondary text-white border-0">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold">{totalIntake.protein}g</div>
              <div className="text-sm opacity-80">of {dailyGoals.protein}g protein</div>
              <Progress value={(totalIntake.protein / dailyGoals.protein) * 100} className="mt-2 h-2 bg-white/20" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-warning">{totalIntake.carbs}g</div>
              <div className="text-sm text-muted-foreground">of {dailyGoals.carbs}g carbs</div>
              <Progress value={(totalIntake.carbs / dailyGoals.carbs) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-accent">{totalIntake.fat}g</div>
              <div className="text-sm text-muted-foreground">of {dailyGoals.fat}g fat</div>
              <Progress value={(totalIntake.fat / dailyGoals.fat) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>
        </div>

        {/* Today's Meals */}
        <Card className="bg-gradient-card border-0 shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Utensils className="h-5 w-5" />
              <span>Today's Meals</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {meals.map((meal) => (
                <div key={meal.id} className="flex items-center justify-between p-4 bg-background rounded-lg border">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-full">
                      <Apple className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium">{meal.name}</h4>
                      <p className="text-sm text-muted-foreground">{meal.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="text-sm">
                      <span className="font-medium">{meal.calories}</span> cal
                    </div>
                    <div className="text-sm text-muted-foreground">
                      P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                    </div>
                    <div className="flex space-x-2">
                      <Button size="icon" variant="ghost" className="h-8 w-8">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 text-destructive"
                        onClick={() => setMeals(prev => prev.filter(m => m.id !== meal.id))}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              {meals.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <Apple className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No meals added yet. Start tracking your nutrition!</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Nutrition;