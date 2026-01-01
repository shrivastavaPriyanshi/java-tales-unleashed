import { useEffect, useState } from "react";
import { Header } from "@/components/Layout/Header";
import { motion, AnimatePresence } from "framer-motion";

// 🎉 Floating animation for coins & badges
const FloatingEmoji = ({ emoji }: { emoji: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 50, x: Math.random() * 800 - 400, scale: 0 }}
    animate={{
      opacity: [1, 0.9, 0],
      y: [50, -300],
      x: Math.random() * 300 - 150,
      scale: [1, 1.3, 0.8],
    }}
    transition={{ duration: 2.5, ease: "easeOut" }}
    className="absolute text-4xl select-none pointer-events-none"
    style={{ left: "50%", top: "50%" }}
  >
    {emoji}
  </motion.div>
);

const ProgressMap = () => {
  const [xp, setXp] = useState(Number(localStorage.getItem("xp") || 0));
  const [reward, setReward] = useState<string | null>(null);
  const [emojis, setEmojis] = useState<{ id: number; emoji: string }[]>([]);
  const [stagesCompleted, setStagesCompleted] = useState(0);
  const [badges, setBadges] = useState(Math.floor(xp / 100));

  const stages = [
    { id: 1, name: "Beginner Village", icon: "🏘️", desc: "Java basics & syntax" },
    { id: 2, name: "OOP Forest", icon: "🌲", desc: "Object-oriented programming" },
    { id: 3, name: "Exception Desert", icon: "🏜️", desc: "Handle runtime errors" },
    { id: 4, name: "Collection Castle", icon: "🏰", desc: "Data structures mastery" },
    { id: 5, name: "Thread Jungle", icon: "🌴", desc: "Multithreading concepts" },
    { id: 6, name: "Stream Valley", icon: "🌊", desc: "Streams & lambdas" },
    { id: 7, name: "File Mountain", icon: "⛰️", desc: "File I/O mastery" },
    { id: 8, name: "Networking Harbor", icon: "⚓", desc: "Sockets & networking" },
    { id: 9, name: "JDBC Temple", icon: "🏛️", desc: "Database connectivity" },
    { id:10, name: "Final Boss Tower", icon: "🗼", desc: "Ultimate Java challenge" },
  ];

  // 🧮 Load everything when page opens
  useEffect(() => {
    const completed = stages.filter((_, i) =>
      localStorage.getItem(`level${i + 1}Completed`)
    ).length;

    setStagesCompleted(completed);

    const newXP = Number(localStorage.getItem("xp") || 0);
    setXp(newXP);
    setBadges(Math.floor(newXP / 100));

    const rewardMsg = localStorage.getItem("reward");
    if (rewardMsg) {
      setReward(rewardMsg);
      localStorage.removeItem("reward");
      spawnEmojis();
      setTimeout(() => setReward(null), 4000);
    }
  }, []);

  // 🎊 Floating reward effect
  const spawnEmojis = () => {
    const icons = ["💰", "🏅", "⭐", "✨"];
    icons.forEach((emoji, i) =>
      setTimeout(() => {
        setEmojis(prev => [...prev, { id: Date.now() + i, emoji }]);
        setTimeout(
          () => setEmojis(prev => prev.filter(e => e.id !== Date.now() + i)),
          2500
        );
      }, i * 200)
    );
  };

  // 🔘 Level navigation (NO refresh needed)
  const handleStageClick = (id: number) => {
    const unlocked = id <= stagesCompleted + 1;
    if (!unlocked) return alert("🔒 This stage is locked!");
    window.location.href = `/level${id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden relative">
      <Header />

      {/* 🧭 SCROLL MAP */}
      <div className="w-full overflow-x-auto overflow-y-hidden h-[80vh]">
        <motion.div
          className="relative h-[700px] w-[2800px] mx-auto mt-12 rounded-2xl border shadow-inner bg-gradient-to-r from-emerald-100 to-indigo-100"
        >
          {/* Path line */}
          <svg className="absolute top-0 left-0 w-full h-full z-0">
            <path
              d="M 50 600 Q 400 400, 800 600 T 2200 500"
              stroke="url(#grad)"
              strokeWidth="6"
              fill="transparent"
            />
            <defs>
              <linearGradient id="grad" x1="0%" x2="100%">
                <stop offset="0%" stopColor="gold" />
                <stop offset="100%" stopColor="orange" />
              </linearGradient>
            </defs>
          </svg>

          {/* LEVEL NODES */}
          {stages.map((stage, index) => {
            const x = 150 + index * 250;
            const y = index % 2 === 0 ? 400 : 250;

            const completed = localStorage.getItem(`level${stage.id}Completed`);
            const unlocked = stage.id <= stagesCompleted + 1;

            return (
              <motion.div
                key={stage.id}
                className={`absolute flex flex-col items-center ${
                  unlocked ? "cursor-pointer" : "opacity-60"
                }`}
                style={{ left: `${x}px`, top: `${y}px` }}
                whileHover={{ scale: unlocked ? 1.15 : 1 }}
                onClick={() => handleStageClick(stage.id)}
              >
                <div
                  className={`w-20 h-20 flex items-center justify-center rounded-full text-4xl shadow-lg border-4 ${
                    completed
                      ? "border-yellow-400 bg-gradient-to-br from-green-400 to-yellow-200"
                      : unlocked
                      ? "border-blue-400 bg-white"
                      : "border-gray-400 bg-gray-200"
                  }`}
                >
                  {stage.icon}
                </div>

                <p className="mt-2 font-semibold text-sm">{stage.name}</p>
                <p className="text-xs text-gray-500 w-[140px]">{stage.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* STATS BAR */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-lg px-8 py-4 rounded-2xl shadow-lg flex gap-10"
      >
        <div className="text-center">
          <div className="text-2xl font-bold">{stagesCompleted}/10</div>
          <div className="text-sm text-gray-600">Stages Completed</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-500">{xp}</div>
          <div className="text-sm text-gray-600">Total XP</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-600">{badges}</div>
          <div className="text-sm text-gray-600">Badges Earned</div>
        </div>
      </motion.div>

      {/* REWARD POPUP */}
      <AnimatePresence>
        {reward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center"
          >
            <motion.h2
              initial={{ scale: 0.7 }}
              animate={{ scale: 1.1 }}
              className="text-5xl font-bold text-yellow-300 mb-4"
            >
              {reward}
            </motion.h2>
            <p className="text-white text-lg">
              🎉 Congratulations! Next stage unlocked!
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING EMOJIS */}
      {emojis.map(e => (
        <FloatingEmoji key={e.id} emoji={e.emoji} />
      ))}
    </div>
  );
};

export default ProgressMap;
