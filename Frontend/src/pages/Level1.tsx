import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Layout/Header";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "Which of the following correctly declares an integer variable in Java?",
    options: ["num = 5;", "int num = 5;", "integer num = 5;", "var num = 5;"],
    answer: "int num = 5;",
    reward: "💎 Magic Crystal",
  },
  {
    id: 2,
    text: "What is the default value of an uninitialized boolean variable in Java?",
    options: ["true", "false", "0", "null"],
    answer: "false",
    reward: "🪙 Gold Coin",
  },
  {
    id: 3,
    text: "Which of these is NOT a primitive data type in Java?",
    options: ["int", "char", "String", "boolean"],
    answer: "String",
    reward: "⭐ Power Star",
  },
  {
    id: 4,
    text: "Which method is used to take input from the user in Java?",
    options: ["input()", "read()", "Scanner.nextLine()", "System.readInput()"],
    answer: "Scanner.nextLine()",
    reward: "🏆 Hero Badge",
  },
];

export default function Level1() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);

  const [avatarX, setAvatarX] = useState(0);
  const [status, setStatus] =
    useState<"idle" | "walking" | "happy" | "sad">("idle");

  const [doorsOpen, setDoorsOpen] = useState<boolean[]>([
    false,
    false,
    false,
    false,
  ]);

  const [feedback, setFeedback] = useState("");
  const [reward, setReward] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  const handleAnswer = (option: string) => {
    if (status === "walking") return;

    const correct = option === questions[current].answer;

    // walk first
    setStatus("walking");
    const targetX = 20 + current * 20;
    setAvatarX(targetX);

    setTimeout(() => {
      if (correct) {
        setStatus("happy");
        setFeedback("✅ Correct!");

        const updated = [...doorsOpen];
        updated[current] = true;
        setDoorsOpen(updated);

        setReward(questions[current].reward);

        setTimeout(() => {
          setReward(null);

          if (current + 1 < questions.length) {
            setCurrent((p) => p + 1);
            setStatus("idle");
            setFeedback("");
          } else {
            localStorage.setItem("level1Completed", "true");
            const xp = Number(localStorage.getItem("xp") || 0);
            localStorage.setItem("xp", String(xp + 100));
            localStorage.setItem("reward", "🎉 Beginner Village Cleared!");
            setCompleted(true);
          }
        }, 1200);
      } else {
        setStatus("sad");
        setFeedback("❌ Wrong — try again!");
        setTimeout(() => setStatus("idle"), 1200);
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-sky-200 via-emerald-100 to-yellow-100">
      <Header />

      {/* animated background tint */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-200/30 to-purple-200/30"
        animate={{ opacity: [0.8, 1, 0.9] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-white/70"
          initial={{
            y: Math.random() * 400,
            x: Math.random() * window.innerWidth,
          }}
          animate={{ y: -50 }}
          transition={{ duration: 10 + Math.random() * 5, repeat: Infinity }}
        />
      ))}

      <main className="container py-10 text-center relative">

        {/* ===================== INTRO SCREEN ===================== */}
        {!started && (
          <div className="flex flex-col items-center justify-center mt-10">

            <motion.h1
              initial={{ opacity: 0, y: -25, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-pixel text-primary mb-4 drop-shadow-xl"
            >
              🏘️ Beginner Village
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-gray-700 max-w-3xl mx-auto mb-10"
            >
              Help our hero travel across the village — unlock doors,
              collect rewards and learn Java step-by-step ⚔️
            </motion.p>

            <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="px-10 py-6 text-lg font-pixel relative overflow-hidden"
                onClick={() => setStarted(true)}
              >
                🎮 Start Adventure
                <span className="absolute inset-0 bg-white/20 translate-x-[-120%] hover:translate-x-[120%] transition-all duration-700" />
              </Button>
            </motion.div>
          </div>
        )}

        {/* ===================== GAME SCREEN ===================== */}
        {started && (
          <>
            <div className="relative h-[260px] mt-10 rounded-xl bg-gradient-to-t from-green-300 to-transparent">

              {/* Doors */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={`absolute bottom-0 w-20 h-56 border-4 rounded-md flex items-center justify-center text-3xl ${
                    doorsOpen[i]
                      ? "bg-yellow-200 border-yellow-500"
                      : "bg-yellow-400 border-yellow-700"
                  }`}
                  style={{ left: `${20 + i * 20}%` }}
                  animate={
                    !doorsOpen[i] && i === current
                      ? {
                          boxShadow: [
                            "0 0 0px gold",
                            "0 0 18px gold",
                            "0 0 0px gold",
                          ],
                        }
                      : {}
                  }
                  transition={{ duration: 1.2, repeat: Infinity }}
                >
                  {doorsOpen[i] ? "🚪✨" : "🚪"}
                </motion.div>
              ))}

              {/* Character (left animation) */}
              <motion.div
                className="absolute bottom-0 text-5xl"
                animate={{ left: `${avatarX}%` }}
                transition={{ type: "spring", stiffness: 60, damping: 12 }}
              >
                {status === "happy"
                  ? "😄"
                  : status === "sad"
                  ? "😢"
                  : status === "walking"
                  ? "🚶‍♀️"
                  : "🧍‍♀️"}
              </motion.div>
            </div>

            {/* Question Panel */}
            <motion.div
              key={questions[current].id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/90 p-6 rounded-xl shadow-lg mt-8 max-w-lg mx-auto"
            >
              <h2 className="mb-4 font-semibold">{questions[current].text}</h2>

              {questions[current].options.map((opt) => (
                <Button
                  key={opt}
                  disabled={status === "walking"}
                  onClick={() => handleAnswer(opt)}
                  className="w-full mb-2"
                  variant="outline"
                >
                  {opt}
                </Button>
              ))}

              {feedback && (
                <p className="mt-3 font-semibold">{feedback}</p>
              )}
            </motion.div>

            {/* Reward popup */}
            <AnimatePresence>
              {reward && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-white/90 px-6 py-3 rounded-xl shadow-lg border"
                >
                  🎁 Reward unlocked — {reward}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Level complete popup */}
            <AnimatePresence>
              {completed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/70 flex items-center justify-center"
                >
                  <div className="bg-yellow-200 p-8 rounded-2xl text-center">
                    🎉 Level Complete — 100 XP earned!
                    <div className="mt-4">
                      <Button onClick={() => navigate("/map")}>
                        Return to Map
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </main>
    </div>
  );
}
