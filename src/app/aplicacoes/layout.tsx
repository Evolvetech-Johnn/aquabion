import type { ReactNode } from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aplicações | Aquabion Brasil',
  description: 'Todas as aplicações da tecnologia Aquabion - Indústria, agronegócio, hospitais, hotéis e mais',
};

export default function AplicacoesLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
