import { useState } from 'react';
import './MeridianLanding.css';

const LAUNCH_LABEL = 'Fall 2026';

const DOMAINS = [
  { num: '01', color: '#BB2E41', name: 'Discrimination & Toxicity',     desc: 'Unfair treatment, harmful content exposure, and unequal performance across groups.',        pct: 68,  count: 268 },
  { num: '02', color: '#3F4FC4', name: 'Privacy & Security',            desc: 'Unauthorized access to sensitive data and exploitable system vulnerabilities.',               pct: 57,  count: 224 },
  { num: '03', color: '#C77A12', name: 'Misinformation',                desc: 'Generation and spread of false information that erodes shared reality.',                      pct: 48,  count: 191 },
  { num: '04', color: '#8A2E8F', name: 'Malicious Actors',              desc: 'Intentional misuse — disinformation, fraud, cyberattacks, and mass harm.',                   pct: 54,  count: 212 },
  { num: '05', color: '#0E8C8C', name: 'Human–Computer Interaction',    desc: 'Overreliance, lost agency, and unsafe human–AI relationships.',                               pct: 40,  count: 158 },
  { num: '06', color: '#2E8B57', name: 'Socioeconomic & Environmental', desc: 'Inequality, power concentration, governance failure, and environmental harm.',                 pct: 100, count: 396 },
  { num: '07', color: '#2E5C8A', name: 'AI System Safety',              desc: 'Misaligned goals, dangerous capabilities, and failures of robustness.',                       pct: 74,  count: 294 },
];

function MeridianLogo() {
  return (
    <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 11, textDecoration: 'none' }}>
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect x="0.75" y="0.75" width="24.5" height="24.5" rx="6" stroke="#2348E0" strokeWidth="1.5" />
        <rect x="6" y="6" width="6.5" height="6.5" rx="1" fill="#2348E0" />
        <rect x="13.5" y="6" width="6.5" height="6.5" rx="1" fill="#8AA3FF" />
        <rect x="6" y="13.5" width="6.5" height="6.5" rx="1" fill="#8AA3FF" />
        <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" fill="#A31F34" />
      </svg>
      <span style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 19, letterSpacing: '-0.01em', color: '#131922' }}>Meridian</span>
      <span className="mr-logo-tagline" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10, letterSpacing: '0.14em', color: '#6A7689', borderLeft: '1px solid #E1E6EF', paddingLeft: 11 }}>RISK&nbsp;INTELLIGENCE</span>
    </a>
  );
}

function Header() {
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(255,255,255,0.86)', backdropFilter: 'saturate(180%) blur(12px)', borderBottom: '1px solid #E1E6EF' }}>
      <div className="mr-container mr-header-inner">
        <MeridianLogo />
        <nav className="mr-header-nav">
          {[['#platform', 'Platform'], ['#taxonomy', 'Taxonomy'], ['#approach', 'Approach'], ['#contact', 'Company']].map(([href, label]) => (
            <a key={label} href={href} className="mr-nav" style={{ fontSize: 14, fontWeight: 500, color: '#4C5768', textDecoration: 'none', transition: 'color .15s' }}>{label}</a>
          ))}
        </nav>
        <div className="mr-header-actions">
          <a href="#contact" className="mr-nav mr-header-contact" style={{ fontSize: 14, fontWeight: 500, color: '#4C5768', textDecoration: 'none', transition: 'color .15s' }}>Contact</a>
          <a href="#early" className="mr-primary" style={{ display: 'inline-flex', alignItems: 'center', height: 38, padding: '0 17px', borderRadius: 8, background: '#2348E0', color: '#FFFFFF', fontSize: 14, fontWeight: 600, textDecoration: 'none', transition: 'background .15s' }}>Request access</a>
        </div>
      </div>
    </header>
  );
}

function DomainCoveragePanel() {
  return (
    <div className="mr-hero-panel" style={{ border: '1px solid #E1E6EF', borderRadius: 14, background: '#FFFFFF', boxShadow: '0 4px 10px rgba(19,25,34,0.06), 0 16px 32px rgba(19,25,34,0.08)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderBottom: '1px solid #EEF1F6', background: '#F7F8FB' }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.1em', color: '#4C5768' }}>DOMAIN&nbsp;COVERAGE</span>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, color: '#6A7689' }}>7 / 7 mapped</span>
      </div>
      <div style={{ padding: '18px 18px 8px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {DOMAINS.map(d => (
            <div key={d.num} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flex: 'none' }} />
              <span className="mr-domain-name" style={{ fontSize: 13, color: '#353E4D' }}>{d.name}</span>
              <span style={{ flex: 1, height: 6, borderRadius: 3, background: '#EEF1F6', overflow: 'hidden' }}>
                <span style={{ display: 'block', height: '100%', width: `${d.pct}%`, background: d.color, borderRadius: 3 }} />
              </span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#6A7689', width: 34, textAlign: 'right' }}>{d.count}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', borderTop: '1px solid #EEF1F6', marginTop: 10 }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#131922', fontWeight: 500 }}>1,743 risks mapped</span>
        <span style={{ fontSize: 12, color: '#6A7689' }}>Updated continuously</span>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="mr-hero">
      <div className="mr-hero-text">
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: '#6A7689', marginBottom: 26 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#A31F34' }} />
          AI&nbsp;RISK&nbsp;INTELLIGENCE
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: '#CAD2E0' }} />
          COMING&nbsp;SOON · {LAUNCH_LABEL}
        </div>
        <h1 style={{ margin: 0, fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 'clamp(36px,5vw,60px)', lineHeight: 1.06, letterSpacing: '-0.025em', color: '#131922', textWrap: 'balance' }}>
          The system of record for enterprise AI risk.
        </h1>
        <p style={{ margin: '26px 0 0', fontSize: 'clamp(16px,2vw,19px)', lineHeight: 1.6, color: '#4C5768', maxWidth: 540 }}>
          Meridian turns the MIT AI Risk taxonomy — over 1,700 documented risks across seven domains — into continuous, audit-grade governance. One repository for the risks your models carry, the controls that contain them, and the evidence your board expects.
        </p>
        <div style={{ display: 'flex', gap: 14, marginTop: 34, flexWrap: 'wrap' }}>
          <a href="#early" className="mr-primary" style={{ display: 'inline-flex', alignItems: 'center', height: 48, padding: '0 24px', borderRadius: 9, background: '#2348E0', color: '#FFFFFF', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'background .15s' }}>Request early access</a>
          <a href="#approach" className="mr-ghost" style={{ display: 'inline-flex', alignItems: 'center', height: 48, padding: '0 22px', borderRadius: 9, background: '#FFFFFF', border: '1px solid #CAD2E0', color: '#131922', fontSize: 15, fontWeight: 600, textDecoration: 'none', transition: 'border-color .15s' }}>Read the approach →</a>
        </div>
        <p style={{ margin: '20px 2px 0', fontSize: 13, color: '#6A7689' }}>Private beta · for risk, compliance &amp; AI governance teams.</p>
      </div>
      <DomainCoveragePanel />
    </section>
  );
}

function StatBand() {
  const stats = [
    { value: '1,700+', label: 'Documented AI risks', accent: true },
    { value: '7',      label: 'Risk domains' },
    { value: '24',     label: 'Subdomains' },
    { value: '74',     label: 'Source frameworks' },
  ];
  return (
    <section className="mr-stat-band">
      {stats.map(s => (
        <div key={s.label} className="mr-stat-item">
          <div style={{ fontFamily: "'Source Serif 4', serif", fontSize: 'clamp(32px,4vw,42px)', fontWeight: 600, letterSpacing: '-0.02em', color: '#131922' }}>
            {s.accent ? <>1,700<span style={{ color: '#2348E0' }}>+</span></> : s.value}
          </div>
          <div style={{ fontSize: 13.5, color: '#6A7689', marginTop: 6 }}>{s.label}</div>
        </div>
      ))}
    </section>
  );
}

function Taxonomy() {
  return (
    <section id="taxonomy" style={{ padding: '88px 0 24px' }}>
      <div className="mr-taxonomy-header">
        <div style={{ maxWidth: 560 }}>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.16em', color: '#A31F34', marginBottom: 16 }}>THE TAXONOMY</div>
          <h2 style={{ margin: 0, fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 'clamp(26px,3vw,36px)', lineHeight: 1.12, letterSpacing: '-0.02em', color: '#131922' }}>Seven domains. One shared language for risk.</h2>
        </div>
        <p style={{ maxWidth: 380, fontSize: 15, lineHeight: 1.65, color: '#4C5768', margin: 0 }}>Meridian is built on the MIT AI Risk Repository — a peer-reviewed structure adopted by researchers, auditors, and regulators worldwide.</p>
      </div>

      <div className="mr-taxonomy-grid">
        {DOMAINS.map(d => (
          <div key={d.num} className="mr-domain" style={{ padding: '24px 22px', border: '1px solid #E1E6EF', borderRadius: 12, background: '#FFFFFF', transition: 'border-color .15s, box-shadow .15s' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, color: '#9AA6BC' }}>{d.num}</span>
              <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
            </div>
            <h3 style={{ margin: '0 0 8px', fontSize: 16.5, fontWeight: 600, color: '#131922' }}>{d.name}</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#6A7689' }}>{d.desc}</p>
          </div>
        ))}
        <div className="mr-taxonomy-summary" style={{ padding: '24px 22px', border: '1px dashed #CAD2E0', borderRadius: 12, background: '#F7F8FB' }}>
          <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#4C5768', maxWidth: 460 }}>Each domain resolves into 24 subdomains and links back to its source research — every risk traceable to evidence.</p>
          <a href="#early" className="mr-nav" style={{ fontSize: 14, fontWeight: 600, color: '#2348E0', textDecoration: 'none', whiteSpace: 'nowrap', transition: 'color .15s' }}>See the full register →</a>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  const steps = [
    { num: '01 / Map',     title: 'Continuous risk mapping',  body: 'Every model, prompt, and data flow scored live against all seven domains — no spreadsheets, no blind spots, no point-in-time audits.' },
    { num: '02 / Control', title: 'Audit-grade evidence',     body: 'Immutable, timestamped controls mapped to ISO 42001, the NIST AI RMF, and the EU AI Act — exported on demand.' },
    { num: '03 / Scale',   title: 'Governance that scales',   body: 'From one pilot to thousands of deployed systems — ownership, policy, and escalation that grow with your AI estate.' },
  ];
  return (
    <section id="approach" style={{ padding: '84px 0' }}>
      <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.16em', color: '#A31F34', marginBottom: 42 }}>HOW MERIDIAN WORKS</div>
      <div id="platform" className="mr-approach-grid">
        {steps.map(s => (
          <div key={s.num} style={{ borderTop: '2px solid #131922', paddingTop: 24 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: '#2348E0', marginBottom: 14 }}>{s.num}</div>
            <h3 style={{ margin: '0 0 10px', fontSize: 20, fontWeight: 600, letterSpacing: '-0.01em', color: '#131922' }}>{s.title}</h3>
            <p style={{ margin: 0, fontSize: 15, lineHeight: 1.65, color: '#4C5768' }}>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function EarlyAccess() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section id="early" style={{ padding: '8px 0 96px' }}>
      <div className="mr-early-box" style={{ border: '1px solid #E1E6EF', borderRadius: 18, background: '#F7F8FB' }}>
        <div style={{ maxWidth: 480 }}>
          <h2 style={{ margin: '0 0 12px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 30, lineHeight: 1.14, letterSpacing: '-0.02em', color: '#131922' }}>Request early access</h2>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.6, color: '#4C5768' }}>We're onboarding a small group of design partners ahead of general availability. Tell us where to reach you.</p>
        </div>
        <div className="mr-early-form">
          {submitted ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '18px 20px', border: '1px solid #1E9E63', background: '#FFFFFF', borderRadius: 12 }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10.5 L8.5 15 L16 5.5" stroke="#15814F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span style={{ fontSize: 15, color: '#131922' }}>You're on the list — we'll be in touch before launch.</span>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <input
                  type="email"
                  required
                  placeholder="Work email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="mr-input"
                  style={{ flex: 1, minWidth: 180, height: 50, padding: '0 16px', borderRadius: 10, border: '1px solid #CAD2E0', background: '#FFFFFF', color: '#131922', fontSize: 15, fontFamily: 'inherit', outline: 'none', transition: 'border-color .15s, box-shadow .15s' }}
                />
                <button type="submit" className="mr-primary" style={{ height: 50, padding: '0 22px', border: 'none', borderRadius: 10, background: '#2348E0', color: '#FFFFFF', fontSize: 15, fontWeight: 600, cursor: 'pointer', transition: 'background .15s' }}>Notify me</button>
              </form>
              <p style={{ margin: '12px 2px 0', fontSize: 13, color: '#6A7689' }}>No spam. One launch note and the occasional research brief.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" style={{ borderTop: '1px solid #E1E6EF', background: '#F7F8FB' }}>
      <div className="mr-container mr-footer-inner">
        <div className="mr-footer-columns">
          <div style={{ maxWidth: 380 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 18 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#A31F34' }} />
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.14em', color: '#4C5768' }}>COMING SOON · {LAUNCH_LABEL}</span>
            </div>
            <h2 style={{ margin: '0 0 12px', fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: 28, lineHeight: 1.12, letterSpacing: '-0.02em', color: '#131922' }}>Risk intelligence,<br />finally enterprise-ready.</h2>
            <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#6A7689' }}>Meridian is in private beta. Join the early-access list, or reach the team directly.</p>
          </div>

          <div style={{ minWidth: 220 }}>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.16em', color: '#9AA6BC', marginBottom: 16 }}>CONTACT US</div>
            <a href="mailto:hello@meridianrisk.ai" className="mr-foot" style={{ display: 'block', fontSize: 17, fontWeight: 600, color: '#131922', textDecoration: 'none', marginBottom: 8, transition: 'color .15s' }}>hello@meridianrisk.ai</a>
            <a href="mailto:partnerships@meridianrisk.ai" className="mr-foot" style={{ display: 'block', fontSize: 14.5, color: '#4C5768', textDecoration: 'none', marginBottom: 16, transition: 'color .15s' }}>partnerships@meridianrisk.ai</a>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: '#6A7689' }}>One Broadway, 14th Floor<br />Cambridge, MA 02142</p>
          </div>

          <div className="mr-footer-links">
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.16em', color: '#9AA6BC', marginBottom: 16 }}>PLATFORM</div>
              {[['#platform', 'Risk mapping'], ['#platform', 'Evidence & audit'], ['#taxonomy', 'Taxonomy']].map(([href, label]) => (
                <a key={label} href={href} className="mr-foot" style={{ display: 'block', fontSize: 14.5, color: '#4C5768', textDecoration: 'none', marginBottom: 11, transition: 'color .15s' }}>{label}</a>
              ))}
            </div>
            <div>
              <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, letterSpacing: '0.16em', color: '#9AA6BC', marginBottom: 16 }}>COMPANY</div>
              {[['#approach', 'Approach'], ['#contact', 'Careers'], ['#contact', 'Press']].map(([href, label]) => (
                <a key={label} href={href} className="mr-foot" style={{ display: 'block', fontSize: 14.5, color: '#4C5768', textDecoration: 'none', marginBottom: 11, transition: 'color .15s' }}>{label}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="mr-footer-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <svg width="20" height="20" viewBox="0 0 26 26" fill="none" aria-hidden="true">
              <rect x="0.75" y="0.75" width="24.5" height="24.5" rx="6" stroke="#2348E0" strokeWidth="1.5" />
              <rect x="6" y="6" width="6.5" height="6.5" rx="1" fill="#2348E0" />
              <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" fill="#A31F34" />
            </svg>
            <span style={{ fontSize: 13, color: '#6A7689' }}>© 2026 Meridian Risk Intelligence, Inc.</span>
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {['Privacy', 'Terms', 'Security', 'LinkedIn'].map(label => (
              <a key={label} href="#" className="mr-foot" style={{ fontSize: 13, color: '#6A7689', textDecoration: 'none', transition: 'color .15s' }}>{label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function MeridianLanding() {
  return (
    <div style={{ fontFamily: "'Hanken Grotesk', system-ui, sans-serif", color: '#131922', background: '#FFFFFF' }}>
      <div style={{ height: 3, background: '#2348E0' }} />
      <Header />
      <div id="top" className="mr-container">
        <Hero />
        <StatBand />
        <Taxonomy />
        <Approach />
        <EarlyAccess />
      </div>
      <Footer />
    </div>
  );
}
