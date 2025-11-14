'use client';

import { PropsWithChildren } from 'react';
import Sidebar from '@/components/Sidebar';

export default function ClientShell({ children }: PropsWithChildren) {
  return (
    <>
      <Sidebar />
      {/* Use CSS variable driven margin only on lg screens. On small screens it's always 0. */}
      <div className="min-h-screen ml-0 lg:ml-[var(--sidebar-ml)]">
        {children}
      </div>
    </>
  );
}
