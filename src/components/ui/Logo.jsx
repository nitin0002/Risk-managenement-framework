import { Mono } from './Mono';

export function Logo() {
  return (
    <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="24.5" height="24.5" rx="6" stroke="#2348E0" strokeWidth="1.5" />
        <rect x="6"    y="6"    width="6.5"  height="6.5"  rx="1" fill="#2348E0" />
        <rect x="13.5" y="6"    width="6.5"  height="6.5"  rx="1" fill="#8AA3FF" />
        <rect x="6"    y="13.5" width="6.5"  height="6.5"  rx="1" fill="#8AA3FF" />
        <rect x="13.5" y="13.5" width="6.5"  height="6.5"  rx="1" fill="#A31F34" />
      </svg>
      <span style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em', color: '#131922' }}>TuneItFine</span>
      <span className="ti-logo-tagline" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.13em', color: '#6A7689', borderLeft: '1px solid #E1E6EF', paddingLeft: 11 }}>COMPLIANCE&nbsp;INTELLIGENCE</span>
    </a>
  );
}
