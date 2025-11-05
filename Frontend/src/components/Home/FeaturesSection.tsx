import { motion } from "framer-motion";
import { Gamepad2, Trophy, Users, BookOpen, Zap, Star } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Interactive Mini-Games",
    description: "Battle monsters with code, solve puzzles, and complete challenges in engaging game formats.",
    color: "from-primary to-primary-glow"
  },
  {
    icon: Trophy,
    title: "Epic Rewards System",
    description: "Earn XP, unlock badges, and collect legendary items as you master Java concepts.",
    color: "from-quest-gold to-yellow-400"
  },
  {
    icon: Users,
    title: "Global Leaderboard",
    description: "Compete with fellow adventurers and climb the ranks to become a Java Master.",
    color: "from-battle-red to-red-400"
  },
  {
    icon: BookOpen,
    title: "Progressive Learning",
    description: "Journey through structured levels from Beginner Village to Advanced Castle.",
    color: "from-magic-purple to-purple-400"
  },
  {
    icon: Zap,
    title: "Real-time Battles",
    description: "Face coding challenges in exciting battle scenarios with instant feedback.",
    color: "from-secondary to-blue-400"
  },
  {
    icon: Star,
    title: "Achievement System",
    description: "Unlock special abilities and titles as you progress through your coding adventure.",
    color: "from-emerald-500 to-teal-400"
  }
];

export const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-pixel text-primary">
            Adventure Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-poppins">
            Discover the exciting features that make learning Java an epic adventure
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{ scale: 1.05 }}
              className="adventure-card group"
            >
              <div className="space-y-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold font-poppins">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground font-poppins">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};