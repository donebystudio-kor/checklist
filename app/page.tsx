import { categories, checklists, getCategoryBySlug, getChecklistsByCategory, getTotalItems } from "@/data/checklists";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  const totalChecklists = checklists.length;
  const totalItems = checklists.reduce((sum, cl) => sum + getTotalItems(cl), 0);

  const popular = [
    "jjatu-start", "interview", "overseas-travel", "jeonse-contract",
    "wedding", "childbirth", "resignation", "laptop",
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Hero */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-slate-900 mb-3 tracking-tight">
          상황별 완벽 체크리스트
        </h1>
        <p className="text-lg text-slate-500 mb-8">
          자취·이사·취업·여행·결혼·출산 등 인생의 중요한 순간,<br className="hidden sm:block" />
          빠트리지 말아야 할 것들을 한곳에서 확인하세요.
        </p>
        <SearchBar />
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-slate-400">
          <span><strong className="text-slate-700">{categories.length}</strong>개 카테고리</span>
          <span className="text-slate-200">|</span>
          <span><strong className="text-slate-700">{totalChecklists}</strong>개 체크리스트</span>
          <span className="text-slate-200">|</span>
          <span><strong className="text-slate-700">{totalItems}+</strong>개 항목</span>
        </div>
      </section>

      {/* Categories */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">카테고리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const catChecklists = getChecklistsByCategory(cat.slug);
            return (
              <div
                key={cat.slug}
                className={`p-5 rounded-xl border ${cat.bgColor}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <h3 className={`font-bold text-lg ${cat.color}`}>{cat.name}</h3>
                    <p className="text-xs text-slate-500">{catChecklists.length}개 체크리스트</p>
                  </div>
                </div>
                <ul className="space-y-1">
                  {catChecklists.slice(0, 4).map((cl) => (
                    <li key={cl.slug}>
                      <a
                        href={`/checklist/${cl.slug}`}
                        className="text-xs text-slate-500 hover:text-blue-600 flex items-center gap-1.5 transition-colors"
                      >
                        <span className="text-slate-300">›</span>
                        {cl.title}
                      </a>
                    </li>
                  ))}
                  {catChecklists.length > 4 && (
                    <li className="text-xs text-slate-400">+ {catChecklists.length - 4}개 더</li>
                  )}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* Popular */}
      <section className="mb-14">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">인기 체크리스트</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popular.map((slug) => {
            const cl = checklists.find((c) => c.slug === slug);
            if (!cl) return null;
            const cat = getCategoryBySlug(cl.categorySlug);
            if (!cat) return null;
            const itemCount = getTotalItems(cl);
            return (
              <a
                key={slug}
                href={`/checklist/${slug}`}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{cl.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5 truncate">{cl.description.slice(0, 35)}...</div>
                </div>
                <span className="text-xs text-slate-300 bg-slate-100 rounded-full px-2 py-0.5 whitespace-nowrap">{itemCount}개</span>
              </a>
            );
          })}
        </div>
      </section>

      {/* All Checklists by Category */}
      {categories.map((cat) => {
        const catChecklists = getChecklistsByCategory(cat.slug);
        return (
          <section key={cat.slug} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{cat.icon}</span>
              <h2 className={`text-lg font-semibold ${cat.color}`}>{cat.name}</h2>
              <span className="text-xs text-slate-400">{catChecklists.length}개</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {catChecklists.map((cl) => {
                const itemCount = getTotalItems(cl);
                return (
                  <a
                    key={cl.slug}
                    href={`/checklist/${cl.slug}`}
                    className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-sm transition-all group"
                  >
                    <div className="font-medium text-slate-800 text-sm group-hover:text-blue-600 transition-colors mb-1">
                      {cl.title}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-2 mb-2">{cl.description}</div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>{cl.sections.length}개 섹션</span>
                      <span>·</span>
                      <span>{itemCount}개 항목</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </section>
        );
      })}

      {/* Feature description */}
      <section className="mt-14 bg-white border border-slate-200 rounded-2xl p-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">이런 기능을 제공해요</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex gap-3">
            <span className="text-2xl">✅</span>
            <div>
              <div className="font-medium text-slate-800 text-sm">직접 체크 가능</div>
              <div className="text-xs text-slate-500 mt-1">항목을 직접 체크하며 진행 상황을 확인하세요. 브라우저를 닫아도 저장됩니다.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📊</span>
            <div>
              <div className="font-medium text-slate-800 text-sm">진행률 표시</div>
              <div className="text-xs text-slate-500 mt-1">전체 항목 중 완료된 항목 수와 진행률을 실시간으로 확인할 수 있습니다.</div>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="text-2xl">📋</span>
            <div>
              <div className="font-medium text-slate-800 text-sm">섹션별 구성</div>
              <div className="text-xs text-slate-500 mt-1">시기별, 단계별로 나뉜 섹션 구조로 체계적으로 관리할 수 있습니다.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
