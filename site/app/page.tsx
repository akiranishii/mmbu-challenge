import { ArrowDown, ArrowUpRight, MoveUpRight, Scan, Focus, Gauge } from 'lucide-react';
import content from '@/lib/content.json';
import { assetPath } from '@/lib/asset-path';
import { Header, Questions } from './site-interactions';

export const dynamic = 'force-static';

const registration = 'mailto:rdcunha@stanford.edu,lozanoe@stanford.edu?subject=MMBU%20Challenge%20registration';
const trackIcons = [Scan, Focus, Gauge];
// Display the supplied artwork within its visible bounds, retaining the original files.
const sponsorLogos = [
  { src: 'gxl.svg', width: 644, height: 285, bounds: [60, 60, 524, 165] },
  { src: 'anthropic.png', width: 2000, height: 2000, bounds: [0, 880, 2000, 240] },
  { src: 'stanford-ai-lab.png', width: 1998, height: 787, bounds: [0, 0, 1998, 787] },
  { src: 'highlanders.png', width: 2103, height: 748, bounds: [180, 278, 1770, 175] },
  { src: 'aws.webp', width: 1280, height: 767, bounds: [0, 0, 1280, 767] },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <section className="hero" id="home" aria-labelledby="hero-title">
          <div className="hero-art" aria-hidden="true">
            <img src={assetPath('/assets/mmbu-logo-updated.png')} width="2380" height="2380" alt="" fetchPriority="high" />
          </div>
          <div className="hero-inner page-width">
            <div className="hero-copy">
              <p className="eyebrow"><span className="status-dot" />Stanford MARVL</p>
              <h1 id="hero-title">MMBU<br /><span>Challenge</span></h1>
              <p className="hero-description">Advance visual perception in biomedical multimodal models.</p>
              <div className="hero-actions">
                <a className="button button-primary" href={registration}>Apply to participate<ArrowUpRight size={20} /></a>
                <a className="button button-outline" href={assetPath('/Challenge.pdf')}>Challenge brief<ArrowUpRight size={18} /></a>
              </div>
            </div>
          </div>
          <div className="hero-bottom page-width">
            <span>Massive Multimodal<br />Biomedical Understanding</span>
            <a href="#about" aria-label="About the MMBU Challenge"><ArrowDown size={21} /></a>
          </div>
        </section>
        <section className="snapshot page-width" aria-label="Challenge snapshot">
          {[['3', 'tracks'], ['4', 'task types'], ['2', 'eval passes'], ['6', 'context fields']].map(([number, label]) => (
            <div className="stat" key={label}><strong>{number}</strong><span>{label}</span></div>
          ))}
        </section>
        <section className="section about-section page-width" id="about" aria-labelledby="about-title">
          <div className="section-heading">
            <p className="eyebrow section-label"><span>01</span>{content.about.label}</p>
            <h2 id="about-title">Massive Multimodal<br /><span>Biomedical Understanding</span></h2>
          </div>
          <div className="about-copy">
            <p className="lead">{content.about.paragraphs[0]}</p>
            <p>{content.about.paragraphs[1]}</p>
          </div>
          <a className="task-figure" href={assetPath('/assets/figure-2.jpg')} target="_blank" rel="noopener noreferrer" aria-label="Open the full-size example MMBU tasks figure">
            <img src={assetPath('/assets/figure-2.jpg')} alt="Example MMBU tasks: classification, detection, and segmentation" width="1600" height="1600" loading="lazy" />
            <span className="figure-expand" aria-hidden="true"><MoveUpRight size={20} /></span>
          </a>
        </section>
        <section className="tracks-section" id="tracks" aria-labelledby="tracks-title">
          <div className="page-width section">
            <div className="section-heading">
              <p className="eyebrow section-label"><span>02</span>{content.tracks.label}</p>
              <h2 id="tracks-title">Pick a track.<br /><span>Submit one model.</span></h2>
              <p className="lead">{content.tracks.paragraphs[0]}</p>
            </div>
            <div className="track-grid">
              {content.tracks.items.map((track, i) => {
                const Icon = trackIcons[i];
                return <article className="track-card" key={track.name}>
                  <div className="track-top"><p className="eyebrow">{track.label}</p><Icon size={25} strokeWidth={1.3} /></div>
                  <span className="track-number" aria-hidden="true">0{i + 1}</span>
                  <h3>{track.name}</h3>
                  <p>{track.description}</p>
                </article>;
              })}
            </div>
          </div>
        </section>
        <section className="section sponsors-section page-width" id="sponsors" aria-labelledby="sponsors-title">
          <p className="eyebrow section-label"><span>03</span>{content.sponsors.label}</p>
          <h2 id="sponsors-title">{content.sponsors.heading}</h2>
          <p className="lead">{content.sponsors.paragraphs[0]}</p>
          <ul className="sponsor-row">{content.sponsors.names.map((name, i) => {
            const logo = sponsorLogos[i];
            const [x, y, width, height] = logo.bounds;
            return <li className={`sponsor sponsor-${i}`} key={name}>
              <span className="sponsor-mark" style={{ aspectRatio: `${width} / ${height}` }}>
                <img src={assetPath(`/assets/sponsors/${logo.src}`)} alt={name} width={logo.width} height={logo.height} loading="lazy"
                  style={{ width: `${logo.width / width * 100}%`, height: `${logo.height / height * 100}%`, left: `${-x / width * 100}%`, top: `${-y / height * 100}%` }} />
              </span>
            </li>;
          })}</ul>
        </section>
        <section className="faq-section" id="faq" aria-labelledby="faq-title">
          <div className="page-width section faq-layout">
            <div className="section-heading">
              <p className="eyebrow section-label"><span>04</span>{content.faq.label}</p>
              <h2 id="faq-title">Common<br /><span>questions</span></h2>
            </div>
            <Questions />
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="page-width">
          <a className="footer-wordmark" href="#home" aria-label="MMBU home">MMBU<ArrowUpRight strokeWidth={0.8} aria-hidden="true" /></a>
          <div className="footer-bottom">
            <p>MMBU Challenge · Stanford MARVL</p>
            <nav aria-label="Footer"><a href={assetPath('/Challenge.pdf')}>Brief<ArrowUpRight size={14} /></a><a href="https://arxiv.org/abs/2606.06696" target="_blank" rel="noopener noreferrer">Paper<ArrowUpRight size={14} /></a><a href="https://marvl.stanford.edu/" target="_blank" rel="noopener noreferrer">MARVL<ArrowUpRight size={14} /></a><a href="mailto:rdcunha@stanford.edu">Contact<ArrowUpRight size={14} /></a></nav>
          </div>
        </div>
      </footer>
    </>
  );
}
