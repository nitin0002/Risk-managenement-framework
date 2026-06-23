import { useState, useEffect, useRef } from 'react';
import './MeridianLanding.css';

const LAUNCH_LABEL = 'Fall 2026';

/* ── Data ─────────────────────────────────────────────────── */
const STAGES = [
  { num: '01', name: 'Document Ingestion', desc: 'OCR, layout parsing, and segmentation turn unstructured PDFs into clean, citable text spans.', chips: ['OCR', 'Layout parse', 'Clause split'] },
  { num: '02', name: 'Knowledge Graph',    desc: 'Entities, obligations, and relationships are linked into a queryable graph of your compliance reality.', chips: ['Entity linking', 'Obligations', 'Provenance'] },
  { num: '03', name: 'Control Extraction', desc: 'The agent identifies implemented controls and binds each to its source language and evidence.', chips: ['Control mining', 'Evidence bind', 'Dedup'] },
  { num: '04', name: 'Risk Scoring',       desc: 'Residual risk is quantified using the FAIR methodology — configurable to your loss model.', chips: ['FAIR', 'Likelihood', 'Impact'] },
  { num: '05', name: 'Compliance Mapping', desc: 'Controls are mapped to 40+ frameworks, surfacing overlaps and coverage gaps automatically.', chips: ['ISO 27001', 'EU AI Act', 'NIST RMF'] },
  { num: '06', name: 'Evidence Generation',desc: 'Audit-ready packs are compiled with cross-references, control language, and timestamps.', chips: ['SOC 2 pack', 'Cross-ref', 'Export'] },
];

const HEAT = {
  Critical: { heatColor: '#A31F34', heatBg: '#FCEDEF', heatBorder: '#F8D6DB' },
  High:     { heatColor: '#B5740E', heatBg: '#FBEBCD', heatBorder: '#F6E8D2' },
  Medium:   { heatColor: '#15814F', heatBg: '#D6F0E0', heatBorder: '#DCEEE3' },
};

const DOMAINS = [
  { num: '01', name: 'Discrimination & Toxicity',     color: '#BB2E41', desc: 'Unfair treatment, harmful content exposure, and unequal model performance across groups.', subrisks: 268, controls: 41, heat: 'High',     controlList: [{ id: 'GV-2.1', name: 'Bias testing protocol' }, { id: 'MS-2.11', name: 'Fairness evaluation' }, { id: 'A.5.34', name: 'Content safeguards' }], detected: 'Detected in your latest upload: 2 policies with partial coverage.' },
  { num: '02', name: 'Privacy & Security',            color: '#3F4FC4', desc: 'Unauthorized access to sensitive data and exploitable system vulnerabilities.', subrisks: 224, controls: 58, heat: 'High',     controlList: [{ id: 'A.8.24', name: 'Cryptography' }, { id: 'AC-3', name: 'Access enforcement' }, { id: 'SC-7', name: 'Boundary protection' }], detected: 'Detected in your latest upload: strong coverage, 1 evidence gap.' },
  { num: '03', name: 'Misinformation',                color: '#C77A12', desc: 'Generation and spread of false information that erodes shared reality.', subrisks: 191, controls: 22, heat: 'Medium',   controlList: [{ id: 'MS-1.1', name: 'Output provenance' }, { id: 'GV-1.5', name: 'Disclosure policy' }, { id: 'MG-4.1', name: 'Monitoring' }], detected: 'Detected in your latest upload: 1 policy, partial coverage.' },
  { num: '04', name: 'Malicious Actors',              color: '#8A2E8F', desc: 'Intentional misuse — disinformation, fraud, cyberattacks, and mass harm.', subrisks: 212, controls: 33, heat: 'High',     controlList: [{ id: 'A.5.7', name: 'Threat intelligence' }, { id: 'IR-4', name: 'Incident handling' }, { id: 'MG-3.1', name: 'Abuse monitoring' }], detected: 'Detected in your latest upload: 2 policies, adequate coverage.' },
  { num: '05', name: 'Human–Computer Interaction',    color: '#0E8C8C', desc: 'Overreliance, lost agency, and unsafe human–AI relationships.', subrisks: 158, controls: 19, heat: 'Medium',   controlList: [{ id: 'GV-4.1', name: 'Human oversight' }, { id: 'MS-3.2', name: 'Override controls' }, { id: 'MG-2.2', name: 'Escalation path' }], detected: 'Detected in your latest upload: 1 gap on human-oversight.' },
  { num: '06', name: 'Socioeconomic & Environmental', color: '#2E8B57', desc: 'Inequality, power concentration, governance failure, and environmental harm.', subrisks: 396, controls: 27, heat: 'Medium',   controlList: [{ id: 'GV-5.1', name: 'Impact assessment' }, { id: 'MS-2.9', name: 'Energy reporting' }, { id: 'GV-6.1', name: 'Supply-chain risk' }], detected: 'Detected in your latest upload: limited coverage, monitor.' },
  { num: '07', name: 'AI System Safety',              color: '#2E5C8A', desc: 'Misaligned goals, dangerous capabilities, and failures of robustness and security.', subrisks: 294, controls: 47, heat: 'Critical', controlList: [{ id: 'AT-3', name: 'Adversarial robustness' }, { id: 'MS-2.5', name: 'Validation & testing' }, { id: 'MG-4.3', name: 'Drift detection' }], detected: 'Detected in your latest upload: 3 partial, 1 critical gap.' },
];

const F = { bg: '#15814F', fg: '#FFFFFF', mark: '✓', t: 'Fully covered' };
const P = { bg: '#F2B441', fg: '#3A2A00', mark: '~', t: 'Partial / evidence gap' };
const M = { bg: '#E07A88', fg: '#FFFFFF', mark: '—', t: 'Missing control' };
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
const ROADMAP = [
  { name: 'Human oversight policy',    left: '0%',  width: '33%', color: '#A31F34' },
  { name: 'Adversarial testing',       left: '0%',  width: '50%', color: '#A31F34' },
  { name: 'EU subprocessor DPAs',      left: '17%', width: '33%', color: '#C77A12' },
  { name: 'Bias-eval in model cards',  left: '33%', width: '34%', color: '#C77A12' },
  { name: 'AI incident-response SLA',  left: '50%', width: '33%', color: '#2348E0' },
  { name: 'Environmental reporting',   left: '67%', width: '33%', color: '#2348E0' },
];
const BENCHMARKS = [
  { industry: 'Fintech',    saving: '−84%', manualW: '100%', tifW: '16%' },
  { industry: 'Healthtech', saving: '−79%', manualW: '92%',  tifW: '19%' },
  { industry: 'AI SaaS',    saving: '−88%', manualW: '85%',  tifW: '10%' },
];

/* ── Shared atoms ─────────────────────────────────────────── */
function Mono({ size = 11, color = '#6A7689', spacing = '0.1em', children, style }) {
  return <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: size, letterSpacing: spacing, color, ...style }}>{children}</span>;
}

function Logo() {
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

/* ── Header ───────────────────────────────────────────────── */
function Header() {
  const navLinks = [['#pipeline','The Engine'],['#taxonomy','Risk Taxonomy'],['#coverage','Coverage'],['#lab','Research Lab']];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(255,255,255,0.88)', backdropFilter: 'saturate(180%) blur(12px)', borderBottom: '1px solid #E1E6EF' }}>
      <div className="ti-container ti-header-inner">
        <Logo />
        <nav className="ti-header-nav">
          {navLinks.map(([href, label]) => (
            <a key={label} href={href} className="ti-nav" style={{ fontSize: 14, fontWeight: 500, color: '#4C5768', textDecoration: 'none', transition: 'color .15s' }}>{label}</a>
          ))}
        </nav>
        <div className="ti-header-actions">
          <a href="#contact" className="ti-nav ti-header-contact" style={{ fontSize: 14, fontWeight: 500, color: '#4C5768', textDecoration: 'none', transition: 'color .15s' }}>Contact</a>
          <a href="#access" className="ti-primary" style={{ display: 'inline-flex', alignItems: 'center', height: 38, padding: '0 17px', borderRadius: 8, background: '#2348E0', color: '#FFFFFF', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'background .15s' }}>Request access</a>
        </div>
      </div>
    </header>
  );
}

/* ── Hero ─────────────────────────────────────────────────── */
function Hero() {
  const [counters, setCounters] = useState({ controls: 0, pages: 0, seconds: 0 });
  const rafRef = useRef();

  useEffect(() => {
    const targets = { controls: 12843, pages: 1247, seconds: 34 };
    const dur = 1400, t0 = performance.now();
    const ease = x => 1 - Math.pow(1 - x, 3);
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur), e = ease(p);
      setCounters({ controls: Math.round(targets.controls * e), pages: Math.round(targets.pages * e), seconds: Math.round(targets.seconds * e) });
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

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
              Upload policies, contracts, and evidence. TuneItFine automatically extracts controls, maps them to 40+ frameworks, quantifies risk, and generates audit-ready reports — mapping your chaos to order in minutes, not quarters.
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
              <a href="#pipeline" className="ti-primary" style={{ display: 'inline-flex', alignItems: 'center', height: 50, padding: '0 26px', borderRadius: 10, background: '#2348E0', color: '#FFFFFF', fontSize: 15, fontWeight: 600, textDecoration: 'none', boxShadow: '0 10px 34px rgba(35,72,224,0.4)', transition: 'background .15s' }}>See it in action</a>
              <a href="#taxonomy" className="ti-ghost" style={{ display: 'inline-flex', alignItems: 'center', height: 50, padding: '0 24px', borderRadius: 10, background: '#FFFFFF', border: '1px solid #CAD2E0', color: '#131922', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'border-color .15s' }}>Explore the framework →</a>
            </div>
            {/* Animated counter */}
            <div style={{ marginTop: 40, display: 'flex', alignItems: 'center', gap: 16, padding: '16px 20px', border: '1px solid #E1E6EF', borderRadius: 12, background: '#F7F8FB', maxWidth: 560 }}>
              <Mono size={11} color="#6A7689" spacing="0.08em" style={{ lineHeight: 1.5, flex: 'none' }}>LAST<br />RUN</Mono>
              <div style={{ fontSize: 15, lineHeight: 1.5, color: '#353E4D' }}>
                <Mono size={13} color="#131922" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{fmt(counters.controls)}</Mono> controls extracted from{' '}
                <Mono size={13} color="#131922" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{fmt(counters.pages)}</Mono> pages in{' '}
                <Mono size={13} color="#2348E0" style={{ fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{counters.seconds}s</Mono>
              </div>
            </div>
          </div>

          {/* Extraction preview panel */}
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

        {/* Trust ribbon */}
        <div className="ti-trust-ribbon">
          <span style={{ fontSize: 12.5, color: '#6A7689', marginRight: 6 }}>Maps to the standards your auditors already use</span>
          {['ISO 27001','SOC 2','GDPR','EU AI ACT','NIST AI RMF','ISO 42001'].map(f => (
            <Mono key={f} size={11} color="#4C5768" spacing="0.05em" style={{ padding: '6px 12px', border: '1px solid #E1E6EF', borderRadius: 999 }}>{f}</Mono>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Pipeline ─────────────────────────────────────────────── */
function Pipeline() {
  const [stageIdx, setStageIdx] = useState(2);
  const active = STAGES[stageIdx];

  const inputs = [
    ['POL', 'Policies & SOPs'],
    ['DPA', 'Contracts & DPAs'],
    ['RPT', 'Audit & pen-test reports'],
    ['MOD', 'AI model cards'],
    ['EVI', 'Evidence artifacts'],
  ];
  const outputs = [
    { title: 'Risk Register',     sub: 'FAIR-scored, prioritized',   color: '#BB2E41' },
    { title: 'Control Inventory', sub: 'Deduplicated, owned',         color: '#2348E0' },
    { title: 'Framework Mapping', sub: 'SOC 2 · ISO · AI Act',        color: '#0E8C8C' },
    { title: 'Gap Report',        sub: 'Evidence-backed',             color: '#C77A12' },
  ];

  const cardStyle = { border: '1px solid #E1E6EF', borderRadius: 14, padding: 22 };

  return (
    <section id="pipeline" style={{ padding: '88px 0 24px' }}>
      <div style={{ maxWidth: 620, marginBottom: 44 }}>
        <Mono size={11} color="#A31F34" spacing="0.16em" style={{ display: 'block', marginBottom: 16 }}>THE ENGINE</Mono>
        <h2 style={{ margin: '0 0 14px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#131922' }}>Not a static framework. An executable pipeline.</h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#4C5768' }}>Modeled on the NIST AI RMF, ISO 42001, and COSO — then powered by an agent that reads your organization's truth and constructs a living compliance posture. Select a stage to see what it produces.</p>
      </div>

      <div className="ti-pipeline-grid">
        {/* Inputs */}
        <div style={{ ...cardStyle, background: '#F7F8FB' }}>
          <Mono size={11} color="#6A7689" spacing="0.12em" style={{ display: 'block', marginBottom: 16 }}>INPUT DOCUMENTS</Mono>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {inputs.map(([icon, label]) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: '#FFFFFF', border: '1px solid #E1E6EF', borderRadius: 8 }}>
                <Mono size={10} color="#2348E0" style={{ flex: 'none', background: '#EEF3FF', padding: '3px 6px', borderRadius: 4, letterSpacing: '0.05em' }}>{icon}</Mono>
                <span style={{ fontSize: 13.5, color: '#353E4D' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pipeline stages */}
        <div style={{ ...cardStyle, boxShadow: '0 1px 2px rgba(19,25,34,0.04)' }}>
          <Mono size={11} color="#2348E0" spacing="0.12em" style={{ display: 'block', marginBottom: 16 }}>AI PROCESSING PIPELINE</Mono>
          <div className="ti-stages-grid">
            {STAGES.map((s, i) => {
              const active = i === stageIdx;
              return (
                <div key={s.num} className="ti-stage" onClick={() => setStageIdx(i)}
                  style={{ padding: '14px 12px', borderRadius: 9, border: `1px solid ${active ? '#2348E0' : '#E1E6EF'}`, background: active ? '#EEF3FF' : '#F7F8FB' }}>
                  <Mono size={10} color="#9AA6BC" style={{ display: 'block', marginBottom: 6 }}>{s.num}</Mono>
                  <span style={{ fontSize: 13, fontWeight: 600, color: active ? '#15275F' : '#353E4D', lineHeight: 1.25 }}>{s.name}</span>
                </div>
              );
            })}
          </div>
          {/* Detail */}
          <div style={{ marginTop: 16, padding: 16, border: '1px solid #EEF1F6', borderRadius: 10, background: '#F7F8FB' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <Mono size={11} color="#2348E0">{active.num}</Mono>
              <span style={{ fontSize: 15, fontWeight: 600, color: '#131922' }}>{active.name}</span>
            </div>
            <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.6, color: '#4C5768' }}>{active.desc}</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {active.chips.map(c => (
                <Mono key={c} size={11} color="#353E4D" style={{ background: '#FFFFFF', border: '1px solid #E1E6EF', padding: '4px 9px', borderRadius: 6 }}>{c}</Mono>
              ))}
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div style={{ ...cardStyle, background: '#F7F8FB' }}>
          <Mono size={11} color="#6A7689" spacing="0.12em" style={{ display: 'block', marginBottom: 16 }}>OUTPUT ARTIFACTS</Mono>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {outputs.map(o => (
              <div key={o.title} style={{ padding: '11px 13px', background: '#FFFFFF', border: '1px solid #E1E6EF', borderLeft: `3px solid ${o.color}`, borderRadius: 8 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600, color: '#131922' }}>{o.title}</div>
                <div style={{ fontSize: 12, color: '#6A7689', marginTop: 2 }}>{o.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Taxonomy Treemap ─────────────────────────────────────── */
function TaxonomyTreemap() {
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
        {/* Treemap */}
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
            {[[1,224,'02','Privacy & Security'],[3,212,'04','Malicious Actors'],[2,191,'03','Misinformation'],[4,158,'05','Human–Computer Interaction']].map(([di, cnt, num, name]) => (
              <div key={num} className="ti-tile" onClick={sel(di)} style={{ ...tileStyle(di, cnt), padding: 14 }}>
                <Mono size={11} color="#FFFFFF" style={{ opacity: 0.8 }}>{num}</Mono>
                <div><div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.2 }}>{name}</div><Mono size={11} color="#FFFFFF" style={{ opacity: 0.85, marginTop: 3 }}>{cnt}</Mono></div>
              </div>
            ))}
          </div>
        </div>

        {/* Side panel */}
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

/* ── Coverage Heatmap ─────────────────────────────────────── */
function CoverageHeatmap() {
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
          {/* Header row */}
          <div style={{ display: 'grid', gridTemplateColumns: colTemplate, gap: 8, marginBottom: 8 }}>
            <div />
            {MATRIX_HEADERS.map(h => (
              <div key={h} style={{ textAlign: 'center', fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#4C5768', paddingBottom: 4 }}>{h}</div>
            ))}
          </div>
          {/* Data rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {MATRIX_ROWS.map(([label, cells]) => (
              <div key={label} style={{ display: 'grid', gridTemplateColumns: colTemplate, gap: 8, alignItems: 'center' }}>
                <div style={{ fontSize: 13, color: '#353E4D' }}>{label}</div>
                {cells.map((c, j) => (
                  <div key={j} className="ti-cell" title={`${label} · ${MATRIX_HEADERS[j]} — ${c.t}`}
                    style={{ height: 38, borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', background: c.bg, color: c.fg, fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 500 }}>
                    {c.mark}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {/* Legend */}
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

/* ── Risk Register + Remediation ──────────────────────────── */
function RiskAndRemediation() {
  return (
    <section style={{ padding: '84px 0 24px' }}>
      <div style={{ maxWidth: 620, marginBottom: 36 }}>
        <Mono size={11} color="#A31F34" spacing="0.16em" style={{ display: 'block', marginBottom: 16 }}>FROM RAW DOCUMENTS TO A REMEDIATION ROADMAP</Mono>
        <h2 style={{ margin: '0 0 14px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1.1, letterSpacing: '-0.02em', color: '#131922' }}>34 risks scored. A prioritized plan in minutes.</h2>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#4C5768' }}>Risks are scored with the FAIR methodology, then sequenced into a sprint-based roadmap mapped to control implementations. Export to Jira or ServiceNow.</p>
      </div>

      <div className="ti-risk-layout">
        {/* Register table */}
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

        {/* Remediation Gantt */}
        <div style={{ border: '1px solid #E1E6EF', borderRadius: 14, background: '#FFFFFF', padding: 22, boxShadow: '0 1px 2px rgba(19,25,34,0.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
            <Mono size={11} color="#6A7689" spacing="0.1em">REMEDIATION ROADMAP</Mono>
            <Mono size={11} color="#9AA6BC">12 WEEKS</Mono>
          </div>
          {/* Sprint headers */}
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

/* ── Research Lab + Benchmark ─────────────────────────────── */
function ResearchAndBenchmark() {
  return (
    <section id="lab" style={{ padding: '84px 0 24px' }}>
      <div className="ti-research-layout">
        {/* Lab card */}
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

        {/* Benchmark card */}
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

/* ── Early access ─────────────────────────────────────────── */
function EarlyAccess() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="access" style={{ padding: '8px 0 96px' }}>
      <div className="ti-early-box" style={{ border: '1px solid #E1E6EF', borderRadius: 18, background: '#F7F8FB' }}>
        <div style={{ maxWidth: 480 }}>
          <h2 style={{ margin: '0 0 12px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 30, lineHeight: 1.14, letterSpacing: '-0.02em', color: '#131922' }}>Get the AI-GRC Framework Core</h2>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#4C5768' }}>Download our open mapping of 40+ frameworks to common controls — JSON, YAML, and a working spreadsheet. We'll add you to the private-beta list.</p>
        </div>
        <div className="ti-early-form">
          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', border: '1px solid #1E9E63', background: '#FFFFFF', borderRadius: 12 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10.5 L8.5 15 L16 5.5" stroke="#15814F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: 15, color: '#131922' }}>Check your inbox — the Framework Core is on its way.</span>
            </div>
          ) : (
            <>
              <form onSubmit={e => { e.preventDefault(); if (email.trim()) setSubmitted(true); }} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input type="email" required placeholder="Work email" value={email} onChange={e => setEmail(e.target.value)} className="ti-input"
                  style={{ flex: 1, minWidth: 180, height: 50, padding: '0 16px', borderRadius: 10, border: '1px solid #CAD2E0', background: '#FFFFFF', color: '#131922', fontSize: 15, fontFamily: 'inherit', outline: 'none', transition: 'border-color .15s, box-shadow .15s' }} />
                <button type="submit" className="ti-primary" style={{ height: 50, padding: '0 22px', border: 'none', borderRadius: 10, background: '#2348E0', color: '#FFFFFF', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background .15s' }}>Get the framework</button>
              </form>
              <p style={{ margin: '12px 2px 0', fontSize: 13, color: '#6A7689' }}>For risk, compliance &amp; AI governance teams. No spam.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

/* ── Footer ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer id="contact" style={{ borderTop: '1px solid #E1E6EF', background: '#F7F8FB' }}>
      <div className="ti-container ti-footer-inner">
        <div className="ti-footer-columns">
          <div style={{ maxWidth: 380 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#A31F34' }} />
              <Mono size={11} color="#4C5768" spacing="0.14em">COMING SOON · {LAUNCH_LABEL}</Mono>
            </div>
            <h2 style={{ margin: '0 0 12px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 28, lineHeight: 1.12, letterSpacing: '-0.02em', color: '#131922' }}>Compliance intelligence,<br />finally enterprise-ready.</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#6A7689' }}>TuneItFine is in private beta. Request early access above, or reach the team directly.</p>
          </div>

          <div style={{ minWidth: 220 }}>
            <Mono size={11} color="#9AA6BC" spacing="0.16em" style={{ display: 'block', marginBottom: 16 }}>CONTACT US</Mono>
            <a href="mailto:hello@tuneitfine.ai" className="ti-foot" style={{ display: 'block', fontSize: 17, fontWeight: 600, color: '#131922', textDecoration: 'none', marginBottom: 8, transition: 'color .15s' }}>hello@tuneitfine.ai</a>
            <a href="mailto:partnerships@tuneitfine.ai" className="ti-foot" style={{ display: 'block', fontSize: 14.5, color: '#4C5768', textDecoration: 'none', marginBottom: 16, transition: 'color .15s' }}>partnerships@tuneitfine.ai</a>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#6A7689' }}>One Broadway, 14th Floor<br />Cambridge, MA 02142</p>
          </div>

          <div className="ti-footer-links">
            <div>
              <Mono size={11} color="#9AA6BC" spacing="0.16em" style={{ display: 'block', marginBottom: 16 }}>PLATFORM</Mono>
              {[['#pipeline','The Engine'],['#taxonomy','Risk Taxonomy'],['#coverage','Coverage Matrix']].map(([href, label]) => (
                <a key={label} href={href} className="ti-foot" style={{ display: 'block', fontSize: 14.5, color: '#4C5768', textDecoration: 'none', marginBottom: 11, transition: 'color .15s' }}>{label}</a>
              ))}
            </div>
            <div>
              <Mono size={11} color="#9AA6BC" spacing="0.16em" style={{ display: 'block', marginBottom: 16 }}>COMPANY</Mono>
              {[['#lab','Research Lab'],['#access','Early Access'],['#contact','Careers']].map(([href, label]) => (
                <a key={label} href={href} className="ti-foot" style={{ display: 'block', fontSize: 14.5, color: '#4C5768', textDecoration: 'none', marginBottom: 11, transition: 'color .15s' }}>{label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="ti-footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <rect x="0.75" y="0.75" width="24.5" height="24.5" rx="6" stroke="#2348E0" strokeWidth="1.5" />
              <rect x="6" y="6" width="6.5" height="6.5" rx="1" fill="#2348E0" />
              <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" fill="#A31F34" />
            </svg>
            <span style={{ fontSize: 13, color: '#6A7689' }}>© 2026 TuneItFine Labs, Inc.</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Privacy','Terms','Security','LinkedIn'].map(label => (
              <a key={label} href="#" className="ti-foot" style={{ fontSize: 13, color: '#6A7689', textDecoration: 'none', transition: 'color .15s' }}>{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── Page ─────────────────────────────────────────────────── */
export default function MeridianLanding() {
  return (
    <div style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: '#131922', background: '#FFFFFF' }}>
      <div style={{ height: 3, background: 'linear-gradient(90deg,#2348E0 0%,#2348E0 70%,#A31F34 100%)' }} />
      <Header />
      <Hero />
      <div className="ti-container">
        <Pipeline />
        <TaxonomyTreemap />
        <CoverageHeatmap />
        <RiskAndRemediation />
        <ResearchAndBenchmark />
        <EarlyAccess />
      </div>
      <Footer />
    </div>
  );
}
