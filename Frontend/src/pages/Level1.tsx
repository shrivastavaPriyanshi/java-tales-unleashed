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
  },
  {
    id: 2,
    text: "What is the default value of an uninitialized boolean variable in Java?",
    options: ["true", "false", "0", "null"],
    answer: "false",
  },
  {
    id: 3,
    text: "Which of these is NOT a primitive data type in Java?",
    options: ["int", "char", "String", "boolean"],
    answer: "String",
  },
  {
    id: 4,
    text: "Which method is used to take input from the user in Java?",
    options: ["input()", "read()", "Scanner.nextLine()", "System.readInput()"],
    answer: "Scanner.nextLine()",
  },
];

const Level1 = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [avatarX, setAvatarX] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (option: string) => {
    const correct = option === questions[current].answer;

    if (correct) {
      setFeedback("✅ Correct! Moving to next door...");
      setAvatarX((prev) => prev + 25); // move avatar to next door
      setTimeout(() => {
        if (current + 1 < questions.length) {
          setCurrent((prev) => prev + 1);
          setFeedback("");
        } else {
          // level complete
          localStorage.setItem("level1Completed", "true");
          const xp = Number(localStorage.getItem("xp") || 0);
          localStorage.setItem("xp", String(xp + 100));
          localStorage.setItem("reward", "🎉 Beginner Village Cleared!");
          setCompleted(true);
        }
      }, 1500);
    } else {
      setFeedback("❌ Wrong! Try again, traveler!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-emerald-50 to-yellow-100 dark:from-sky-950/50 dark:to-emerald-900/30 relative overflow-hidden">
      <Header />

      <main className="container py-8 text-center relative">
        <h1 className="text-4xl font-bold font-pixel text-primary mb-6">
          🏘️ Beginner Village
        </h1>

        {!started ? (
          <>
            <p className="text-lg mb-6 text-muted-foreground font-poppins">
              Help our hero 👧 cross the Java Village by answering questions!  
              Each correct answer opens the next door 🚪
            </p>
            <Button size="lg" onClick={() => setStarted(true)} className="btn-quest">
              🎮 Start Adventure
            </Button>
          </>
        ) : (
          <>
            {/* GROUND + DOORS */}
            <div className="relative h-[250px] mt-8 bg-gradient-to-t from-green-300 to-transparent rounded-xl">
              {/* Doors */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className={`absolute bottom-0 bg-yellow-400 border-4 border-yellow-600 rounded-md w-20 h-60 flex items-center justify-center text-3xl ${
                    i <= current ? "opacity-100" : "opacity-40"
                  }`}
                  style={{ left: `${20 + i * 20}%` }}
                  animate={{
                    scale: i === current ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ duration: 1, repeat: i === current ? Infinity : 0 }}
                >
                  🚪
                </motion.div>
              ))}

              {/* Avatar walking */}
              <motion.div
                className="absolute bottom-0 w-16 h-16 text-5xl"
                animate={{ x: `${avatarX}%` }}
                transition={{ type: "spring", stiffness: 80 }}
              >
                🧍‍♀️
              </motion.div>
            </div>

            {/* Comic-style Question Popup */}
            <motion.div
              key={questions[current].id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/90 dark:bg-gray-800/80 p-6 rounded-xl shadow-lg border-4 border-black mt-8 max-w-lg mx-auto relative"
            >
              <div className="absolute -top-4 left-6 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold">
                Door {current + 1}
              </div>
              <h2 className="text-xl font-semibold mb-4 font-poppins">
                {questions[current].text}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {questions[current].options.map((opt) => (
                  <Button
                    key={opt}
                    variant="outline"
                    onClick={() => handleAnswer(opt)}
                    className="w-full"
                  >
                    {opt}
                  </Button>
                ))}
              </div>

              {feedback && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 font-semibold"
                  style={{
                    color: feedback.includes("✅") ? "green" : "red",
                  }}
                >
                  {feedback}
                </motion.p>
              )}
            </motion.div>

            {/* Level Complete Popup */}
            <AnimatePresence>
              {completed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-[999]"
                >
                  <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 150 }}
                    className="bg-yellow-200/90 p-8 rounded-3xl text-center shadow-2xl border-4 border-yellow-500"
                  >
                    <h2 className="text-4xl font-bold mb-4">🎉 Mission Complete!</h2>
                    <p className="text-lg mb-4">
                      Thanks for helping me reach home 🏡  
                      You earned <b>100 XP</b>!
                    </p>
                    <Button onClick={() => navigate("/map")}>🏆 Return to Map</Button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}
      </main>
    </div>
  );
};

export default Level1;
