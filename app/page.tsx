import { categories, recentChecklists, getChecklistBySlug, getCategoryBySlug } from "@/data/checklists";
import SearchBar from "@/components/SearchBar";

export default function HomePage() {
  const totalChecklists = categories.reduce((sum, cat) => sum + cat.checklists.length, 0);
  const totalItems = categories.reduce(
    (sum, cat) => sum + cat.checklists.reduce((s, cl) => s + cl.items.length, 0),
    0
  );

  const popular = [
    { categorySlug: "life", slug: "jjatu-start" },
    { categorySlug: "job", slug: "interview" },
    { categorySlug: "travel", slug: "overseas-travel" },
    { categorySlug: "home", slug: "jeonse-contract" },
    { categorySlug: "event", slug: "wedding" },
    { categorySlug: "family", slug: "childbirth" },
    { categorySlug: "job", slug: "resignation" },
    { categorySlug: "buy", slug: "laptop" },
  ];

  const recentItems = recentChecklists.map(({ categorySlug, slug }) => ({
    cat: getCategoryBySlug(categorySlug)!,
    cl: getChecklistBySlug(categorySlug, slug)!,
    categorySlug,
    slug,
  }));

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

      {/* 최근 추가된 체크리스트 */}
      <section className="mb-14">
        <div className="flex items-center gap-2 mb-5">
          <span className="text-base font-semibold text-slate-800">최근 추가된 체크리스트</span>
          <span className="text-xs bg-blue-100 text-blue-600 rounded-full px-2 py-0.5 font-medium">NEW</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {recentItems.map(({ cat, cl, categorySlug, slug }) => (
            <a
              key={`${categorySlug}-${slug}`}
              href={`/${categorySlug}/${slug}`}
              className="block bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl">{cat.icon}</span>
                <span className={`text-xs font-medium ${cat.color}`}>{cat.name}</span>
              </div>
              <div className="font-semibold text-slate-800 text-sm mb-1 group-hover:text-blue-600 transition-colors">{cl.title}</div>
              <div className="text-xs text-slate-500 line-clamp-2 mb-3">{cl.description}</div>
              <div className="text-xs text-slate-400 bg-slate-50 rounded-lg px-2 py-1 inline-block">{cl.items.length}개 항목</div>
            </a>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section>
        <h2 className="text-xl font-semibold text-slate-800 mb-6">카테고리</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <a
              key={cat.slug}
              href={`/${cat.slug}`}
              className={`block p-5 rounded-xl border ${cat.bgColor} hover:shadow-md transition-all group`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{cat.icon}</span>
                <div>
                  <h3 className={`font-bold text-lg ${cat.color} group-hover:underline`}>{cat.name}</h3>
                  <p className="text-xs text-slate-500">{cat.checklists.length}개 체크리스트</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 mb-3">{cat.description}</p>
              <ul className="space-y-1">
                {cat.checklists.slice(0, 3).map((cl) => (
                  <li key={cl.slug} className="text-xs text-slate-500 flex items-center gap-1.5">
                    <span className="text-slate-300">›</span>
                    {cl.title}
                  </li>
                ))}
                {cat.checklists.length > 3 && (
                  <li className="text-xs text-slate-400">+ {cat.checklists.length - 3}개 더 보기</li>
                )}
              </ul>
            </a>
          ))}
        </div>
      </section>

      {/* Popular */}
      <section className="mt-14">
        <h2 className="text-xl font-semibold text-slate-800 mb-6">인기 체크리스트</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {popular.map(({ categorySlug, slug }) => {
            const cat = getCategoryBySlug(categorySlug)!;
            const cl = getChecklistBySlug(categorySlug, slug)!;
            if (!cat || !cl) return null;
            return (
              <a
                key={`${categorySlug}-${slug}`}
                href={`/${categorySlug}/${slug}`}
                className="flex items-center gap-4 bg-white border border-slate-200 rounded-xl px-4 py-3 hover:border-blue-300 hover:shadow-sm transition-all group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{cl.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5 truncate">{cl.description.slice(0, 35)}...</div>
                </div>
                <span className="text-xs text-slate-300 bg-slate-100 rounded-full px-2 py-0.5 whitespace-nowrap">{cl.items.length}개</span>
              </a>
            );
          })}
        </div>
      </section>

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
            <span className="text-2xl">🙈</span>
            <div>
              <div className="font-medium text-slate-800 text-sm">완료 항목 숨기기</div>
              <div className="text-xs text-slate-500 mt-1">완료한 항목을 숨겨서 남은 할 일에만 집중할 수 있습니다.</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
