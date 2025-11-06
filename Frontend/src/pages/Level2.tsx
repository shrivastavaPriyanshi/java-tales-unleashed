import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// 🌲 Questions for OOP Forest
const questions = [
  {
    id: 1,
    text: "Which keyword is used to create a class in Java?",
    options: ["class", "Class", "define", "struct"],
    answer: "class",
  },
  {
    id: 2,
    text: "In Java, what is the correct way to create an object of a class named Car?",
    options: [
      "Car myCar = Car();",
      "Car myCar = new Car();",
      "new Car = myCar();",
      "create Car myCar();",
    ],
    answer: "Car myCar = new Car();",
  },
  {
    id: 3,
    text: "What is encapsulation in OOP?",
    options: [
      "Hiding internal data and showing only necessary features",
      "Using multiple classes",
      "Deriving one class from another",
      "Overriding methods",
    ],
    answer: "Hiding internal data and showing only necessary features",
  },
  {
    id: 4,
    text: "Which OOP concept allows one class to inherit properties of another?",
    options: ["Polymorphism", "Encapsulation", "Inheritance", "Abstraction"],
    answer: "Inheritance",
  },
];

const Level2 = () => {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [passed, setPassed] = useState(false);
  const [avatarX, setAvatarX] = useState(0); // 🧍 Avatar position
  const [emojis, setEmojis] = useState<{ id: number; emoji: string }[]>([]);
  const navigate = useNavigate();

  // 🌟 Floating emoji celebration
  const spawnEmojis = () => {
    const icons = ["✨", "🏆", "🌟", "💚"];
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
      setAvatarX((prev) => prev + 200); // move avatar
    } else {
      setFeedback("❌ Wrong! Try again.");
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected("");
        setFeedback("");
      } else {
        setFinished(true);
        if (score + (isCorrect ? 25 : 0) === 100) {
          setPassed(true);
          localStorage.setItem("level2Completed", "true");
          localStorage.setItem("reward", "+150 XP Earned!");
          const xp = Number(localStorage.getItem("xp") || 0);
          localStorage.setItem("xp", String(xp + 100));
          spawnEmojis();
        } else {
          setPassed(false);
        }
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
      <Header />

      {/* 🌲 Animated Forest Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[200%] h-full bg-[url('/forest-bg.png')] bg-repeat-x bg-cover opacity-60"
          animate={{ x: [-100, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
      </div>

      {/* 🧍 Moving Avatar */}
      {started && !finished && (
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: avatarX }}
          transition={{ type: "spring", stiffness: 60 }}
          className="absolute bottom-16 left-16 text-5xl"
        >
          🧙‍♂️
        </motion.div>
      )}

      <main className="relative container py-10 text-center z-10">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold font-pixel text-green-700 mb-4"
        >
          🌲 OOP Forest
        </motion.h1>

        {!started ? (
          <>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Welcome to <b>OOP Forest</b>!  
              Learn <b>Encapsulation, Inheritance,</b> and <b>Classes</b> by answering all 4 questions correctly 🌿.
            </p>
            <Button size="lg" className="btn-quest" onClick={() => setStarted(true)}>
              🌟 Enter the Forest
            </Button>
          </>
        ) : !finished ? (
          // 🧩 Question Bubbles
          <motion.div
            key={questions[current].id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-900/30 p-6 rounded-xl shadow-lg max-w-md mx-auto border border-green-300"
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
          // 🏆 Victory Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/90 dark:bg-gray-900/40 rounded-2xl shadow-lg max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-green-600 mb-4">🎉 Forest Conquered!</h2>
            <p className="text-lg mb-6">
              You helped your avatar pass through the forest! 🌲  
              +100 XP earned — Level 3 (Exception Desert) unlocked 🏜️
            </p>
            <Button onClick={() => navigate("/map")}>🗺 Return to Map</Button>
          </motion.div>
        ) : (
          // ❌ Retry Screen
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/90 dark:bg-gray-900/40 rounded-2xl shadow-lg max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-red-600 mb-4">❌ Lost in the Forest!</h2>
            <p className="text-lg mb-6">
              You scored <b>{score}/100</b>.  
              To reach the next area, answer all correctly 🌿
            </p>
            <Button onClick={() => window.location.reload()}>🔁 Retry Level</Button>
          </motion.div>
        )}
      </main>

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

export default Level2;
