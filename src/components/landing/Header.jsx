import { Logo } from '../ui/Logo';

export function Header() {
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
