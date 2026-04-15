"use client";

import { useState, useEffect, useCallback, useRef, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import {
  vocabulary,
  categories,
  getVocabularyByCategory,
  type VocabularyItem,
  type Category,
} from "@/data/vocabulary";

function speakRussian(text: string) {
  window.speechSynthesis.cancel();
  const utt = new SpeechSynthesisUtterance(text);
  utt.lang = "ru-RU";
  utt.rate = 0.72;
  utt.pitch = 0.95;
  speechSynthesis.speak(utt);
}

function StudyContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryId = searchParams.get("category");

  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedSet, setStudiedSet] = useState<Set<string>>(new Set());
  const [seenSet, setSeenSet] = useState<Set<string>>(new Set());
  const playedRef = useRef(false);

  useEffect(() => {
    if (categoryId) {
      const cat = categories.find((c) => c.id === categoryId);
      setActiveCategory(cat || null);
      setVocabList(getVocabularyByCategory(categoryId));
    } else {
      setVocabList([...vocabulary]);
    }
    const seen = new Set(
      (localStorage.getItem("seen_vocab_ids") || "").split(",").filter(Boolean)
    );
    setSeenSet(seen);
    const studied = new Set(
      (localStorage.getItem("studied_vocab_ids") || "").split(",").filter(Boolean)
    );
    setStudiedSet(studied);
  }, [categoryId]);

  const current = vocabList[currentIndex];
  const total = vocabList.length;

  useEffect(() => {
    if (current && !playedRef.current) {
      const timer = setTimeout(() => speakRussian(current.russian), 400);
      return () => clearTimeout(timer);
    }
    playedRef.current = false;
  }, [current?.id]);

  const markStudied = useCallback(
    (result: "again" | "hard" | "good") => {
      if (!current) return;
      const newSeen = new Set(seenSet);
      newSeen.add(current.id);
      setSeenSet(newSeen);
      localStorage.setItem("seen_vocab_ids", [...newSeen].join(","));
      localStorage.setItem("seen_vocab", String(newSeen.size));
      if (result !== "again") {
        const newStudied = new Set(studiedSet);
        newStudied.add(current.id);
        setStudiedSet(newStudied);
        localStorage.setItem("studied_vocab_ids", [...newStudied].join(","));
        localStorage.setItem("studied_vocab", String(newStudied.size));
      }
      setIsFlipped(false);
      playedRef.current = true;
      setTimeout(() => {
        setCurrentIndex((i) => (i < total - 1 ? i + 1 : 0));
      }, 300);
      window.dispatchEvent(new Event("vocab-updated"));
    },
    [current, currentIndex, total, seenSet, studiedSet]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        setIsFlipped((f) => !f);
      }
      if (isFlipped) {
        if (e.key === "1") markStudied("again");
        if (e.key === "2") markStudied("hard");
        if (e.key === "3") markStudied("good");
      }
    },
    [isFlipped, markStudied]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!current) {
    return (
      <div className="empty-state">
        <span className="empty-state-icon">📭</span>
        <h3>暂无词汇</h3>
        <p>该分类下还没有词汇内容</p>
      </div>
    );
  }

  const progress = total > 0 ? ((currentIndex + 1) / total) * 100 : 0;

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Link href="/"><button className="back-btn">← 返回</button></Link>
        <div className="progress-badge">{studiedSet.size} / {seenSet.size} 已掌握</div>
      </div>

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
        <button className={`nav-btn${!categoryId ? " active" : ""}`} onClick={() => router.push("/study")}>
          全部 ({vocabulary.length})
        </button>
        {categories.map((cat) => {
          const count = getVocabularyByCategory(cat.id).length;
          return (
            <button
              key={cat.id}
              className={`nav-btn${categoryId === cat.id ? " active" : ""}`}
              onClick={() => router.push(`/study?category=${cat.id}`)}
              style={{ fontSize: 12 }}
            >
              {cat.icon} {count}
            </button>
          );
        })}
      </div>

      <div className="fc-counter">
        第 {currentIndex + 1} / {total} 张{activeCategory && ` · ${activeCategory.nameCn}`}
      </div>
      <div className="fc-progress">
        <div className="fc-progress-fill" style={{ width: `${progress}%` }} />
      </div>

      <div className="flashcard-container">
        <div className={`flashcard${isFlipped ? " flipped" : ""}`} onClick={() => setIsFlipped(!isFlipped)}>
          <div className="flashcard-inner">
            <div className="flashcard-front">
              <div className="fc-category">
                {activeCategory ? `${activeCategory.icon} ${activeCategory.nameCn}` : current.subcategory}
              </div>
              <div className="fc-russian">{current.russian}</div>
              <div className="fc-ipa">{current.ipa}</div>
              <div className="fc-hint"><span>👆 点击翻转查看答案</span></div>
            </div>
            <div className="flashcard-back">
              <div className="fc-chinese">{current.chinese}</div>
              {current.notes && <div className="fc-notes">{current.notes}</div>}
              {current.frequency && (
                <div className="fc-frequency vocab-frequency">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <span key={s} className={`freq-star${s <= current.frequency! ? " filled" : ""}`}>★</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="fc-actions">
          <button
            className="fc-action-btn play-large"
            onClick={(e) => { e.stopPropagation(); speakRussian(current.russian); }}
          >
            🔊 再听一遍
          </button>
        </div>

        <div className="fc-actions" style={{ marginTop: 8 }}>
          <button className="fc-action-btn again" onClick={() => markStudied("again")}>😣 再复习</button>
          <button className="fc-action-btn hard" onClick={() => markStudied("hard")}>🤔 有印象</button>
          <button className="fc-action-btn good" onClick={() => markStudied("good")}>✅ 记住了</button>
        </div>

        <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 8 }}>
          空格/回车翻转 · 1/2/3 评分
        </div>
      </div>
    </>
  );
}

export default function StudyPage() {
  return (
    <>
      <header className="app-header">
        <div className="header-inner" style={{ flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
          <div className="header-logo">
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div className="logo-icon">🎹</div>
              <div className="logo-text">
                <h1 style={{ fontSize: 18 }}>俄语音乐术语</h1>
                <span style={{ fontSize: 11 }}>闪卡学习</span>
              </div>
            </Link>
          </div>
        </div>
      </header>
      <main className="page-container" style={{ paddingTop: 20 }}>
        <Suspense fallback={<div className="loading-container"><div className="spinner" /></div>}>
          <StudyContent />
        </Suspense>
      </main>
    </>
  );
}
