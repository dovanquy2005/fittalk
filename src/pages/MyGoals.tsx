import { useState } from "react";
import { Plus, Target, TrendingUp, Calendar, Edit, Trash2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const mockGoals = [
  {
    id: 1,
    title: "Lose 15 pounds",
    description: "Reach my target weight for summer",
    category: "Weight Loss",
    targetValue: 15,
    currentValue: 8,
    unit: "lbs",
    deadline: "2024-06-01",
    priority: "high",
    status: "active",
    createdDate: "2024-01-01"
  },
  {
    id: 2,
    title: "Run a 5K under 25 minutes",
    description: "Improve my running speed and endurance",
    category: "Cardio",
    targetValue: 25,
    currentValue: 28,
    unit: "min",
    deadline: "2024-04-15",
    priority: "medium",
    status: "active",
    createdDate: "2024-01-15"
  },
  {
    id: 3,
    title: "Bench press 200 lbs",
    description: "Increase my upper body strength",
    category: "Strength",
    targetValue: 200,
    currentValue: 175,
    unit: "lbs",
    deadline: "2024-08-01",
    priority: "high",
    status: "active",
    createdDate: "2024-01-10"
  },
  {
    id: 4,
    title: "Practice yoga 4 times per week",
    description: "Improve flexibility and mindfulness",
    category: "Flexibility",
    targetValue: 4,
    currentValue: 3,
    unit: "times/week",
    deadline: "2024-12-31",
    priority: "low",
    status: "active",
    createdDate: "2024-01-05"
  },
  {
    id: 5,
    title: "Complete a half marathon",
    description: "Finish my first 13.1 mile race",
    category: "Cardio",
    targetValue: 1,
    currentValue: 1,
    unit: "race",
    deadline: "2024-03-15",
    priority: "high",
    status: "completed",
    createdDate: "2023-11-01"
  }
];

const categories = ["Weight Loss", "Strength", "Cardio", "Flexibility", "Nutrition", "Other"];
const priorities = ["low", "medium", "high"];

export const MyGoals = () => {
  const [goals, setGoals] = useState(mockGoals);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState("active");

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    category: "",
    targetValue: "",
    currentValue: "",
    unit: "",
    deadline: "",
    priority: "medium"
  });

  const handleAddGoal = () => {
    if (!newGoal.title || !newGoal.targetValue) return;

    const goal = {
      id: Date.now(),
      ...newGoal,
      targetValue: Number(newGoal.targetValue),
      currentValue: Number(newGoal.currentValue) || 0,
      status: "active",
      createdDate: new Date().toISOString().split('T')[0]
    };

    setGoals(prev => [...prev, goal]);
    setNewGoal({
      title: "",
      description: "",
      category: "",
      targetValue: "",
      currentValue: "",
      unit: "",
      deadline: "",
      priority: "medium"
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteGoal = (goalId: number) => {
    setGoals(prev => prev.filter(goal => goal.id !== goalId));
  };

  const handleToggleComplete = (goalId: number) => {
    setGoals(prev => prev.map(goal => 
      goal.id === goalId 
        ? { ...goal, status: goal.status === "completed" ? "active" : "completed" }
        : goal
    ));
  };

  const filteredGoals = goals.filter(goal => 
    filterStatus === "all" ? true : goal.status === filterStatus
  );

  const getProgressPercentage = (goal: any) => {
    if (goal.status === "completed") return 100;
    if (goal.category === "Cardio" && goal.unit === "min") {
      // For time-based goals, invert the calculation
      return Math.max(0, Math.min(100, ((goal.targetValue - goal.currentValue) / goal.targetValue) * 100));
    }
    return Math.min(100, (goal.currentValue / goal.targetValue) * 100);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive";
      case "medium": return "bg-warning";
      case "low": return "bg-success";
      default: return "bg-muted";
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
    
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Goals</h1>
            <p className="text-muted-foreground">
              Track your fitness journey and celebrate your achievements
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-primary text-white">
                <Plus className="h-4 w-4 mr-2" />
                Add Goal
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Goal</DialogTitle>
                <DialogDescription>
                  Set a specific, measurable fitness goal to track your progress.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Goal Title</Label>
                  <Input
                    id="title"
                    value={newGoal.title}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Lose 10 pounds"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newGoal.description}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your goal in detail..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category">Category</Label>
                    <Select onValueChange={(value) => setNewGoal(prev => ({ ...prev, category: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select onValueChange={(value) => setNewGoal(prev => ({ ...prev, priority: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Medium" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorities.map(priority => (
                          <SelectItem key={priority} value={priority}>
                            {priority.charAt(0).toUpperCase() + priority.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="targetValue">Target</Label>
                    <Input
                      id="targetValue"
                      type="number"
                      value={newGoal.targetValue}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, targetValue: e.target.value }))}
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <Label htmlFor="currentValue">Current</Label>
                    <Input
                      id="currentValue"
                      type="number"
                      value={newGoal.currentValue}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, currentValue: e.target.value }))}
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="unit">Unit</Label>
                    <Input
                      id="unit"
                      value={newGoal.unit}
                      onChange={(e) => setNewGoal(prev => ({ ...prev, unit: e.target.value }))}
                      placeholder="lbs"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={newGoal.deadline}
                    onChange={(e) => setNewGoal(prev => ({ ...prev, deadline: e.target.value }))}
                  />
                </div>
                <Button onClick={handleAddGoal} className="w-full">
                  Create Goal
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{goals.filter(g => g.status === "active").length}</p>
                  <p className="text-sm text-muted-foreground">Active Goals</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-success/10 rounded-full">
                  <CheckCircle className="h-6 w-6 text-success" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{goals.filter(g => g.status === "completed").length}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-warning/10 rounded-full">
                  <TrendingUp className="h-6 w-6 text-warning" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {Math.round(goals.filter(g => g.status === "active").reduce((acc, goal) => acc + getProgressPercentage(goal), 0) / goals.filter(g => g.status === "active").length || 0)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/10 rounded-full">
                  <Calendar className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {goals.filter(g => g.status === "active" && getDaysRemaining(g.deadline) <= 30).length}
                  </p>
                  <p className="text-sm text-muted-foreground">Due Soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg w-fit">
          {["active", "completed", "all"].map((status) => (
            <Button
              key={status}
              variant={filterStatus === status ? "default" : "ghost"}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className={filterStatus === status ? "bg-background shadow-sm" : ""}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredGoals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onDelete={() => handleDeleteGoal(goal.id)}
              onToggleComplete={() => handleToggleComplete(goal.id)}
            />
          ))}
        </div>

        {filteredGoals.length === 0 && (
          <Card className="p-8 text-center">
            <Target className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Goals Found</h3>
            <p className="text-muted-foreground mb-4">
              {filterStatus === "active" 
                ? "Create your first fitness goal to start tracking your progress!"
                : "No goals in this category yet."
              }
            </p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              Add Your First Goal
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

interface GoalCardProps {
  goal: any;
  onDelete: () => void;
  onToggleComplete: () => void;
}

const GoalCard = ({ goal, onDelete, onToggleComplete }: GoalCardProps) => {
  const getProgressPercentage = (goal: any) => {
    if (goal.status === "completed") return 100;
    if (goal.category === "Cardio" && goal.unit === "min") {
      return Math.max(0, Math.min(100, ((goal.targetValue - goal.currentValue) / goal.targetValue) * 100));
    }
    return Math.min(100, (goal.currentValue / goal.targetValue) * 100);
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysDiff;
  };

  const progress = getProgressPercentage(goal);
  const daysRemaining = getDaysRemaining(goal.deadline);
  const isOverdue = daysRemaining < 0;
  const isDueSoon = daysRemaining <= 7 && daysRemaining >= 0;

  const getPriorityColor = (priority: string) => {
    if (goal.status === "completed") return 100;
    switch (priority) {
      case "high": return "bg-destructive";
      case "medium": return "bg-warning";
      case "low": return "bg-success";
      default: return "bg-muted";
    }
  };

  return (
    <Card className={`hover:shadow-medium transition-all duration-200 bg-gradient-card border-0 ${
      goal.status === "completed" ? "opacity-75" : ""
    }`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <CardTitle className={`text-lg ${goal.status === "completed" ? "line-through" : ""}`}>
                {goal.title}
              </CardTitle>
              <Badge className={`${getPriorityColor(goal.priority)} text-white text-xs`}>
                {goal.priority}
              </Badge>
            </div>
            <Badge variant="secondary" className="text-xs mb-2">
              {goal.category}
            </Badge>
            <CardDescription className="text-sm">
              {goal.description}
            </CardDescription>
          </div>
          <div className="flex space-x-1">
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button 
              size="icon" 
              variant="ghost" 
              className="h-8 w-8 text-destructive"
              onClick={onDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span className="font-medium">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{goal.currentValue} {goal.unit}</span>
            <span>{goal.targetValue} {goal.unit}</span>
          </div>
        </div>

        {/* Deadline */}
        <div className="flex items-center justify-between text-sm">
          <span>Deadline:</span>
          <div className="flex items-center space-x-2">
            <span className={`${isOverdue ? "text-destructive" : isDueSoon ? "text-warning" : ""}`}>
              {new Date(goal.deadline).toLocaleDateString()}
            </span>
            {isOverdue && <Badge className="bg-destructive text-white text-xs">Overdue</Badge>}
            {isDueSoon && !isOverdue && <Badge className="bg-warning text-black text-xs">Due Soon</Badge>}
          </div>
        </div>

        {/* Days Remaining */}
        {goal.status !== "completed" && (
          <div className="text-xs text-muted-foreground">
            {isOverdue 
              ? `${Math.abs(daysRemaining)} days overdue`
              : `${daysRemaining} days remaining`
            }
          </div>
        )}

        {/* Action Button */}
        <Button
          onClick={onToggleComplete}
          className={`w-full ${
            goal.status === "completed"
              ? "bg-muted text-muted-foreground hover:bg-muted/80"
              : "bg-gradient-primary text-white hover:opacity-90"
          }`}
        >
          {goal.status === "completed" ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Completed
            </>
          ) : (
            "Mark as Complete"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};

export default MyGoals;