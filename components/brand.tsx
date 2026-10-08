import Image from 'next/image';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand${compact ? ' brand-small' : ''}`}>
      <span className="brand-icon" aria-hidden="true">
        <Image src="/velaro-logo.png" alt="" width={80} height={53} sizes="80px" />
      </span>
      <span>VELARO</span>
    </span>
  );
}
