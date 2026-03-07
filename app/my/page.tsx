import type { Metadata } from "next";
import MyChecklistsView from "@/components/MyChecklistsView";

export const metadata: Metadata = {
  title: "내 체크리스트",
  description: "내가 진행 중인 체크리스트와 완료한 체크리스트를 확인하세요.",
  robots: { index: false, follow: false },
};

export default function MyChecklistsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">내 체크리스트</h1>
        <p className="text-sm text-slate-500">
          내 기기에 저장된 체크 진행 상황입니다. 데이터는 이 브라우저에만 저장됩니다.
        </p>
      </div>
      <MyChecklistsView />
    </div>
  );
}
