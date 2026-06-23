import { useState } from 'react';
import { Mono } from '../ui/Mono';

const HEAT = {
  Critical: { heatColor: '#A31F34', heatBg: '#FCEDEF', heatBorder: '#F8D6DB' },
  High:     { heatColor: '#B5740E', heatBg: '#FBEBCD', heatBorder: '#F6E8D2' },
  Medium:   { heatColor: '#15814F', heatBg: '#D6F0E0', heatBorder: '#DCEEE3' },
};

const DOMAINS = [
  { num: '01', name: 'Discrimination & Toxicity',     color: '#BB2E41', desc: 'Unfair treatment, harmful content exposure, and unequal model performance across groups.', subrisks: 268, controls: 41, heat: 'High',     controlList: [{ id: 'GV-2.1', name: 'Bias testing protocol' }, { id: 'MS-2.11', name: 'Fairness evaluation' }, { id: 'A.5.34', name: 'Content safeguards' }], detected: 'Detected in your latest upload: 2 policies with partial coverage.' },
  { num: '02', name: 'Privacy & Security',            color: '#3F4FC4', desc: 'Unauthorized access to sensitive data and exploitable system vulnerabilities.', subrisks: 224, controls: 58, heat: 'High',     controlList: [{ id: 'A.8.24', name: 'Cryptography' }, { id: 'AC-3', name: 'Access enforcement' }, { id: 'SC-7', name: 'Boundary protection' }], detected: 'Detected in your latest upload: strong coverage, 1 evidence gap.' },
  { num: '03', name: 'Misinformation',                color: '#C77A12', desc: 'Generation and spread of false information that erodes shared reality.', subrisks: 191, controls: 22, heat: 'Medium',   controlList: [{ id: 'MS-1.1', name: 'Output provenance' }, { id: 'GV-1.5', name: 'Disclosure policy' }, { id: 'MG-4.1', name: 'Monitoring' }], detected: 'Detected in your latest upload: 1 policy, partial coverage.' },
  { num: '04', name: 'Malicious Actors',              color: '#8A2E8F', desc: 'Intentional misuse - disinformation, fraud, cyberattacks, and mass harm.', subrisks: 212, controls: 33, heat: 'High',     controlList: [{ id: 'A.5.7', name: 'Threat intelligence' }, { id: 'IR-4', name: 'Incident handling' }, { id: 'MG-3.1', name: 'Abuse monitoring' }], detected: 'Detected in your latest upload: 2 policies, adequate coverage.' },
  { num: '05', name: 'Human-Computer Interaction',    color: '#0E8C8C', desc: 'Overreliance, lost agency, and unsafe human-AI relationships.', subrisks: 158, controls: 19, heat: 'Medium',   controlList: [{ id: 'GV-4.1', name: 'Human oversight' }, { id: 'MS-3.2', name: 'Override controls' }, { id: 'MG-2.2', name: 'Escalation path' }], detected: 'Detected in your latest upload: 1 gap on human-oversight.' },
  { num: '06', name: 'Socioeconomic & Environmental', color: '#2E8B57', desc: 'Inequality, power concentration, governance failure, and environmental harm.', subrisks: 396, controls: 27, heat: 'Medium',   controlList: [{ id: 'GV-5.1', name: 'Impact assessment' }, { id: 'MS-2.9', name: 'Energy reporting' }, { id: 'GV-6.1', name: 'Supply-chain risk' }], detected: 'Detected in your latest upload: limited coverage, monitor.' },
  { num: '07', name: 'AI System Safety',              color: '#2E5C8A', desc: 'Misaligned goals, dangerous capabilities, and failures of robustness and security.', subrisks: 294, controls: 47, heat: 'Critical', controlList: [{ id: 'AT-3', name: 'Adversarial robustness' }, { id: 'MS-2.5', name: 'Validation & testing' }, { id: 'MG-4.3', name: 'Drift detection' }], detected: 'Detected in your latest upload: 3 partial, 1 critical gap.' },
];

export function TaxonomyTreemap() {
  const [domIdx, setDomIdx] = useState(0);
  const d = DOMAINS[domIdx];
  const { heatColor, heatBg, heatBorder } = HEAT[d.heat];
  const sel = i => () => setDomIdx(i);

  const tileStyle = (i, flexVal) => ({
    flex: flexVal, borderRadius: 10, background: DOMAINS[i].color,
    color: '#FFFFFF', padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
  });

  return (
    <section id="taxonomy" style={{ padding: '84px 0 24px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 40, flexWrap: 'wrap', marginBottom: 36 }}>
        <div style={{ maxWidth: 560 }}>
          <Mono size={11} color="#A31F34" spacing="0.16em" style={{ display: 'block', marginBottom: 16 }}>RISK TAXONOMY · POWERED BY THE MIT AI RISK REPOSITORY</Mono>
          <h2 style={{ margin: 0, fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: '#131922' }}>1,700+ documented risks, operationalized.</h2>
        </div>
        <p style={{ maxWidth: 360, fontSize: 15, lineHeight: 1.65, color: '#4C5768', margin: 0 }}>Block size reflects the number of catalogued sub-risks. Select a domain to see how many controls from ISO 42001 &amp; NIST AI RMF address it.</p>
      </div>

      <div className="ti-taxonomy-layout">
        <div className="ti-treemap">
          <div className="ti-treemap-row" style={{ flex: 1.5 }}>
            <div className="ti-tile" onClick={sel(5)} style={tileStyle(5, 396)}>
              <Mono size={11} color="#FFFFFF" style={{ opacity: 0.8 }}>06</Mono>
              <div><div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>Socioeconomic &amp; Environmental</div><Mono size={12} color="#FFFFFF" style={{ opacity: 0.85, marginTop: 4 }}>396 sub-risks</Mono></div>
            </div>
            <div className="ti-tile" onClick={sel(6)} style={tileStyle(6, 294)}>
              <Mono size={11} color="#FFFFFF" style={{ opacity: 0.8 }}>07</Mono>
              <div><div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>AI System Safety</div><Mono size={12} color="#FFFFFF" style={{ opacity: 0.85, marginTop: 4 }}>294 sub-risks</Mono></div>
            </div>
            <div className="ti-tile" onClick={sel(0)} style={tileStyle(0, 268)}>
              <Mono size={11} color="#FFFFFF" style={{ opacity: 0.8 }}>01</Mono>
              <div><div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.2 }}>Discrimination &amp; Toxicity</div><Mono size={12} color="#FFFFFF" style={{ opacity: 0.85, marginTop: 4 }}>268 sub-risks</Mono></div>
            </div>
          </div>
          <div className="ti-treemap-row" style={{ flex: 1 }}>
            {[[1,224,'02','Privacy & Security'],[3,212,'04','Malicious Actors'],[2,191,'03','Misinformation'],[4,158,'05','Human-Computer Interaction']].map(([di, cnt, num, name]) => (
              <div key={num} className="ti-tile" onClick={sel(di)} style={{ ...tileStyle(di, cnt), padding: 14 }}>
                <Mono size={11} color="#FFFFFF" style={{ opacity: 0.8 }}>{num}</Mono>
                <div><div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{name}</div><Mono size={11} color="#FFFFFF" style={{ opacity: 0.85, marginTop: 3 }}>{cnt}</Mono></div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ border: '1px solid #E1E6EF', borderRadius: 14, background: '#FFFFFF', padding: 24, boxShadow: '0 1px 2px rgba(19,25,34,0.04)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 12, height: 12, borderRadius: 3, background: d.color }} />
            <Mono size={11} color="#9AA6BC">DOMAIN {d.num}</Mono>
          </div>
          <h3 style={{ margin: '0 0 4px', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: '#131922' }}>{d.name}</h3>
          <p style={{ margin: '0 0 18px', fontSize: 14, lineHeight: 1.6, color: '#4C5768' }}>{d.desc}</p>

          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {[['sub-risks', d.subrisks, '#EEF1F6', '#131922'],['mapped controls', d.controls, '#EEF1F6', '#131922'],['heat score', d.heat, heatBorder, heatColor]].map(([label, val, bg, color]) => (
              <div key={label} style={{ flex: 1, padding: 12, border: `1px solid ${bg}`, borderRadius: 10, background: bg === '#EEF1F6' ? '#F7F8FB' : heatBg }}>
                <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 24, fontWeight: 600, color }}>{val}</div>
                <div style={{ fontSize: 11.5, color: '#6A7689', marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>

          <Mono size={10.5} color="#9AA6BC" spacing="0.1em" style={{ display: 'block', marginBottom: 10 }}>REPRESENTATIVE CONTROLS</Mono>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {d.controlList.map(c => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 11px', border: '1px solid #EEF1F6', borderRadius: 8 }}>
                <Mono size={11} color="#2348E0" style={{ flex: 'none', width: 52 }}>{c.id}</Mono>
                <span style={{ fontSize: 13, color: '#353E4D' }}>{c.name}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', paddingTop: 16, fontSize: 12.5, color: '#6A7689' }}>{d.detected}</div>
        </div>
      </div>
    </section>
  );
}
