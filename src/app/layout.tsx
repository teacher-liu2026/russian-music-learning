import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "俄语音乐术语 | Russian Music Terms",
  description: "专为音乐学习者打造的俄语术语课程",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='🎵' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🎹</text></svg>",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
