import { Heart, Activity, Moon, Target, TrendingUp, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const mockHealthData = {
  bmi: 22.5,
  weight: 150,
  height: "5'8\"",
  sleepHours: 7.5,
  caloriesBurned: 420,
  dailyGoal: 500,
  heartRate: 72,
  steps: 8450,
  stepGoal: 10000,
  waterIntake: 6,
  waterGoal: 8
};

export const Health = () => {
  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return { category: "Underweight", color: "text-blue-500" };
    if (bmi < 25) return { category: "Normal", color: "text-green-500" };
    if (bmi < 30) return { category: "Overweight", color: "text-yellow-500" };
    return { category: "Obese", color: "text-red-500" };
  };

  const bmiInfo = getBMICategory(mockHealthData.bmi);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Health Overview</h1>
          <p className="text-muted-foreground">
            Track your health metrics and wellness journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* BMI Card */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5 text-primary" />
                <span>BMI</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{mockHealthData.bmi}</div>
                <Badge className={`${bmiInfo.color} bg-transparent border`}>
                  {bmiInfo.category}
                </Badge>
                <div className="mt-4 text-sm text-muted-foreground">
                  Weight: {mockHealthData.weight} lbs • Height: {mockHealthData.height}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sleep Card */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-primary" />
                <span>Sleep</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{mockHealthData.sleepHours}h</div>
                <p className="text-sm text-muted-foreground mb-4">Last night</p>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">Target: 8 hours</p>
              </div>
            </CardContent>
          </Card>

          {/* Heart Rate Card */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Heart Rate</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{mockHealthData.heartRate}</div>
                <p className="text-sm text-muted-foreground">BPM</p>
                <Badge className="mt-2 bg-green-100 text-green-700">Normal</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Calories Card */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-orange-500" />
                <span>Calories Burned</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{mockHealthData.caloriesBurned}</div>
                  <p className="text-sm text-muted-foreground">of {mockHealthData.dailyGoal} goal</p>
                </div>
                <Progress 
                  value={(mockHealthData.caloriesBurned / mockHealthData.dailyGoal) * 100} 
                  className="h-3"
                />
              </div>
            </CardContent>
          </Card>

          {/* Steps Card */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                <span>Steps</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{mockHealthData.steps.toLocaleString()}</div>
                  <p className="text-sm text-muted-foreground">of {mockHealthData.stepGoal.toLocaleString()} goal</p>
                </div>
                <Progress 
                  value={(mockHealthData.steps / mockHealthData.stepGoal) * 100} 
                  className="h-3"
                />
              </div>
            </CardContent>
          </Card>

          {/* Water Intake Card */}
          <Card className="bg-gradient-card border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-cyan-500" />
                <span>Water Intake</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold">{mockHealthData.waterIntake}</div>
                  <p className="text-sm text-muted-foreground">of {mockHealthData.waterGoal} glasses</p>
                </div>
                <Progress 
                  value={(mockHealthData.waterIntake / mockHealthData.waterGoal) * 100} 
                  className="h-3"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Health;