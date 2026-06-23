import { Mono } from '../ui/Mono';
import { ROADMAP } from '../../lib/chart';

const SEV = {
  Critical: { sevBg: '#FCEDEF', sevFg: '#A31F34' },
  High:     { sevBg: '#FBEBCD', sevFg: '#B5740E' },
  Med:      { sevBg: '#EEF1F6', sevFg: '#4C5768' },
};
const REGISTER = [
  { id: 'R-014', desc: 'Adversarial robustness untested on prod model', fair: '8.4', sev: 'Critical' },
  { id: 'R-022', desc: 'No documented human-oversight procedure',       fair: '7.9', sev: 'Critical' },
  { id: 'R-008', desc: 'Subprocessor DPA missing for EU data',          fair: '7.1', sev: 'High'     },
  { id: 'R-031', desc: 'Model cards lack bias-evaluation results',      fair: '6.6', sev: 'High'     },
  { id: 'R-005', desc: 'Incident response SLA undefined for AI',        fair: '5.8', sev: 'High'     },
  { id: 'R-019', desc: 'Energy / environmental reporting absent',       fair: '4.2', sev: 'Med'      },
];

export function RiskAndRemediation() {
  return (
    <section style={{ padding: '84px 0 24px' }}>
      <div style={{ maxWidth: 620, marginBottom: 36 }}>
        <Mono size={11} color="#A31F34" spacing="0.16em" style={{ display: 'block', marginBottom: 16 }}>FROM RAW DOCUMENTS TO A REMEDIATION ROADMAP</Mono>
        <h2 style={{ margin: '0 0 14px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#131922' }}>34 risks scored. A prioritized plan in minutes.</h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#4C5768' }}>Risks are scored with the FAIR methodology, then sequenced into a sprint-based roadmap mapped to control implementations. Export to Jira or ServiceNow.</p>
      </div>

      <div className="ti-risk-layout">
        <div style={{ border: '1px solid #E1E6EF', borderRadius: 14, background: '#FFFFFF', overflow: 'hidden', boxShadow: '0 1px 2px rgba(19,25,34,0.04)' }}>
          <div className="ti-register-header" style={{ background: '#F7F8FB', borderBottom: '1px solid #E1E6EF' }}>
            {['RISK','DESCRIPTION','FAIR','SEV'].map((h, i) => (
              <Mono key={h} size={10.5} color="#6A7689" spacing="0.08em" style={{ textAlign: i >= 2 ? 'right' : undefined }}>{h}</Mono>
            ))}
          </div>
          {REGISTER.map(r => {
            const { sevBg, sevFg } = SEV[r.sev];
            return (
              <div key={r.id} className="ti-register-row" style={{ borderBottom: '1px solid #F1F3F8', alignItems: 'center' }}>
                <Mono size={12} color="#2348E0">{r.id}</Mono>
                <span style={{ fontSize: 13, color: '#353E4D' }}>{r.desc}</span>
                <Mono size={12} color="#131922" style={{ textAlign: 'right' }}>{r.fair}</Mono>
                <span style={{ justifySelf: 'end', fontSize: 10, fontFamily: "'IBM Plex Mono', monospace", fontWeight: 600, color: sevFg, background: sevBg, padding: '3px 8px', borderRadius: 5 }}>{r.sev}</span>
              </div>
            );
          })}
          <div style={{ padding: '13px 18px', fontSize: 12.5, color: '#6A7689', background: '#F7F8FB' }}>+ 28 more risks identified · register redacted for demo</div>
        </div>

        <div style={{ border: '1px solid #E1E6EF', borderRadius: 14, background: '#FFFFFF', padding: 22, boxShadow: '0 1px 2px rgba(19,25,34,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <Mono size={11} color="#6A7689" spacing="0.1em">REMEDIATION ROADMAP</Mono>
            <Mono size={11} color="#9AA6BC">12 WEEKS</Mono>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, marginBottom: 10 }}>
            <div />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, color: '#9AA6BC' }}>
              {['S1','S2','S3','S4','S5','S6'].map(s => <span key={s}>{s}</span>)}
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ROADMAP.map(t => (
              <div key={t.name} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 12, alignItems: 'center' }}>
                <span style={{ fontSize: 12.5, color: '#353E4D', lineHeight: 1.2 }}>{t.name}</span>
                <div style={{ position: 'relative', height: 18, background: '#F1F3F8', borderRadius: 5 }}>
                  <div style={{ position: 'absolute', top: 0, bottom: 0, left: t.left, width: t.width, background: t.color, borderRadius: 5 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 18, paddingTop: 16, borderTop: '1px solid #EEF1F6' }}>
            <a href="#access" className="ti-primary" style={{ flex: 1, textAlign: 'center', height: 42, lineHeight: '42px', borderRadius: 9, background: '#2348E0', color: '#FFFFFF', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'background .15s' }}>Export roadmap</a>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '0 14px', border: '1px solid #E1E6EF', borderRadius: 9, fontSize: 12.5, color: '#4C5768' }}>Jira · ServiceNow</span>
          </div>
        </div>
      </div>
    </section>
  );
}
