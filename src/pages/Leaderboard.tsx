import { Header } from "@/components/Layout/Header";
import { motion } from "framer-motion";
import { Trophy, Medal, Crown, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const leaderboardData = [
  {
    id: 1,
    rank: 1,
    name: "CodeMaster Alex",
    avatar: "🧙‍♂️",
    xp: 15000,
    badges: 12,
    title: "Java Archmage"
  },
  {
    id: 2,
    rank: 2,
    name: "Knight Sarah",
    avatar: "⚔️",
    xp: 12500,
    badges: 10,
    title: "Code Crusader"
  },
  {
    id: 3,
    rank: 3,
    name: "Wizard Mike",
    avatar: "🧙",
    xp: 11200,
    badges: 9,
    title: "Exception Handler"
  },
  {
    id: 4,
    rank: 4,
    name: "Ranger Luna",
    avatar: "🏹",
    xp: 9800,
    badges: 8,
    title: "Loop Master"
  },
  {
    id: 5,
    rank: 5,
    name: "Paladin John",
    avatar: "🛡️",
    xp: 8900,
    badges: 7,
    title: "Method Defender"
  }
];

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 1:
      return <Crown className="w-6 h-6 text-quest-gold" />;
    case 2:
      return <Medal className="w-6 h-6 text-gray-400" />;
    case 3:
      return <Medal className="w-6 h-6 text-amber-600" />;
    default:
      return <Trophy className="w-5 h-5 text-muted-foreground" />;
  }
};

const getRankStyle = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-gradient-to-r from-quest-gold to-yellow-400 text-quest-gold-foreground";
    case 2:
      return "bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800";
    case 3:
      return "bg-gradient-to-r from-amber-400 to-amber-500 text-amber-900";
    default:
      return "bg-muted";
  }
};

export const Leaderboard = () => {
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
            Hall of Fame
          </h1>
          <p className="text-lg text-muted-foreground font-poppins">
            The greatest Java adventurers in the realm
          </p>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex items-end justify-center space-x-4 mb-8">
            {/* Second Place */}
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`${getRankStyle(2)} p-6 rounded-lg mb-4 h-32 flex flex-col items-center justify-center`}
              >
                <div className="text-4xl mb-2">{leaderboardData[1].avatar}</div>
                <Medal className="w-6 h-6 text-gray-600" />
              </motion.div>
              <h3 className="font-semibold font-poppins">{leaderboardData[1].name}</h3>
              <p className="text-sm text-muted-foreground">{leaderboardData[1].xp.toLocaleString()} XP</p>
            </div>

            {/* First Place */}
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`${getRankStyle(1)} p-6 rounded-lg mb-4 h-40 flex flex-col items-center justify-center`}
              >
                <div className="text-5xl mb-2">{leaderboardData[0].avatar}</div>
                <Crown className="w-8 h-8 text-yellow-600" />
              </motion.div>
              <h3 className="font-bold font-poppins text-lg">{leaderboardData[0].name}</h3>
              <p className="text-sm text-quest-gold font-semibold">{leaderboardData[0].title}</p>
              <p className="text-sm text-muted-foreground">{leaderboardData[0].xp.toLocaleString()} XP</p>
            </div>

            {/* Third Place */}
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`${getRankStyle(3)} p-6 rounded-lg mb-4 h-28 flex flex-col items-center justify-center`}
              >
                <div className="text-3xl mb-2">{leaderboardData[2].avatar}</div>
                <Medal className="w-5 h-5 text-amber-700" />
              </motion.div>
              <h3 className="font-semibold font-poppins">{leaderboardData[2].name}</h3>
              <p className="text-sm text-muted-foreground">{leaderboardData[2].xp.toLocaleString()} XP</p>
            </div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          {leaderboardData.map((player, index) => (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="adventure-card"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getRankIcon(player.rank)}
                    <span className="font-bold text-lg font-pixel">
                      #{player.rank}
                    </span>
                  </div>
                  
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="text-2xl">
                      {player.avatar}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h3 className="font-semibold font-poppins">
                      {player.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {player.title}
                    </p>
                  </div>
                </div>
                
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-quest-gold" />
                    <span className="font-bold text-lg">
                      {player.xp.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">XP</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Trophy className="w-3 h-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {player.badges} badges
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Your Rank */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-quest-gold/10 border border-primary/20 rounded-lg"
        >
          <div className="text-center">
            <h3 className="font-semibold font-poppins mb-2">Your Current Rank</h3>
            <div className="flex items-center justify-center space-x-4">
              <div className="text-2xl">🧙‍♀️</div>
              <div>
                <p className="font-bold text-lg">#47</p>
                <p className="text-sm text-muted-foreground">1,250 XP</p>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default Leaderboard;