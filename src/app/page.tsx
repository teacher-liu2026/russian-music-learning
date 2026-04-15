"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { categories, vocabulary, getHighFrequency, type Category } from "@/data/vocabulary";

function getProgress() {
  if (typeof window === "undefined") return { studied: 0, seen: 0 };
  const seen = parseInt(localStorage.getItem("seen_vocab") || "0");
  const studied = parseInt(localStorage.getItem("studied_vocab") || "0");
  return { studied, seen };
}

export default function HomePage() {
  const [progress, setProgress] = useState({ studied: 0, seen: 0 });
  const [activeNav, setActiveNav] = useState("home");

  useEffect(() => {
    setProgress(getProgress());
    window.addEventListener("vocab-updated", () => setProgress(getProgress()));
    return () => window.removeEventListener("vocab-updated", () => setProgress(getProgress()));
  }, []);

  const highFreq = getHighFrequency();
  const totalVocab = vocabulary.length;

  const navItems = [
    { id: "home", label: "首页", href: "/" },
    { id: "flashcard", label: "学习", href: "/study" },
    { id: "quiz", label: "测验", href: "/quiz" },
  ];

  return (
    <>
      {/* Header */}
      <header className="app-header">
        <div className="header-inner">
          <div className="header-logo">
            <div className="logo-icon">🎹</div>
            <div className="logo-text">
              <h1>俄语音乐术语</h1>
              <span>RU &nbsp;·&nbsp; MUSIC &nbsp;·&nbsp; TERMS</span>
            </div>
          </div>
          <nav className="header-nav">
            {navItems.map((item) => (
              <Link key={item.id} href={item.href}>
                <button
                  className={`nav-btn${activeNav === item.id ? " active" : ""}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  {item.label}
                </button>
              </Link>
            ))}
          </nav>
        </div>
      </header>

      <main className="page-container">
        {/* Stats */}
        <div className="stats-bar">
          <div className="stat-card">
            <div className="stat-number">{totalVocab}</div>
            <div className="stat-label">词汇总量</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{highFreq.length}</div>
            <div className="stat-label">高频词汇 ⭐</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{progress.seen}</div>
            <div className="stat-label">已学习</div>
          </div>
        </div>

        {/* Quick actions */}
        <h2 className="section-title">快速开始</h2>
        <div className="quick-actions">
          <Link href="/study" className="quick-btn">
            <span className="quick-btn-icon">📇</span>
            <div className="quick-btn-title">闪卡记忆</div>
            <div className="quick-btn-desc">翻转卡片，边学边记</div>
          </Link>
          <Link href="/study?mode=listen" className="quick-btn">
            <span className="quick-btn-icon">🎧</span>
            <div className="quick-btn-title">听音辨词</div>
            <div className="quick-btn-desc">听发音，选出对应词汇</div>
          </Link>
          <Link href="/quiz" className="quick-btn">
            <span className="quick-btn-icon">🎯</span>
            <div className="quick-btn-title">小测检验</div>
            <div className="quick-btn-desc">选择题测试学习成果</div>
          </Link>
        </div>

        {/* High frequency vocab */}
        <h2 className="section-title">高频词汇 ⭐</h2>
        <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 16, marginTop: -8 }}>
          最常用的音乐术语，优先掌握
        </p>
        <div className="vocab-list">
          {highFreq.slice(0, 6).map((item, i) => (
            <Link key={item.id} href={`/study?category=${item.category}`} style={{ textDecoration: "none" }}>
              <div className="vocab-item" style={{ animationDelay: `${i * 0.06}s`, opacity: 0 }}>
                <div className="vocab-row">
                  <div className="vocab-info">
                    <div className="vocab-russian">{item.russian}</div>
                    <div className="vocab-ipa">{item.ipa}</div>
                    <div className="vocab-chinese">{item.chinese} {item.notes && <span className="vocab-notes">· {item.notes}</span>}</div>
                    <div className="vocab-frequency">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <span key={s} className={`freq-star${s <= (item.frequency || 3) ? " filled" : ""}`}>★</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="play-btn animate-float"
                    style={{ animationDelay: `${i * 0.3}s` }}
                    onClick={(e) => {
                      e.preventDefault();
                      const utt = new SpeechSynthesisUtterance(item.russian);
                      utt.lang = "ru-RU";
                      utt.rate = 0.75;
                      speechSynthesis.speak(utt);
                    }}
                  >
                    ▶
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All categories */}
        <h2 className="section-title">乐器分类</h2>
        <div className="category-grid">
          {categories.map((cat, i) => {
            const count = vocabulary.filter((v) => v.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                href={`/study?category=${cat.id}`}
                className="category-card"
                style={{ animationDelay: `${i * 0.05}s`, opacity: 0 }}
              >
                <span className="category-icon">{cat.icon}</span>
                <div className="category-name">{cat.name}</div>
                <div className="category-name-cn">{cat.nameCn}</div>
                <span className="category-count">{count} 词</span>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
