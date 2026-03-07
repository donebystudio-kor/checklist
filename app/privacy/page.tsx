import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "체크리스트 모음 개인정보처리방침",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">개인정보처리방침</h1>
      <p className="text-sm text-slate-400 mb-8">최종 업데이트: 2025년 1월 1일</p>

      <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">1. 개요</h2>
          <p className="text-sm leading-relaxed">
            체크리스트 모음(이하 &ldquo;서비스&rdquo;)은 이용자의 개인정보를 중요하게 생각합니다.
            본 서비스는 이용자의 개인정보를 수집하거나 서버에 저장하지 않습니다.
            체크리스트의 진행 상황은 이용자의 기기 내 로컬 스토리지(Local Storage)에만 저장되며,
            외부 서버로 전송되지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">2. 수집하는 개인정보</h2>
          <p className="text-sm leading-relaxed">
            본 서비스는 별도의 회원가입 또는 로그인을 요구하지 않으며, 이름, 이메일, 전화번호 등
            어떠한 개인정보도 수집하지 않습니다.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            체크리스트 항목의 완료 여부는 오직 이용자의 기기 로컬 스토리지에만 저장됩니다.
            브라우저 설정에서 사이트 데이터를 삭제하면 모든 체크 내역이 초기화됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">3. 쿠키 및 트래킹</h2>
          <p className="text-sm leading-relaxed">
            본 서비스는 기능 향상을 위해 로컬 스토리지를 사용합니다.
            로컬 스토리지는 쿠키와 달리 서버로 자동 전송되지 않으며, 해당 기기와 브라우저에서만 접근 가능합니다.
          </p>
          <p className="text-sm leading-relaxed mt-2">
            본 서비스는 Google Analytics 등 외부 분석 도구를 사용할 수 있으나,
            이 경우 개인을 식별할 수 없는 익명 통계 데이터만 수집됩니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">4. 제3자 제공</h2>
          <p className="text-sm leading-relaxed">
            본 서비스는 수집한 개인정보를 제3자에게 제공하거나 공유하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">5. 로컬 스토리지 데이터 삭제 방법</h2>
          <p className="text-sm leading-relaxed">이용자는 언제든지 저장된 체크 데이터를 삭제할 수 있습니다.</p>
          <ul className="list-disc list-inside text-sm mt-2 space-y-1 text-slate-600">
            <li>각 체크리스트 페이지 내 &ldquo;초기화&rdquo; 버튼 사용</li>
            <li>브라우저 설정 &gt; 개인정보 및 보안 &gt; 사이트 데이터 삭제</li>
            <li>브라우저 개발자 도구 &gt; Application &gt; Local Storage 에서 직접 삭제</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">6. 아동 개인정보 보호</h2>
          <p className="text-sm leading-relaxed">
            본 서비스는 만 14세 미만 아동의 개인정보를 수집하지 않습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">7. 개인정보처리방침 변경</h2>
          <p className="text-sm leading-relaxed">
            본 개인정보처리방침은 법령 및 서비스 변경에 따라 업데이트될 수 있습니다.
            변경 시 본 페이지에 게시하며, 중요한 변경 사항은 서비스 내 공지를 통해 알려드립니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">8. 문의</h2>
          <p className="text-sm leading-relaxed">
            개인정보처리방침에 관한 문의사항이 있으시면 아래로 연락해 주세요.
          </p>
          <p className="text-sm mt-2 text-slate-500">서비스명: 체크리스트 모음</p>
        </section>
      </div>
    </div>
  );
}
