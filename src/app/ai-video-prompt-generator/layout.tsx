import { Metadata } from 'next';
import { aiVideoPromptGeneratorMetadata } from '../metadata';

export const metadata: Metadata = aiVideoPromptGeneratorMetadata;

export default function AIVideoPromptGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
