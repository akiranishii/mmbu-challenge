'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X, Pause, Play } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import content from '@/lib/content.json';
import { assetPath } from '@/lib/asset-path';

const sections = ['Home', 'About', 'Tracks', 'Sponsors', 'FAQ'];

export function Header() {
  const [open, setOpen] = useState(false);
  return <header className="site-header">
    <div className="nav-inner page-width">
      <a href="#home" className="wordmark" aria-label="MMBU home">MMBU<span className="brand-dot" /></a>
      <nav className="desktop-nav" aria-label="Main navigation">{sections.map(section => <a key={section} href={`#${section.toLowerCase()}`}>{section}</a>)}</nav>
      <a className="nav-brief" href={assetPath('/Challenge.pdf')}>Challenge brief<ArrowUpRight size={16} /></a>
      <Collapsible open={open} onOpenChange={setOpen} className="mobile-navigation">
        <CollapsibleTrigger className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'}>{open ? <X /> : <Menu />}</CollapsibleTrigger>
        <CollapsibleContent className="mobile-menu"><nav aria-label="Mobile navigation">{sections.map(section => <a key={section} href={`#${section.toLowerCase()}`} onClick={() => setOpen(false)}>{section}<ArrowUpRight size={18} /></a>)}</nav></CollapsibleContent>
      </Collapsible>
    </div>
  </header>;
}

export function HeroMotion() {
  const video = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<'intro' | 'video' | 'outro'>('intro');
  const [paused, setPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) setPaused(true);
    const change = (event: MediaQueryListEvent) => { if (event.matches) setPaused(true); };
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    if (paused) { video.current?.pause(); return; }
    if (phase === 'video') {
      video.current?.play().catch(() => { setPaused(true); setPhase('intro'); });
      return;
    }
    const timer = window.setTimeout(() => {
      if (phase === 'intro') { setPhase('video'); }
      else { if (video.current) video.current.currentTime = 0; setProgress(0); setPhase('intro'); }
    }, phase === 'intro' ? 1800 : 2200);
    return () => window.clearTimeout(timer);
  }, [phase, paused]);

  return <div className="hero-media">
    <div className={`motion-stage phase-${phase}`}>
      <video ref={video} width="960" height="384" muted playsInline preload="auto" poster={assetPath('/assets/mmbu-logo.png')} aria-label="Animated mosaic of biomedical imagery"
        onEnded={() => { setPhase('outro'); setProgress(100); }}
        onError={() => { setPhase('intro'); setPaused(true); }}
        onTimeUpdate={() => { const el = video.current; if (el?.duration) setProgress((el.currentTime / el.duration) * 100); }}>
        <source src={assetPath('/assets/mmbu-mosaic.mp4')} type="video/mp4" />
      </video>
      <div className="logo-frame" aria-hidden={phase === 'video'}>
        <img src={assetPath('/assets/mmbu-logo.png')} alt="MMBU mosaic banner with GXL, Anthropic, Stanford AI Lab, Highlanders, and AWS" width="1728" height="688" fetchPriority="high" />
      </div>
      <button className="motion-toggle" onClick={() => setPaused(!paused)} aria-label={paused ? 'Play animation' : 'Pause animation'}>{paused ? <Play size={15} fill="currentColor" /> : <Pause size={15} fill="currentColor" />}</button>
      <div className="motion-progress" aria-hidden="true"><span style={{ width: `${phase === 'outro' ? 100 : progress}%` }} /></div>
    </div>
  </div>;
}

export function Questions() {
  return <Accordion className="questions" defaultValue={['question-0']} multiple>
    {content.faq.items.map((item, index) => <AccordionItem key={item.question} value={`question-${index}`} className="question-item">
      <AccordionTrigger className="question-trigger"><span className="question-number">0{index + 1}</span><span>{item.question}</span></AccordionTrigger>
      <AccordionContent className="question-answer" keepMounted><p dangerouslySetInnerHTML={{ __html: item.answer.replace('href="/Challenge.pdf"', `href="${assetPath('/Challenge.pdf')}"`) }} /></AccordionContent>
    </AccordionItem>)}
  </Accordion>;
}
