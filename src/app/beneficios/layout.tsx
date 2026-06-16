import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Benefícios | Aquabion Brasil",
  description: "Todos os benefícios da tecnologia Aquabion - Economia, sustentabilidade e performance superior",
};

export default function BeneficiosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
