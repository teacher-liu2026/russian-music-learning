"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { vocabulary, categories, type VocabularyItem } from "@/data/vocabulary";

const QUIZ_COUNT = 10;

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function pickWrongAnswers(correct: VocabularyItem, all: VocabularyItem[], count = 3): VocabularyItem[] {
  const candidates = all.filter((v) => v.id !== correct.id && v.category === correct.category);
  if (candidates.length < count) {
    const rest = all.filter((v) => v.id !== correct.id && v.category !== correct.category);
    return shuffle([...candidates, ...rest]).slice(0, count);
  }
  return shuffle(candidates).slice(0, count);
}

interface QuizItem {
  question: VocabularyItem;
  options: VocabularyItem[];
  answered: boolean;
  selected: number | null;
  correct: number;
}

function buildQuiz(): QuizItem[] {
  const pool = shuffle(vocabulary).slice(0, QUIZ_COUNT);
  return pool.map((q) => {
    const wrong = pickWrongAnswers(q, vocabulary, 3);
    const options = shuffle([q, ...wrong]);
    const correct = options.findIndex((o) => o.id === q.id);
    return { question: q, options, answered: false, selected: null, correct };
  });
}

function speakRussian(text: string) {
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "ru-RU";
  utt.rate = 0.72;
  speechSynthesis.speak(utt);
}

export default function QuizPage() {
  const [quiz, setQuiz] = useState<QuizItem[]>([]);
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    setQuiz(buildQuiz());
  }, []);

  const item = quiz[current];

  const handleSelect = useCallback(
    (idx: number) => {
      if (item?.answered) return;
      const isCorrect = idx === item.correct;
      setQuiz((prev) => {
        const updated = [...prev];
        updated[current] = { ...updated[current], answered: true, selected: idx };
        return updated;
      });
      if (isCorrect) setScore((s) => s + 1);
      setTimeout(() => {
        if (current < quiz.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          setFinished(true);
        }
      }, 1200);
    },
    [item, current, quiz.length]
  );

  const handleRestart = () => {
    setQuiz(buildQuiz());
    setCurrent(0);
    setFinished(false);
    setScore(0);
  };

  if (quiz.length === 0) {
    return (
      <>
        <header className="app-header">
          <div className="header-inner">
            <Link href="/">
              <button className="back-btn">← 返回</button>
            </Link>
          </div>
        </header>
        <main className="quiz-container">
          <div className="loading-container"><div className="spinner" /></div>
        </main>
      </>
    );
  }

  if (finished) {
    const percentage = Math.round((score / QUIZ_COUNT) * 100);
    return (
      <>
        <header className="app-header">
          <div className="header-inner">
            <Link href="/"><button className="back-btn">← 返回</button></Link>
          </div>
        </header>
        <main className="quiz-container">
          <div className="quiz-result">
            <div className="quiz-score">{percentage}%</div>
            <div className="quiz-score-label">
              {score} / {QUIZ_COUNT} 题正确
            </div>
            <div style={{ fontSize: 40, marginBottom: 16 }}>
              {percentage >= 80 ? "🎉" : percentage >= 60 ? "👍" : "💪"}
            </div>
            <div style={{ color: "var(--text-secondary)", marginBottom: 8, fontSize: 15 }}>
              {percentage >= 80
                ? "太棒了！俄语术语掌握得很好！"
                : percentage >= 60
                ? "不错！继续加油，再来一次？"
                : "别气馁！多复习几遍闪卡再试试！"}
            </div>
            <button className="quiz-restart-btn" onClick={handleRestart}>
              🔄 再来一轮
            </button>
          </div>
        </main>
      </>
    );
  }

  const progress = ((current + 1) / QUIZ_COUNT) * 100;

  return (
    <>
      <header className="app-header">
        <div className="header-inner">
          <Link href="/"><button className="back-btn">← 返回</button></Link>
          <div style={{ fontSize: 14, color: "var(--text-secondary)" }}>
            {current + 1} / {QUIZ_COUNT}
          </div>
        </div>
      </header>

      <main className="quiz-container">
        <div className="quiz-progress">
          <div className="quiz-progress-bar">
            <div className="quiz-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="quiz-question-card" key={current}>
          <div className="quiz-prompt">听发音，选择对应的中文含义</div>
          <div className="quiz-russian">{item.question.russian}</div>
          <div className="quiz-ipa">{item.question.ipa}</div>
          <button
            style={{
              marginTop: 12,
              background: "rgba(var(--accent-rgb), 0.1)",
              border: "1px solid rgba(var(--accent-rgb), 0.3)",
              borderRadius: 8,
              padding: "6px 16px",
              color: "var(--accent)",
              fontSize: 14,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
            onClick={() => speakRussian(item.question.russian)}
          >
            🔊 听发音
          </button>
        </div>

        <div className="quiz-options">
          {item.options.map((opt, idx) => {
            let cls = "quiz-option";
            if (item.answered) {
              if (idx === item.correct) cls += " correct";
              else if (idx === item.selected) cls += " wrong";
            }
            return (
              <button
                key={idx}
                className={cls}
                onClick={() => handleSelect(idx)}
                disabled={item.answered}
                style={{ animationDelay: `${idx * 0.08}s`, opacity: 0 }}
              >
                <span style={{ marginRight: 10, opacity: 0.6 }}>{["A", "B", "C", "D"][idx]}.</span>
                {opt.chinese}
              </button>
            );
          })}
        </div>
      </main>
    </>
  );
}
