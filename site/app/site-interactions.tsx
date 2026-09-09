'use client';

import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
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

export function Questions() {
  return <Accordion className="questions" defaultValue={['question-0']} multiple>
    {content.faq.items.map((item, index) => <AccordionItem key={item.question} value={`question-${index}`} className="question-item">
      <AccordionTrigger className="question-trigger"><span className="question-number">0{index + 1}</span><span>{item.question}</span></AccordionTrigger>
      <AccordionContent className="question-answer" keepMounted><p dangerouslySetInnerHTML={{ __html: item.answer.replace('href="/Challenge.pdf"', `href="${assetPath('/Challenge.pdf')}"`) }} /></AccordionContent>
    </AccordionItem>)}
  </Accordion>;
}
