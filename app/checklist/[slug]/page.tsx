import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getChecklistBySlug, getCategoryBySlug, checklists, getTotalItems } from "@/data/checklists";
import ChecklistView from "@/components/ChecklistView";

export async function generateStaticParams() {
  return checklists.map((cl) => ({ slug: cl.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cl = getChecklistBySlug(slug);
  if (!cl) return {};
  const cat = getCategoryBySlug(cl.categorySlug);
  const totalItems = getTotalItems(cl);
  return {
    title: cl.title,
    description: `${cl.description} ${totalItems}개 항목을 체크하며 완벽하게 준비하세요.`,
    openGraph: {
      title: cl.title,
      description: cl.description,
    },
  };
}

export default async function ChecklistPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cl = getChecklistBySlug(slug);
  if (!cl) notFound();

  const cat = getCategoryBySlug(cl.categorySlug);
  if (!cat) notFound();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "홈",
        "item": "https://checklist-seven-woad.vercel.app",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": cat.name,
        "item": `https://checklist-seven-woad.vercel.app/#${cat.slug}`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": cl.title,
        "item": `https://checklist-seven-woad.vercel.app/checklist/${cl.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ChecklistView
        checklist={cl}
        categoryName={cat.name}
        categoryIcon={cat.icon}
      />
    </>
  );
}
