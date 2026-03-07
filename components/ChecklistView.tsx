"use client";

import { useState, useEffect } from "react";
import type { Checklist } from "@/data/checklists";

interface Props {
  checklist: Checklist;
  categoryName: string;
  categoryIcon: string;
  categorySlug: string;
}

export default function ChecklistView({ checklist, categoryName, categoryIcon, categorySlug }: Props) {
  const storageKey = `checklist_${checklist.categorySlug}_${checklist.slug}`;
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [hideCompleted, setHideCompleted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        setChecked(new Set(JSON.parse(stored)));
      }
    } catch {}
    setMounted(true);
  }, [storageKey]);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]));
      } catch {}
      return next;
    });
  }

  function reset() {
    if (!confirm("진행 상황을 모두 초기화할까요?")) return;
    setChecked(new Set());
    try {
      localStorage.removeItem(storageKey);
    } catch {}
  }

  const total = checklist.items.length;
  const done = checked.size;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  const visibleItems = hideCompleted
    ? checklist.items.filter((item) => !checked.has(item.id))
    : checklist.items;

  if (!mounted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-slate-200 rounded w-1/3"></div>
          <div className="h-10 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-12 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-400 mb-6">
        <a href="/" className="hover:text-slate-700 transition-colors">홈</a>
        <span className="mx-2">›</span>
        <a href={`/${categorySlug}`} className="hover:text-slate-700 transition-colors">{categoryName}</a>
        <span className="mx-2">›</span>
        <span className="text-slate-700">{checklist.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{categoryIcon}</span>
          <h1 className="text-2xl font-bold text-slate-900">{checklist.title}</h1>
        </div>
        <p className="text-sm text-slate-500">{checklist.description}</p>
      </div>

      {/* Progress */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="text-sm font-medium text-slate-700">
            진행률
            <span className="ml-2 text-slate-400 font-normal">{done} / {total}개 완료</span>
          </div>
          <span className={`text-lg font-bold ${percent === 100 ? "text-emerald-600" : "text-blue-600"}`}>
            {percent}%
          </span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ${
              percent === 100 ? "bg-emerald-500" : "bg-blue-500"
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
        {percent === 100 && (
          <div className="mt-3 text-sm text-emerald-600 font-medium text-center">
            🎉 모든 항목을 완료했습니다!
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4">
        <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
          <div
            onClick={() => setHideCompleted((v) => !v)}
            className={`w-10 h-5 rounded-full relative transition-colors cursor-pointer ${
              hideCompleted ? "bg-blue-500" : "bg-slate-200"
            }`}
          >
            <span
              className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                hideCompleted ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
          완료 항목 숨기기
        </label>
        <button
          onClick={reset}
          className="text-xs text-slate-400 hover:text-red-500 transition-colors"
        >
          초기화
        </button>
      </div>

      {/* Items */}
      <div className="space-y-2">
        {visibleItems.map((item) => {
          const isDone = checked.has(item.id);
          return (
            <label
              key={item.id}
              className={`flex items-start gap-3 bg-white border rounded-xl px-4 py-3.5 cursor-pointer transition-all hover:border-blue-200 ${
                isDone ? "border-slate-100 opacity-60" : "border-slate-200"
              }`}
            >
              <div className="mt-0.5 shrink-0">
                <div
                  onClick={() => toggle(item.id)}
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    isDone
                      ? "bg-blue-500 border-blue-500"
                      : "border-slate-300 hover:border-blue-400"
                  }`}
                >
                  {isDone && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 12 10" fill="none">
                      <path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0" onClick={() => toggle(item.id)}>
                <span className={`text-sm font-medium ${isDone ? "line-through text-slate-400" : "text-slate-800"}`}>
                  {item.text}
                </span>
                {item.note && (
                  <p className="text-xs text-slate-400 mt-0.5">{item.note}</p>
                )}
              </div>
            </label>
          );
        })}
        {visibleItems.length === 0 && hideCompleted && (
          <div className="text-center py-10 text-slate-400 text-sm">
            <div className="text-3xl mb-2">🎉</div>
            모든 항목을 완료했습니다!
          </div>
        )}
      </div>
    </div>
  );
}
