import { Metadata } from 'next';
import { featuresMetadata } from '../metadata';

export const metadata: Metadata = featuresMetadata;

export default function FeaturesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
