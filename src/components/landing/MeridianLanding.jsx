import '../../styles/landing.css';
import { Header } from './Header';
import { Hero } from './Hero';
import { Pipeline } from './Pipeline';
import { TaxonomyTreemap } from './TaxonomyTreemap';
import { CoverageHeatmap } from './CoverageHeatmap';
import { RiskAndRemediation } from './RiskAndRemediation';
import { ResearchAndBenchmark } from './ResearchAndBenchmark';
import { EarlyAccess } from './EarlyAccess';
import { Footer } from './Footer';

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
