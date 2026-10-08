import { ImageResponse } from 'next/og';

export const alt = 'Velaro — Less busywork. More possibility. Custom platforms and business automation.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '64px 76px', background: '#f7f6f2', color: '#0a2133', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <div style={{ display: 'flex', width: 5, height: 35, background: '#24bde2' }} />
        <div style={{ display: 'flex', fontSize: 32, fontWeight: 700, letterSpacing: 5 }}>VELARO</div>
      </div>
      <div style={{ display: 'flex', marginTop: 54, color: '#47677a', fontSize: 18, letterSpacing: 3 }}>CUSTOM PLATFORMS & AUTOMATION</div>
      <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24, fontSize: 78, fontWeight: 700, letterSpacing: -4, lineHeight: 1.12 }}>
        <span>Less busywork.</span>
        <span style={{ color: '#385f72' }}>More possibility.</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', borderTop: '1px solid #cbd8db', paddingTop: 27, fontSize: 19 }}>
        <span>Built around the way your business works.</span>
        <span style={{ color: '#47677a' }}>velaro.group</span>
      </div>
    </div>,
    size,
  );
}
