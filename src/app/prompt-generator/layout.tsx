import { Metadata } from 'next';
import { imagePromptGeneratorMetadata } from '../metadata';

export const metadata: Metadata = imagePromptGeneratorMetadata;

export default function ImagePromptGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
