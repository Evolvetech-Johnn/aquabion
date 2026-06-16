'use client';
import AnimatedButton from '@/components/ui/AnimatedButton';
import Link from 'next/link';

export default function AnimatedCTA() {
  return (
    <Link href="/contato">
      <AnimatedButton size="lg" showArrow>
        Agendar Diagnóstico Técnico
      </AnimatedButton>
    </Link>
  );
}
