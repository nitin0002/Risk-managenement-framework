import { Mono } from '../ui/Mono';

const F = { bg: '#15814F', fg: '#FFFFFF', mark: '✓', t: 'Fully covered' };
const P = { bg: '#F2B441', fg: '#3A2A00', mark: '~', t: 'Partial / evidence gap' };
const M = { bg: '#E07A88', fg: '#FFFFFF', mark: '-', t: 'Missing control' };
const MATRIX_HEADERS = ['ISO 27001', 'SOC 2', 'GDPR', 'EU AI Act', 'NIST AI RMF'];
const MATRIX_ROWS = [
  ['Access control & IAM',         [F, F, F, P, F]],
  ['Encryption at rest / transit', [F, F, F, P, F]],
  ['Incident response',            [F, P, F, P, P]],
  ['Data retention & deletion',    [F, F, F, F, P]],
  ['Model transparency',           [P, P, M, F, P]],
  ['Human oversight',              [M, P, M, F, P]],
  ['Adversarial robustness',       [P, M, M, P, M]],
  ['Bias & fairness testing',      [P, F, P, F, P]],
  ['Third-party / vendor risk',    [F, P, F, P, P]],
  ['Audit logging & evidence',     [F, F, P, P, F]],
];

export function CoverageHeatmap() {
  const colTemplate = '230px repeat(5, 1fr)';
  return (
    <section id="coverage" style={{ padding: '84px 0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 32 }}>
        <div style={{ maxWidth: 560 }}>
          <Mono size={11} color="#A31F34" spacing="0.16em" style={{ display: 'block', marginBottom: 16 }}>COMPLIANCE COVERAGE MATRIX</Mono>
          <h2 style={{ margin: 0, fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: '#131922' }}>Every control, every framework, at a glance.</h2>
        </div>
        <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}><div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 34, fontWeight: 600, color: '#15814F' }}>78%</div><div style={{ fontSize: 12, color: '#6A7689' }}>overall coverage</div></div>
          <div style={{ width: 1, height: 42, background: '#E1E6EF' }} />
          <div style={{ textAlign: 'right' }}><div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 34, fontWeight: 600, color: '#A31F34' }}>12</div><div style={{ fontSize: 12, color: '#6A7689' }}>critical gaps</div></div>
        </div>
      </div>

      <div style={{ border: '1px solid #E1E6EF', borderRadius: 14, background: '#FFFFFF', padding: '20px 22px', boxShadow: '0 1px 2px rgba(19,25,34,0.04)', overflowX: 'auto' }}>
        <div style={{ minWidth: 680 }}>
          <div style={{ display: 'grid', gridTemplateColumns: colTemplate, gap: 8, marginBottom: 8 }}>
            <div />
            {MATRIX_HEADERS.map(h => (
              <div key={h} style={{ textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#4C5768', paddingBottom: 4 }}>{h}</div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MATRIX_ROWS.map(([label, cells]) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: colTemplate, gap: 8, alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: '#353E4D' }}>{label}</div>
                {cells.map((c, j) => (
                  <div key={j} className="ti-cell" title={`${label} · ${MATRIX_HEADERS[j]} - ${c.t}`}
                    style={{ height: 38, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.bg, color: c.fg, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 500 }}>
                    {c.mark}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 22, marginTop: 18, paddingTop: 16, borderTop: '1px solid #EEF1F6', flexWrap: 'wrap' }}>
            {[['#15814F','Fully covered'],['#F2B441','Partial / evidence gap'],['#E07A88','Missing control']].map(([bg, label]) => (
              <span key={label} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: '#4C5768' }}>
                <span style={{ width: 14, height: 14, borderRadius: 4, background: bg }} />{label}
              </span>
            ))}
            <span style={{ marginLeft: 'auto', fontSize: 12.5, color: '#9AA6BC' }}>Auto-generated from ingested documents · demo uses public fintech policies</span>
          </div>
        </div>
      </div>
    </section>
  );
}
