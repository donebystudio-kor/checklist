import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCategoryBySlug, categories } from "@/data/checklists";

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) return {};
  return {
    title: `${cat.name} 체크리스트 모음`,
    description: `${cat.description}. ${cat.checklists.map((cl) => cl.title).join(", ")} 등 ${cat.checklists.length}가지 체크리스트를 확인하세요.`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  if (!cat) notFound();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <nav className="text-sm text-slate-400 mb-6">
        <a href="/" className="hover:text-slate-700 transition-colors">홈</a>
        <span className="mx-2">›</span>
        <span className="text-slate-700">{cat.name}</span>
      </nav>

      <div className={`rounded-2xl border p-6 mb-8 ${cat.bgColor}`}>
        <div className="flex items-center gap-4">
          <span className="text-4xl">{cat.icon}</span>
          <div>
            <h1 className={`text-2xl font-bold ${cat.color}`}>{cat.name} 체크리스트</h1>
            <p className="text-sm text-slate-600 mt-1">{cat.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cat.checklists.map((cl) => (
          <a
            key={cl.slug}
            href={`/${cat.slug}/${cl.slug}`}
            className="block bg-white border border-slate-200 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h2 className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                {cl.title}
              </h2>
              <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 whitespace-nowrap shrink-0">
                {cl.items.length}개
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">{cl.description}</p>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-400">
              {cl.items.slice(0, 3).map((item) => (
                <span key={item.id} className="inline-block mr-2 mb-1">
                  · {item.text.slice(0, 18)}{item.text.length > 18 ? "..." : ""}
                </span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
