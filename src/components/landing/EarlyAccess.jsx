import { useState } from 'react';

export function EarlyAccess() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="access" style={{ padding: '8px 0 96px' }}>
      <div className="ti-early-box" style={{ border: '1px solid #E1E6EF', borderRadius: 18, background: '#F7F8FB' }}>
        <div style={{ maxWidth: 480 }}>
          <h2 style={{ margin: '0 0 12px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 30, lineHeight: 1.14, letterSpacing: '-0.02em', color: '#131922' }}>Get the AI-GRC Framework Core</h2>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#4C5768' }}>Download our open mapping of 40+ frameworks to common controls - JSON, YAML, and a working spreadsheet. We'll add you to the private-beta list.</p>
        </div>
        <div className="ti-early-form">
          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', border: '1px solid #1E9E63', background: '#FFFFFF', borderRadius: 12 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 10.5 L8.5 15 L16 5.5" stroke="#15814F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span style={{ fontSize: 15, color: '#131922' }}>Check your inbox - the Framework Core is on its way.</span>
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
