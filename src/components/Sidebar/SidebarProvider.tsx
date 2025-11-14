'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import { SidebarContext } from './SidebarContext';

export default function SidebarProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);
  // Start with a deterministic default to avoid SSR/CSR mismatch
  const [sidebarExpanded, setSidebarExpanded] = useState<boolean>(false);

  // Load saved state on client after mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('sidebarExpanded');
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        setSidebarExpanded(parsed);
        // reflect immediately in CSS var for first paint after mount
        document.documentElement.style.setProperty(
          '--sidebar-ml',
          parsed ? '16rem' : '0px'
        );
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('sidebarExpanded', JSON.stringify(sidebarExpanded));
    } catch {}

    // Set a CSS variable for global layout offset (64 => 16rem)
    try {
      const value = sidebarExpanded ? '16rem' : '0px';
      document.documentElement.style.setProperty('--sidebar-ml', value);
    } catch {}

    // Notify listeners (if any) via a custom event
    try {
      window.dispatchEvent(
        new CustomEvent('sidebar:expanded-changed', {
          detail: { expanded: sidebarExpanded },
        })
      );
    } catch {}
  }, [sidebarExpanded]);

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        setIsOpen,
        sidebarExpanded,
        setSidebarContext: setSidebarExpanded,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
