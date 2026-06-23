import { Mono } from '../ui/Mono';
import { useCountUp } from '../../hooks/useReveal';
import { LAUNCH_LABEL } from '../../lib/chart';

export function Hero() {
  const counters = useCountUp({ controls: 12843, pages: 1247, seconds: 34 });
  const fmt = n => n.toLocaleString('en-US');

  return (
    <section id="top" style={{ position: 'relative', overflow: 'hidden', borderBottom: '1px solid #E1E6EF' }}>
      <div className="ti-container">
        <div className="ti-hero">
          <div className="ti-hero-text">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.13em', color: '#6A7689', marginBottom: 24 }}>
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1E9E63', boxShadow: '0 0 0 3px rgba(30,158,99,0.2)', animation: 'tiBlink 2.4s ease-in-out infinite' }} />
              AI-NATIVE GRC PLATFORM
              <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#CAD2E0' }} />
              COMING SOON · {LAUNCH_LABEL}
            </div>
            <h1 style={{ margin: 0, fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 'clamp(34px,4.6vw,58px)', lineHeight: 1.05, letterSpacing: '-0.025em', color: '#131922', textWrap: 'balance' }}>
              The AI-native enterprise compliance intelligence engine.
            </h1>
            <p style={{ margin: '24px 0 0', fontSize: 18, lineHeight: 1.6, color: '#353E4D', maxWidth: 540 }}>
              Upload policies, contracts, and evidence. TuneItFine automatically extracts controls, maps them to 40+ frameworks, quantifies risk, and generates audit-ready reports - mapping your chaos to order in minutes, not quarters.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
              <a href="#pipeline" className="ti-primary" style={{ display: 'inline-flex', alignItems: 'center', height: 50, padding: '0 26px', borderRadius: 10, background: '#2348E0', color: '#FFFFFF', fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 10px 34px rgba(35,72,224,0.4)', transition: 'background .15s' }}>See it in action</a>
              <a href="#taxonomy" className="ti-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, height: 50, padding: '0 24px', borderRadius: 10, background: '#FFFFFF', border: '1px solid #CAD2E0', color: '#131922', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'border-color .15s' }}>
                Explore the framework
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', border: '1px solid #E1E6EF', borderRadius: 12, background: '#F7F8FB', maxWidth: 560 }}>
              <Mono size={11} color="#6A7689" spacing="0.08em" style={{ lineHeight: 1.5, flex: 'none' }}>LAST<br />RUN</Mono>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: '#353E4D' }}>
                <Mono size={13} color="#131922" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{fmt(counters.controls)}</Mono> controls extracted from{' '}
                <Mono size={13} color="#131922" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{fmt(counters.pages)}</Mono> pages in{' '}
                <Mono size={13} color="#2348E0" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{counters.seconds}s</Mono>
              </div>
            </div>
          </div>

          <div className="ti-hero-panel" style={{ border: '1px solid #E1E6EF', borderRadius: 14, background: '#FFFFFF', boxShadow: '0 4px 10px rgba(19,25,34,0.06), 0 16px 32px rgba(19,25,34,0.08)', overflow: 'hidden' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '13px 16px', borderBottom: '1px solid #EEF1F6', background: '#F7F8FB' }}>
              {['#CD4B5D','#D08A1A','#1E9E63'].map(c => <span key={c} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
              <Mono size={11} color="#6A7689" style={{ marginLeft: 8 }}>extraction · acme-fintech-policy.pdf</Mono>
            </div>
            <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 11 }}>
              {[
                { id: 'AC-03', name: 'Logical access enforcement',  badge: 'COVERED', bc: '#15814F', bfg: '#FFFFFF' },
                { id: 'SC-13', name: 'Cryptographic protection',    badge: 'COVERED', bc: '#15814F', bfg: '#FFFFFF' },
                { id: 'AT-03', name: 'Adversarial robustness',      badge: 'PARTIAL', bc: '#F2B441', bfg: '#3A2A00' },
                { id: 'GV-04', name: 'Human oversight policy',      badge: 'GAP',     bc: '#E07A88', bfg: '#FFFFFF' },
              ].map(r => (
                <div key={r.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Mono size={11} color="#2348E0" style={{ flex: 'none', width: 54 }}>{r.id}</Mono>
                  <span style={{ fontSize: 13, color: '#353E4D', flex: 1 }}>{r.name}</span>
                  <span style={{ fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", color: r.bfg, background: r.bc, padding: '2px 7px', borderRadius: 4 }}>{r.badge}</span>
                </div>
              ))}
              <div style={{ marginTop: 4, height: 1, background: '#EEF1F6' }} />
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 }}>
                <span style={{ fontSize: 12, color: '#6A7689' }}>Coverage against EU AI Act</span>
                <Mono size={13} color="#131922" style={{ fontWeight: 600 }}>78%</Mono>
              </div>
              <div style={{ height: 7, borderRadius: 4, background: '#F1F3F8', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: '78%', background: 'linear-gradient(90deg,#2348E0,#15814F)', borderRadius: 4 }} />
              </div>
            </div>
          </div>
        </div>

        <div className="ti-trust-ribbon">
          <span style={{ fontSize: 12.5, color: '#6A7689', marginRight: 6 }}>Maps to the standards your auditors already use</span>
          {['ISO 27001','SOC 2','GDPR','EU AI ACT','NIST AI RMF','ISO 42001'].map(f => (
            <Mono key={f} size={11} color="#4C5768" spacing="0.05em" style={{ padding: '6px 12px', border: '1px solid #E1E6EF', borderRadius: 999 }}>{f}</Mono>
          ))}
        </div>
      </div>
    </section>
  );
}
