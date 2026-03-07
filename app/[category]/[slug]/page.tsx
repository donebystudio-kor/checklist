import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getChecklistBySlug, getCategoryBySlug, categories } from "@/data/checklists";
import ChecklistView from "@/components/ChecklistView";

export async function generateStaticParams() {
  return categories.flatMap((cat) =>
    cat.checklists.map((cl) => ({
      category: cat.slug,
      slug: cl.slug,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const cl = getChecklistBySlug(category, slug);
  const cat = getCategoryBySlug(category);
  if (!cl || !cat) return {};
  return {
    title: cl.title,
    description: `${cl.description} ${cl.items.length}개 항목을 체크하며 완벽하게 준비하세요.`,
    openGraph: {
      title: cl.title,
      description: cl.description,
    },
  };
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const cl = getChecklistBySlug(category, slug);
  const cat = getCategoryBySlug(category);
  if (!cl || !cat) notFound();

  return (
    <ChecklistView
      checklist={cl}
      categoryName={cat.name}
      categoryIcon={cat.icon}
      categorySlug={cat.slug}
    />
  );
}
