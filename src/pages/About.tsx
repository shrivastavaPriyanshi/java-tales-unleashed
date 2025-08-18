import { Header } from "@/components/Layout/Header";
import { motion } from "framer-motion";
import { Gamepad2, BookOpen, Trophy, Users, Code, Heart } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Gamified Learning",
    description: "Transform coding education into an exciting adventure with mini-games, battles, and quests."
  },
  {
    icon: BookOpen,
    title: "Structured Curriculum",
    description: "Progressive learning path from basic syntax to advanced Java concepts with hands-on practice."
  },
  {
    icon: Trophy,
    title: "Achievement System",
    description: "Earn XP, unlock badges, and collect rewards as you master each programming concept."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Compete with friends, share achievements, and learn together in a supportive environment."
  },
  {
    icon: Code,
    title: "Real Java Code",
    description: "Practice with actual Java syntax and concepts, not simplified pseudo-code."
  },
  {
    icon: Heart,
    title: "Made with Love",
    description: "Created by passionate developers who believe learning should be fun and engaging."
  }
];

export const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-quest-gold/10">
      <Header />
      
      <main className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold font-pixel text-primary mb-4">
            About Java Quest
          </h1>
          <p className="text-lg text-muted-foreground font-poppins max-w-3xl mx-auto">
            Java Quest is a revolutionary gamified learning platform that transforms the way you learn programming.
            Embark on an epic adventure while mastering Java concepts through interactive challenges and exciting gameplay.
          </p>
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="adventure-card mb-12 text-center"
        >
          <h2 className="text-2xl font-bold font-pixel text-primary mb-4">Our Mission</h2>
          <p className="text-lg font-poppins text-muted-foreground">
            To make programming education accessible, engaging, and fun for everyone. 
            We believe that learning should be an adventure, not a chore.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.4 }}
              whileHover={{ scale: 1.05 }}
              className="adventure-card group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
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

        {/* Learning Path */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="adventure-card"
        >
          <h2 className="text-2xl font-bold font-pixel text-primary mb-6 text-center">
            The Adventure Awaits
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center space-y-2">
              <div className="text-4xl">🏘️</div>
              <h3 className="font-semibold font-poppins">Beginner Village</h3>
              <p className="text-sm text-muted-foreground">Start your journey with Java basics</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-4xl">🌲</div>
              <h3 className="font-semibold font-poppins">OOP Forest</h3>
              <p className="text-sm text-muted-foreground">Master object-oriented concepts</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-4xl">🏜️</div>
              <h3 className="font-semibold font-poppins">Exception Desert</h3>
              <p className="text-sm text-muted-foreground">Learn error handling</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-4xl">🏰</div>
              <h3 className="font-semibold font-poppins">Collection Castle</h3>
              <p className="text-sm text-muted-foreground">Conquer data structures</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="text-4xl">🗼</div>
              <h3 className="font-semibold font-poppins">Final Boss Tower</h3>
              <p className="text-sm text-muted-foreground">Ultimate Java mastery</p>
            </div>
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-12 text-center"
        >
          <h2 className="text-2xl font-bold font-pixel text-primary mb-4">
            Built with ❤️ by Developers
          </h2>
          <p className="text-muted-foreground font-poppins">
            Java Quest is an open-source project created by passionate developers who believe in making education fun and accessible.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default About;