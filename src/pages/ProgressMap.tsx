import { Header } from "@/components/Layout/Header";
import { motion } from "framer-motion";
import { Lock, Star, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const stages = [
  {
    id: 1,
    name: "Beginner Village",
    description: "Learn Java basics and syntax",
    status: "completed",
    icon: "🏘️",
    position: { x: 20, y: 80 }
  },
  {
    id: 2,
    name: "OOP Forest",
    description: "Master Object-Oriented Programming",
    status: "current",
    icon: "🌲",
    position: { x: 35, y: 60 }
  },
  {
    id: 3,
    name: "Exception Desert",
    description: "Handle errors like a pro",
    status: "locked",
    icon: "🏜️",
    position: { x: 60, y: 45 }
  },
  {
    id: 4,
    name: "Collection Castle",
    description: "Conquer data structures",
    status: "locked",
    icon: "🏰",
    position: { x: 75, y: 25 }
  },
  {
    id: 5,
    name: "Final Boss Tower",
    description: "Ultimate Java challenge",
    status: "locked",
    icon: "🗼",
    position: { x: 85, y: 10 }
  }
];

export const ProgressMap = () => {
  const getStageClass = (status: string) => {
    switch (status) {
      case "completed":
        return "map-stage unlocked bg-gradient-to-br from-primary to-primary-glow border-primary text-white";
      case "current":
        return "map-stage current";
      case "locked":
        return "map-stage locked";
      default:
        return "map-stage locked";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-quest-gold/10">
      <Header />
      
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold font-pixel text-primary mb-4">
            Adventure Map
          </h1>
          <p className="text-lg text-muted-foreground font-poppins">
            Choose your path and embark on your coding journey
          </p>
        </motion.div>

        {/* Interactive Map */}
        <div className="relative w-full h-[600px] bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-100 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-purple-900/20 rounded-3xl border border-border overflow-hidden">
          {/* Path Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
            <defs>
              <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--quest-gold))" />
              </linearGradient>
            </defs>
            {stages.slice(0, -1).map((stage, index) => {
              const nextStage = stages[index + 1];
              return (
                <line
                  key={`path-${stage.id}`}
                  x1={`${stage.position.x}%`}
                  y1={`${stage.position.y}%`}
                  x2={`${nextStage.position.x}%`}
                  y2={`${nextStage.position.y}%`}
                  stroke="url(#pathGradient)"
                  strokeWidth="4"
                  strokeDasharray={stage.status === "locked" ? "10,5" : "none"}
                  opacity={stage.status === "locked" ? 0.3 : 0.8}
                />
              );
            })}
          </svg>

          {/* Stage Markers */}
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `${stage.position.x}%`, 
                top: `${stage.position.y}%`,
                zIndex: 10 
              }}
            >
              <div className={getStageClass(stage.status)}>
                <div className="text-center">
                  <div className="text-2xl mb-2">{stage.icon}</div>
                  {stage.status === "completed" && (
                    <Star className="w-4 h-4 mx-auto text-quest-gold" />
                  )}
                  {stage.status === "locked" && (
                    <Lock className="w-4 h-4 mx-auto text-muted-foreground" />
                  )}
                  {stage.status === "current" && (
                    <Play className="w-4 h-4 mx-auto text-quest-gold-foreground" />
                  )}
                </div>
              </div>
              
              {/* Stage Info Popup */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute top-full mt-4 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded-lg p-4 shadow-lg min-w-[200px] text-center"
              >
                <h3 className="font-semibold font-poppins text-sm mb-1">
                  {stage.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-3">
                  {stage.description}
                </p>
                {stage.status !== "locked" && (
                  <Button size="sm" className="btn-quest text-xs">
                    {stage.status === "completed" ? "Review" : "Start"}
                  </Button>
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="adventure-card text-center">
            <div className="text-2xl font-bold text-primary">1/5</div>
            <div className="text-sm text-muted-foreground">Stages Completed</div>
          </div>
          
          <div className="adventure-card text-center">
            <div className="text-2xl font-bold text-quest-gold">1,250</div>
            <div className="text-sm text-muted-foreground">Total XP</div>
          </div>
          
          <div className="adventure-card text-center">
            <div className="text-2xl font-bold text-magic-purple">3</div>
            <div className="text-sm text-muted-foreground">Badges Earned</div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ProgressMap;