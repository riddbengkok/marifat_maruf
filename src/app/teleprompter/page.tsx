import type { Metadata } from 'next';
import TeleprompterClient from './teleprompter-client';

export const metadata: Metadata = {
  title: 'Online Teleprompter | Teks Berjalan Otomatis',
  description:
    'Use our free online teleprompter for smooth video recording and presentations. Features adjustable speed, font size, camera integration, and automatic scrolling text (teks berjalan otomatis).',
  keywords: [
    'teleprompter',
    'online teleprompter',
    'free teleprompter',
    'camera teleprompter',
    'video teleprompter',
    'script prompter',
    'teks berjalan otomatis',
    'auto-scrolling text',
    'aplikasi teleprompter',
  ],
  authors: [{ name: 'Marifat Maruf' }],
  creator: 'Marifat Maruf',
  publisher: 'Marifat Maruf',
};

export default function TeleprompterPage() {
  return <TeleprompterClient />;
}
