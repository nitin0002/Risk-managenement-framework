import { Mono } from '../ui/Mono';
import { BENCHMARKS } from '../../lib/chart';

export function ResearchAndBenchmark() {
  return (
    <section id="lab" style={{ padding: '84px 0 24px' }}>
      <div className="ti-research-layout">
        <div style={{ border: '1px solid #E1E6EF', borderRadius: 16, background: '#FFFFFF', padding: 40, boxShadow: '0 1px 2px rgba(19,25,34,0.04)' }}>
          <Mono size={11} color="#A31F34" spacing="0.14em" style={{ display: 'block', marginBottom: 18 }}>TUNEITFINE LABS</Mono>
          <h2 style={{ margin: '0 0 14px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 30, lineHeight: 1.14, letterSpacing: '-0.02em', color: '#131922' }}>A research lab, not just a vendor.</h2>
          <p style={{ margin: '0 0 24px', fontSize: 15.5, lineHeight: 1.65, color: '#4C5768', maxWidth: 440 }}>We publish peer-reviewed work, maintain open-source risk taxonomies, and contribute to emerging AI governance standards. The platform is the applied edge of that research.</p>
          <div style={{ display: 'flex', gap: 30, flexWrap: 'wrap' }}>
            {[['14','papers published'],['3','open taxonomies'],['40+','frameworks mapped']].map(([val, label]) => (
              <div key={label}>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 30, fontWeight: 600, color: '#131922' }}>{val}</div>
                <div style={{ fontSize: 12.5, color: '#6A7689', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #E1E6EF', borderRadius: 16, background: '#FFFFFF', padding: 40, boxShadow: '0 1px 2px rgba(19,25,34,0.04)' }}>
          <Mono size={11} color="#A31F34" spacing="0.14em" style={{ display: 'block', marginBottom: 18 }}>AUDIT PREP TIME · MANUAL vs. TUNEITFINE</Mono>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {BENCHMARKS.map(b => (
              <div key={b.industry}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
                  <span style={{ fontSize: 13.5, color: '#353E4D' }}>{b.industry}</span>
                  <Mono size={12} color="#15814F">{b.saving}</Mono>
                </div>
                <div style={{ position: 'relative', height: 14, background: '#F1F3F8', borderRadius: 5, marginBottom: 5 }}>
                  <div style={{ position: 'absolute', inset: 0, width: b.manualW, background: '#CAD2E0', borderRadius: 5 }} />
                </div>
                <div style={{ position: 'relative', height: 14, background: '#F1F3F8', borderRadius: 5 }}>
                  <div style={{ position: 'absolute', inset: 0, width: b.tifW, background: '#2348E0', borderRadius: 5 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 18, marginTop: 18, paddingTop: 14, borderTop: '1px solid #EEF1F6', flexWrap: 'wrap' }}>
            {[['#CAD2E0','Manual'],['#2348E0','TuneItFine']].map(([bg, label]) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, color: '#6A7689' }}>
                <span style={{ width: 12, height: 12, borderRadius: 3, background: bg }} />{label}
              </span>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 11.5, color: '#9AA6BC' }}>Internal analysis · 15 enterprise engagements</span>
          </div>
        </div>
      </div>
    </section>
  );
}
