import { Header } from "@/components/Layout/Header";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🌲 OOP Forest Questions
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

  const [avatarX, setAvatarX] = useState(0);
  const [celebrate, setCelebrate] = useState(false);

  const navigate = useNavigate();

  const handleAnswer = (option: string) => {
    if (selected) return;

    setSelected(option);
    const isCorrect = option === questions[current].answer;

    if (isCorrect) {
      setScore((prev) => prev + 25);
      setFeedback("✨ Correct!");

      // move avatar
      setAvatarX((prev) => prev + 200);

      // celebration glow + confetti
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 1200);
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
          const xp = Number(localStorage.getItem("xp") || 0);
          localStorage.setItem("xp", String(xp + 100));
          localStorage.setItem("reward", "+150 XP Earned!");
        } else {
          setPassed(false);
        }
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100">
      <Header />

      {/* 🌲 animated forest bg */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-[200%] h-full bg-[url('/forest-bg.png')] bg-repeat-x bg-cover opacity-60"
          animate={{ x: [-100, 0] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
      </div>

      {/* 🧙 avatar */}
      {started && !finished && (
        <motion.div
          animate={{ x: avatarX }}
          transition={{ type: "spring", stiffness: 60 }}
          className="absolute bottom-6 left-12 text-7xl"
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
              Master <b>Classes</b>, <b>Objects</b> and <b>Encapsulation</b>.
              Answer everything correctly to unlock the next land 🌿
            </p>

            <Button size="lg" onClick={() => setStarted(true)}>
              🌟 Enter the Forest
            </Button>
          </>
        ) : !finished ? (
          <motion.div
            key={questions[current].id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 p-6 rounded-xl shadow-lg max-w-md mx-auto border border-green-300"
          >
            <div className="font-semibold mb-4">
              💬 {questions[current].text}
            </div>

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
              <p
                className="mt-4 font-medium"
                style={{ color: feedback.includes("✨") ? "green" : "red" }}
              >
                {feedback}
              </p>
            )}
          </motion.div>
        ) : passed ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/90 rounded-2xl shadow-lg max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              🎉 Forest Conquered!
            </h2>
            <p className="text-lg mb-6">
              +100 XP — Level 3 unlocked 🏜️
            </p>
            <Button onClick={() => navigate("/map")}>🗺 Return to Map</Button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/90 rounded-2xl shadow-lg max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-red-600 mb-4">
              ❌ Lost in the Forest
            </h2>
            <p className="text-lg mb-6">
              Score: {score}/100 — Try again 🌿
            </p>
            <Button onClick={() => window.location.reload()}>
              🔁 Retry Level
            </Button>
          </motion.div>
        )}
      </main>

      {/* 🎉 Celebration overlay */}
      <AnimatePresence>
        {celebrate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[999] pointer-events-none bg-white/30 backdrop-blur-[2px]"
          >
            {/* glow */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1.4, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 bg-gradient-to-br from-green-200/40 via-yellow-100/40 to-white/40"
            />

            {/* bomb */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 120 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl"
            >
              🎉
            </motion.div>

            {/* confetti */}
            {[...Array(14)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -50, x: Math.random() * window.innerWidth }}
                animate={{ y: window.innerHeight + 50 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="absolute text-3xl"
              >
                🎊
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Level2;
