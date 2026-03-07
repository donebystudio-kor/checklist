"use client";

import { useState, useEffect, useRef } from "react";
import { searchChecklists, type Checklist } from "@/data/checklists";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Checklist[]>([]);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.trim().length < 1) {
      setResults([]);
      setOpen(false);
      return;
    }
    const found = searchChecklists(query);
    setResults(found);
    setOpen(true);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">🔍</span>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="체크리스트 검색 (예: 이사, 면접, 캠핑...)"
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        />
        {query && (
          <button
            onClick={() => { setQuery(""); setOpen(false); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-50 overflow-hidden">
          {results.slice(0, 8).map((cl) => (
            <a
              key={`${cl.categorySlug}-${cl.slug}`}
              href={`/${cl.categorySlug}/${cl.slug}`}
              className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
              onClick={() => setOpen(false)}
            >
              <span className="text-blue-600 font-bold mt-0.5">✓</span>
              <div>
                <div className="font-medium text-slate-900 text-sm">{cl.title}</div>
                <div className="text-xs text-slate-400 mt-0.5">{cl.description.slice(0, 40)}...</div>
              </div>
            </a>
          ))}
          {results.length === 0 && (
            <div className="px-4 py-4 text-sm text-slate-400 text-center">검색 결과가 없습니다.</div>
          )}
        </div>
      )}
      {open && results.length === 0 && query.trim().length > 0 && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-lg z-50">
          <div className="px-4 py-4 text-sm text-slate-400 text-center">
            &ldquo;{query}&rdquo;에 대한 검색 결과가 없습니다.
          </div>
        </div>
      )}
    </div>
  );
}
