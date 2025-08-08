export interface User {
  email: string | null;
  firstName?: string;
  lastName?: string;
  phone?: string;
}

export type SubscriptionStatus = 'active' | 'inactive' | 'none' | null;

export interface GeneratorLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

export interface SnapJsOptions {
  onSuccess?: (result: unknown) => void;
  onPending?: (result: unknown) => void;
  onError?: (result: unknown) => void;
  onClose?: () => void;
}

declare global {
  interface Window {
    snap?: {
      pay: (token: string, options?: SnapJsOptions) => void;
    };
  }
}
