import { Mono } from '../ui/Mono';
import { Logo } from '../ui/Logo';
import { LAUNCH_LABEL } from '../../lib/chart';

export function Footer() {
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
