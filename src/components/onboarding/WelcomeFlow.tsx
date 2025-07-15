import { useState } from "react";
import { ChevronRight, Target, Users, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import heroImage from "@/assets/hero-fitness.jpg";

const fitnessGoals = [
  "Giảm cân",
  "Tăng cơ",
  "Rèn sức bền",
  "Linh hoạt & Di chuyển",
  "Rèn sức mạnh",
  "Hiệu suất thể thao",
  "Thể dục tổng quát",
  "Phục hồi chấn thương"
];

const experienceLevels = [
  { id: "beginner", label: "Người mới", desc: "Mới bắt đầu" },
  { id: "intermediate", label: "Trung cấp", desc: "Có kinh nghiệm" },
  { id: "advanced", label: "Nâng cao", desc: "Vận động viên chuyên nghiệp" }
];

const interests = [
  "Chế độ tập luyện",
  "Tư vấn dinh dưỡng",
  "Động lực & Tinh thần",
  "Theo dõi tiến trình",
  "Thử thách cộng đồng",
  "Đánh giá thiết bị",
  "Phòng tránh chấn thương",
  "Thông tin bổ sung"
];


interface WelcomeFlowProps {
  onComplete: () => void;
}

export const WelcomeFlow = ({ onComplete }: WelcomeFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const handleGoalToggle = (goal: string) => {
    setSelectedGoals(prev => 
      prev.includes(goal) 
        ? prev.filter(g => g !== goal)
        : [...prev, goal]
    );
  };

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 2: return selectedGoals.length > 0;
      case 3: return selectedInterests.length > 0;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {step === 1 && (
          <Card className="p-8 text-center space-y-6 bg-white/95 backdrop-blur border-0 shadow-strong animate-slide-up">
            <div className="space-y-4">
              <div className="h-20 w-20 mx-auto rounded-full bg-gradient-primary flex items-center justify-center">
                <span className="text-white font-bold text-2xl">FT</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Chào mừng đến với FitTalk
              </h1>
              <p className="text-xl text-muted-foreground max-w-md mx-auto">
                Tham gia cộng đồng những người yêu thể thao chia sẻ kiến thức, động lực và câu chuyện thành công.
              </p>
            </div>
            
            <div className="rounded-lg overflow-hidden">
              <img 
                src={heroImage} 
                alt="Fitness community"
                className="w-full h-48 object-cover"
              />
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <Target className="h-8 w-8 mx-auto mb-2 text-primary" />
                <span className="font-medium">Theo dõi mục tiêu</span>
              </div>
              <div className="text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-secondary" />
                <span className="font-medium">kết nối</span>
              </div>
              <div className="text-center">
                <TrendingUp className="h-8 w-8 mx-auto mb-2 text-energy" />
                <span className="font-medium">cùng nhau phát triển</span>
              </div>
            </div>
            
            <Button 
              onClick={nextStep} 
              size="lg" 
              className="w-full bg-gradient-primary hover:opacity-90 shadow-glow"
            >
              Bắt đầu
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        )}

        {step === 2 && (
          <Card className="p-8 space-y-6 bg-white/95 backdrop-blur border-0 shadow-strong animate-slide-up">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Mục tiêu thể chất của bạn là gì?</h2>
              <p className="text-muted-foreground">Chọn tất cả những mục phù hợp để cá nhân hóa trải nghiệm</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {fitnessGoals.map((goal) => (
                <div
                  key={goal}
                  onClick={() => handleGoalToggle(goal)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    selectedGoals.includes(goal)
                      ? "border-primary bg-primary/10 shadow-glow"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Checkbox checked={selectedGoals.includes(goal)} />
                    <span className="font-medium">{goal}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <Button 
              onClick={nextStep} 
              disabled={!canProceed()}
              size="lg" 
              className="w-full bg-gradient-primary hover:opacity-90 shadow-glow disabled:opacity-50"
            >
              Tiếp tục ({selectedGoals.length} đã chọn)
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        )}

        {step === 3 && (
          <Card className="p-8 space-y-6 bg-white/95 backdrop-blur border-0 shadow-strong animate-slide-up">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">Bạn quan tâm nhất đến điều gì?</h2>
              <p className="text-muted-foreground">Chúng tôi sẽ tùy chỉnh nội dung theo sở thích của bạn</p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={`p-3 cursor-pointer transition-all text-center justify-center ${
                    selectedInterests.includes(interest)
                      ? "bg-gradient-primary text-white shadow-glow"
                      : "bg-muted hover:bg-muted/80 text-foreground"
                  }`}
                >
                  {interest}
                </Badge>
              ))}
            </div>
            
            <Button 
              onClick={nextStep} 
              disabled={!canProceed()}
              size="lg" 
              className="w-full bg-gradient-primary hover:opacity-90 shadow-glow disabled:opacity-50"
            >
              Hoàn tất thiết lập ({selectedInterests.length} đã chọn)
              <CheckCircle className="ml-2 h-5 w-5" />
            </Button>
          </Card>
        )}
        
        {/* Progress Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-8 rounded-full transition-all ${
                i <= step ? "bg-white shadow-glow" : "bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};