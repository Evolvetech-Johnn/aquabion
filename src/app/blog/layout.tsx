import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Aquabion Brasil",
  description: "Insights e conteúdos sobre tratamento de água, sustentabilidade e tecnologia Aquabion.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
