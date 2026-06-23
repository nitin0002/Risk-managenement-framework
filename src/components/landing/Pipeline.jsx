import { useState } from 'react';
import { Mono } from '../ui/Mono';

const STAGES = [
  { num: '01', name: 'Document Ingestion', desc: 'OCR, layout parsing, and segmentation turn unstructured PDFs into clean, citable text spans.', chips: ['OCR', 'Layout parse', 'Clause split'] },
  { num: '02', name: 'Knowledge Graph',    desc: 'Entities, obligations, and relationships are linked into a queryable graph of your compliance reality.', chips: ['Entity linking', 'Obligations', 'Provenance'] },
  { num: '03', name: 'Control Extraction', desc: 'The agent identifies implemented controls and binds each to its source language and evidence.', chips: ['Control mining', 'Evidence bind', 'Dedup'] },
  { num: '04', name: 'Risk Scoring',       desc: 'Residual risk is quantified using the FAIR methodology - configurable to your loss model.', chips: ['FAIR', 'Likelihood', 'Impact'] },
  { num: '05', name: 'Compliance Mapping', desc: 'Controls are mapped to 40+ frameworks, surfacing overlaps and coverage gaps automatically.', chips: ['ISO 27001', 'EU AI Act', 'NIST RMF'] },
  { num: '06', name: 'Evidence Generation',desc: 'Audit-ready packs are compiled with cross-references, control language, and timestamps.', chips: ['SOC 2 pack', 'Cross-ref', 'Export'] },
];

export function Pipeline() {
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
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.65, color: '#4C5768' }}>Modeled on the NIST AI RMF, ISO 42001, and COSO - then powered by an agent that reads your organization's truth and constructs a living compliance posture. Select a stage to see what it produces.</p>
      </div>

      <div className="ti-pipeline-grid">
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
