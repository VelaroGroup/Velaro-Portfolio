import Image from 'next/image';
import velaroMark from '@/public/velaro-mark.png';

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand${compact ? ' brand-small' : ''}`}>
      <span className="brand-icon" aria-hidden="true">
        <Image src={velaroMark} alt="" width={40} height={40} sizes={compact ? '24px' : '40px'} />
      </span>
      <span>VELARO</span>
    </span>
  );
}
