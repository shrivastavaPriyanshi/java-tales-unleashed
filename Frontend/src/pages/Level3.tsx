import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🏜️ Exception Handling Questions
const questions = [
  {
    id: 1,
    text: "What happens when an exception is not handled in Java?",
    options: [
      "The program crashes with an error message",
      "It automatically retries the code",
      "It ignores the exception",
      "It continues running the next statement",
    ],
    answer: "The program crashes with an error message",
  },
  {
    id: 2,
    text: "Which block is always executed, whether exception occurs or not?",
    options: ["catch", "throw", "finally", "try"],
    answer: "finally",
  },
  {
    id: 3,
    text: "What type of exception is thrown when dividing a number by zero?",
    options: [
      "IOException",
      "ArithmeticException",
      "NullPointerException",
      "NumberFormatException",
    ],
    answer: "ArithmeticException",
  },
  {
    id: 4,
    text: "Which keyword is used to manually throw an exception?",
    options: ["throw", "throws", "catch", "error"],
    answer: "throw",
  },
];

const Level3 = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);
  const [avatarX, setAvatarX] = useState(0);
  const [emojis, setEmojis] = useState<{ id: number; emoji: string }[]>([]);
  const [reward, setReward] = useState(false);
  const navigate = useNavigate();

  // 🎉 Floating emoji effect
  const spawnEmojis = () => {
    const icons = ["🏜️", "💨", "🌟", "🏅"];
    icons.forEach((emoji, i) =>
      setTimeout(() => {
        setEmojis((prev) => [...prev, { id: Date.now() + i, emoji }]);
        setTimeout(() => setEmojis((prev) => prev.filter((e) => e.id !== Date.now() + i)), 2000);
      }, i * 200)
    );
  };

  const handleAnswer = (option: string) => {
    if (selected) return;
    setSelected(option);
    const isCorrect = option === questions[current].answer;

    if (isCorrect) {
      setScore((prev) => prev + 25);
      setFeedback("✅ Correct! +25 XP");
      setAvatarX((prev) => prev + 220);
    } else {
      setFeedback("❌ Incorrect! A sandstorm blocks your path.");
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected("");
        setFeedback("");
      } else {
        // End of quiz
        if (score + (isCorrect ? 25 : 0) === 100) {
          setPassed(true);
          localStorage.setItem("level3Completed", "true");
          localStorage.setItem("reward", "+100 XP Gained 🏅");
          const xp = Number(localStorage.getItem("xp") || 0);
          localStorage.setItem("xp", String(xp + 100));
          spawnEmojis();
          setReward(true);

          setTimeout(() => {
            setReward(false);
            navigate("/map");
          }, 4000);
        } else {
          setFinished(true);
        }
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-yellow-100 via-orange-50 to-amber-200">
      <Header />

      {/* 🏜️ Scrolling Desert Background */}
      <motion.div
        className="absolute w-[200%] h-full bg-[url('/desert-bg.png')] bg-repeat-x bg-cover opacity-70"
        animate={{ x: [-100, 0] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />

      {/* 🧕 Avatar walking animation */}
      {started && !finished && (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: avatarX }}
          transition={{ type: "spring", stiffness: 60 }}
          className="absolute bottom-14 left-12 text-6xl"
        >
          🧕
        </motion.div>
      )}

      <main className="relative container py-10 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold font-pixel text-amber-700 mb-4"
        >
          🏜️ Exception Desert
        </motion.h1>

        {!started ? (
          <>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Cross the <b>Exception Desert</b> by handling runtime errors correctly using{" "}
              <b>try-catch-finally</b> and <b>throw</b>!  
              Every correct answer moves you closer to the oasis 🌴.
            </p>
            <Button size="lg" className="btn-quest" onClick={() => setStarted(true)}>
              🌞 Start Your Journey
            </Button>
          </>
        ) : !finished ? (
          // 💬 Question Comic Bubble
          <motion.div
            key={questions[current].id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-900/30 p-6 rounded-xl shadow-lg max-w-md mx-auto border border-amber-400"
          >
            <motion.div
              className="text-md mb-4 font-semibold"
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              💬 {questions[current].text}
            </motion.div>

            <div className="space-y-3">
              {questions[current].options.map((opt) => (
                <Button
                  key={opt}
                  variant={selected === opt ? "default" : "outline"}
                  onClick={() => handleAnswer(opt)}
                  className="w-full"
                  disabled={!!selected}
                >
                  {opt}
                </Button>
              ))}
            </div>

            {feedback && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-md font-medium"
                style={{ color: feedback.includes("✅") ? "green" : "red" }}
              >
                {feedback}
              </motion.p>
            )}
          </motion.div>
        ) : passed ? (
          // 🌟 Victory popup
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/90 rounded-2xl shadow-lg max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-amber-600 mb-4">🎉 Desert Conquered!</h2>
            <p className="text-lg mb-6">
              You handled every exception perfectly 🏆  
              +100 XP earned! Level 4 (Collection Castle) unlocked 🏰
            </p>
            <Button onClick={() => navigate("/map")}>🏜️ Return to Map</Button>
          </motion.div>
        ) : (
          // ❌ Retry state
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/90 rounded-2xl shadow-lg max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-red-500 mb-4">💀 Lost in the Desert!</h2>
            <p className="text-lg mb-6">
              You scored <b>{score}/100</b>.  
              You need to handle all exceptions correctly to survive 🌵
            </p>
            <Button onClick={() => window.location.reload()}>🔁 Try Again</Button>
          </motion.div>
        )}
      </main>

      {/* 🎉 Reward Screen */}
      <AnimatePresence>
        {reward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 bg-black/70 flex flex-col items-center justify-center z-[9999]"
          >
            <motion.h2
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1.2, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 150 }}
              className="text-5xl font-bold text-yellow-300 mb-4"
            >
              🏜️ Sandstorm Victory!
            </motion.h2>
            <p className="text-white text-lg">+100 XP Earned 💨</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating emojis */}
      {emojis.map((e) => (
        <motion.div
          key={e.id}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: -200 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          className="absolute left-1/2 text-4xl"
        >
          {e.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default Level3;
