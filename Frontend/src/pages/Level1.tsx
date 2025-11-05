import { Header } from "@/components/Layout/Header"; 
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
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
  const [selected, setSelected] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const navigate = useNavigate();

  const handleAnswer = (option: string) => {
    if (selected) return; // prevent double click
    setSelected(option);

    const isCorrect = option === questions[current].answer;
    if (isCorrect) {
      setScore((prev) => prev + 25);
      setFeedback("✅ Correct! +25 XP");
    } else {
      setFeedback("❌ Incorrect. Try again!");
    }

    // wait 1.2 s, then move next or finish
    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected("");
        setFeedback("");
      } else {
        // ✅ all questions answered → finish
        setFinished(true);
        localStorage.setItem("level1Completed", "true");
        const currentXP = Number(localStorage.getItem("xp") || 0);
        localStorage.setItem("xp", String(currentXP + score + 25));
      }
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-100 dark:from-emerald-900/20 dark:via-blue-900/20 dark:to-purple-900/20">
      <Header />
      <main className="container py-10 text-center">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold font-pixel text-primary mb-4"
        >
          🌾 Beginner Village
        </motion.h1>

        {!started ? (
          <>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Learn <b>variables</b>, <b>data types</b>, and <b>simple I/O</b> in Java.
              Answer all 4 questions to earn XP and unlock Level 2!
            </p>
            <Button size="lg" className="btn-quest" onClick={() => setStarted(true)}>
              🚀 Start Challenge
            </Button>
          </>
        ) : !finished ? (
          /* Question view */
          <motion.div
            key={questions[current].id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-gray-900/30 p-6 rounded-xl shadow-lg max-w-md mx-auto"
          >
            <h2 className="text-xl font-semibold mb-4">{questions[current].text}</h2>
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
        ) : (
          /* Completion screen */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-white/90 dark:bg-gray-900/40 rounded-2xl shadow-lg max-w-lg mx-auto"
          >
            <h2 className="text-3xl font-bold text-green-600 mb-4">
              🎉 Level 1 Completed!
            </h2>
            <p className="text-lg mb-6">
              You earned <b>{score + 25} XP</b>.<br />
              Level 2 (OOP Forest) is now unlocked 🌲
            </p>
            <Button onClick={() => navigate("/map")}>🗺 Return to Map</Button>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Level1;
