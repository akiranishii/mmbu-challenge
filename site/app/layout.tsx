import type { Metadata } from 'next';
import { assetPath } from '@/lib/asset-path';
import './globals.css';

export const metadata: Metadata = {
  title: 'MMBU Challenge',
  description: 'The Massive Multimodal Biomedical Understanding Challenge. Organized by Stanford MARVL.',
  icons: { icon: assetPath('/favicon.svg') },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
