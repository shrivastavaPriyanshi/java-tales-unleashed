import { Button } from "@/components/ui/button";
import { Play, Trophy, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-quest-gold/10 py-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),transparent)]" />
      
      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center space-y-8"
        >
          {/* Main Title */}
          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="quest-title"
            >
              Java Quest
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="quest-subtitle"
            >
              Master the Code Through Epic Adventures
            </motion.h2>
          </div>

          {/* Description */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto font-poppins"
          >
            Embark on an epic coding journey through villages, forests, and dungeons. 
            Learn Java programming while battling monsters, solving puzzles, and collecting treasures!
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/map">
              <Button className="btn-quest px-8 py-6 text-lg flex items-center space-x-2">
                <Play className="w-5 h-5" />
                <span>Start Quest</span>
              </Button>
            </Link>
            
            <Link to="/leaderboard">
              <Button variant="outline" className="px-8 py-6 text-lg flex items-center space-x-2 hover:btn-gold">
                <Trophy className="w-5 h-5" />
                <span>Leaderboard</span>
              </Button>
            </Link>
            
            <Link to="/about">
              <Button variant="ghost" className="px-8 py-6 text-lg flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>About</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Hero Illustration Placeholder */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 relative"
        >
          <div className="w-full max-w-4xl mx-auto h-64 md:h-80 bg-gradient-to-br from-primary/20 via-quest-gold/20 to-magic-purple/20 rounded-3xl border border-border/50 backdrop-blur-sm">
            <div className="flex items-center justify-center h-full">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-quest-gold rounded-full flex items-center justify-center">
                  <span className="text-3xl">🗺️</span>
                </div>
                <p className="text-muted-foreground font-poppins">Adventure Map Preview</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};