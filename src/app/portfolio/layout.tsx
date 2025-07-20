import { Metadata } from 'next';
import { portfolioMetadata } from '../metadata';

export const metadata: Metadata = portfolioMetadata;

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
