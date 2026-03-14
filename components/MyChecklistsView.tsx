"use client";

import { useEffect, useState } from "react";
import { checklists, getCategoryBySlug, getTotalItems } from "@/data/checklists";
import type { Checklist } from "@/data/checklists";

interface ChecklistProgress {
  checklist: Checklist;
  categoryName: string;
  categoryIcon: string;
  checkedCount: number;
  total: number;
  percent: number;
}

export default function MyChecklistsView() {
  const [progressList, setProgressList] = useState<ChecklistProgress[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const result: ChecklistProgress[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key?.startsWith("checklist_")) continue;

      const slug = key.slice("checklist_".length);
      const checklist = checklists.find((cl) => cl.slug === slug);
      if (!checklist) continue;

      const cat = getCategoryBySlug(checklist.categorySlug);
      if (!cat) continue;

      let checkedIds: string[] = [];
      try {
        checkedIds = JSON.parse(localStorage.getItem(key) || "[]");
      } catch {}

      if (checkedIds.length === 0) continue;

      const total = getTotalItems(checklist);
      const checkedCount = checkedIds.length;
      const percent = Math.round((checkedCount / total) * 100);

      result.push({
        checklist,
        categoryName: cat.name,
        categoryIcon: cat.icon,
        checkedCount,
        total,
        percent,
      });
    }

    result.sort((a, b) => b.percent - a.percent);
    setProgressList(result);
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4 mt-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 bg-slate-200 rounded-xl" />
        ))}
      </div>
    );
  }

  if (progressList.length === 0) {
    return (
      <div className="text-center py-20 text-slate-400">
        <div className="text-5xl mb-4">📋</div>
        <p className="text-base font-medium text-slate-500 mb-2">아직 체크한 항목이 없어요</p>
        <p className="text-sm mb-6">체크리스트를 열고 항목을 체크하면 여기에 기록됩니다.</p>
        <a
          href="/"
          className="inline-block bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:bg-blue-700 transition-colors"
        >
          체크리스트 보러 가기
        </a>
      </div>
    );
  }

  const completed = progressList.filter((p) => p.percent === 100);
  const inProgress = progressList.filter((p) => p.percent < 100);

  return (
    <div className="space-y-10">
      {inProgress.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-slate-700 mb-4">진행 중 ({inProgress.length})</h2>
          <div className="space-y-3">
            {inProgress.map(({ checklist, categoryName, categoryIcon, checkedCount, total, percent }) => (
              <a
                key={checklist.slug}
                href={`/checklist/${checklist.slug}`}
                className="block bg-white border border-slate-200 rounded-xl px-5 py-4 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{categoryIcon}</span>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">
                        {checklist.title}
                      </div>
                      <div className="text-xs text-slate-400">{categoryName}</div>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-blue-600">{percent}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-1.5">
                  <div
                    className="h-1.5 rounded-full bg-blue-500 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <div className="mt-1.5 text-xs text-slate-400">{checkedCount} / {total}개 완료</div>
              </a>
            ))}
          </div>
        </section>
      )}

      {completed.length > 0 && (
        <section>
          <h2 className="text-base font-semibold text-slate-700 mb-4">완료 ({completed.length})</h2>
          <div className="space-y-3">
            {completed.map(({ checklist, categoryName, categoryIcon, total }) => (
              <a
                key={checklist.slug}
                href={`/checklist/${checklist.slug}`}
                className="block bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4 hover:border-emerald-400 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{categoryIcon}</span>
                    <div>
                      <div className="font-semibold text-slate-800 text-sm group-hover:text-emerald-700 transition-colors">
                        {checklist.title}
                      </div>
                      <div className="text-xs text-slate-400">{categoryName}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-600 text-sm font-bold">100%</span>
                    <span className="text-emerald-500 text-lg">✓</span>
                  </div>
                </div>
                <div className="mt-1.5 text-xs text-emerald-600 font-medium">{total}개 항목 모두 완료</div>
              </a>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
