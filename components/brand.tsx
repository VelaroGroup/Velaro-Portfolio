import Image from 'next/image';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand${compact ? ' brand-small' : ''}`}>
      <span className="brand-icon" aria-hidden="true">
        <Image src="/velaro-mark.png" alt="" width={40} height={40} sizes={compact ? '24px' : '40px'} />
      </span>
      <span>VELARO</span>
    </span>
  );
}
