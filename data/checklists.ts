export interface ChecklistItem {
  id: string;
  text: string;
  note?: string;
}

export interface ChecklistSection {
  title: string;
  items: ChecklistItem[];
}

export interface Checklist {
  slug: string;
  title: string;
  description: string;
  categorySlug: string;
  sections: ChecklistSection[];
}

export interface Category {
  slug: string;
  name: string;
  icon: string;
  description: string;
  color: string;
  bgColor: string;
}

export const categories: Category[] = [
  { slug: "life", name: "생활", icon: "🏠", description: "자취, 이사, 독립 등 일상생활 준비", color: "text-blue-700", bgColor: "bg-blue-50 border-blue-200" },
  { slug: "job", name: "직장", icon: "💼", description: "취업, 이직, 퇴사 등 직장 생활 준비", color: "text-slate-700", bgColor: "bg-slate-50 border-slate-200" },
  { slug: "travel", name: "여행", icon: "✈️", description: "국내외 여행 및 캠핑 준비", color: "text-sky-700", bgColor: "bg-sky-50 border-sky-200" },
  { slug: "buy", name: "구매", icon: "🛒", description: "큰 구매 결정 전 꼼꼼히 확인할 사항들", color: "text-emerald-700", bgColor: "bg-emerald-50 border-emerald-200" },
  { slug: "event", name: "이벤트", icon: "🎉", description: "결혼, 출산, 입양 등 인생의 특별한 순간", color: "text-rose-700", bgColor: "bg-rose-50 border-rose-200" },
  { slug: "study", name: "공부", icon: "📚", description: "자격증, 어학, 시험 준비", color: "text-violet-700", bgColor: "bg-violet-50 border-violet-200" },
  { slug: "health", name: "건강", icon: "💪", description: "건강한 생활 습관 시작을 위한 준비", color: "text-orange-700", bgColor: "bg-orange-50 border-orange-200" },
  { slug: "digital", name: "디지털", icon: "💻", description: "스마트폰, PC, 온라인 생활 관리", color: "text-cyan-700", bgColor: "bg-cyan-50 border-cyan-200" },
];

// Checklists are imported from separate category files
import { lifeChecklists } from "./life";
import { jobChecklists } from "./job";
import { travelChecklists } from "./travel";
import { buyChecklists } from "./buy";
import { eventChecklists } from "./event";
import { studyChecklists } from "./study";
import { healthChecklists } from "./health";
import { digitalChecklists } from "./digital";

export const checklists: Checklist[] = [
  ...lifeChecklists,
  ...jobChecklists,
  ...travelChecklists,
  ...buyChecklists,
  ...eventChecklists,
  ...studyChecklists,
  ...healthChecklists,
  ...digitalChecklists,
];

export function getChecklistBySlug(slug: string): Checklist | undefined {
  return checklists.find((cl) => cl.slug === slug);
}

export function getChecklistsByCategory(categorySlug: string): Checklist[] {
  return checklists.filter((cl) => cl.categorySlug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function searchChecklists(query: string): Checklist[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return checklists.filter(
    (cl) =>
      cl.title.toLowerCase().includes(q) ||
      cl.description.toLowerCase().includes(q)
  );
}

export function getTotalItems(checklist: Checklist): number {
  return checklist.sections.reduce((sum, s) => sum + s.items.length, 0);
}
