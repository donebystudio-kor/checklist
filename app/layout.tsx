import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "TickTickList - 상황별 완벽 체크리스트",
    template: "%s | TickTickList",
  },
  description:
    "자취, 이사, 취업, 여행, 결혼, 출산 등 인생의 중요한 순간마다 필요한 체크리스트를 한곳에서 확인하세요. 진행 상황을 직접 체크하고 관리할 수 있습니다.",
  keywords: ["체크리스트", "준비물", "이사 체크리스트", "여행 준비", "취업 준비", "결혼 준비", "자취 체크리스트"],
  authors: [{ name: "TickTickList" }],
  other: {
    "google-adsense-account": "ca-pub-7048160642416104",
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "TickTickList",
    title: "TickTickList - 상황별 완벽 체크리스트",
    description: "인생의 중요한 순간마다 필요한 체크리스트를 한곳에서 확인하세요.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7048160642416104"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen bg-slate-50 antialiased">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
          <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-bold text-xl text-slate-900 hover:text-blue-600 transition-colors">
              <span className="text-blue-600">✓</span>
              TickTickList
            </a>
            <nav className="flex items-center gap-4 text-sm text-slate-500">
              <a href="/" className="hover:text-slate-900 transition-colors">홈</a>
              <a href="/privacy" className="hover:text-slate-900 transition-colors">개인정보처리방침</a>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-white border-t border-slate-200 mt-16">
          <div className="max-w-5xl mx-auto px-4 py-8 text-center text-sm text-slate-400">
            <p className="mb-1">© 2026 TickTickList. 상황별 완벽 체크리스트.</p>
            <a href="/privacy" className="hover:text-slate-600 transition-colors">개인정보처리방침</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
