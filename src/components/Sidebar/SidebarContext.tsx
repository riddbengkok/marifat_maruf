import { createContext } from 'react';

export interface SidebarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  sidebarExpanded: boolean;
  setSidebarContext: (expanded: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType>({
  isOpen: false,
  setIsOpen: () => {},
  sidebarExpanded: true,
  setSidebarContext: () => {},
});
