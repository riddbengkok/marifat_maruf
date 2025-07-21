import { auth, googleProvider } from '@/lib/firebase';
import {
  User as FirebaseUser,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

// Subscription Context Types
export type SubscriptionStatus = 'active' | 'inactive' | 'none';
interface SubscriptionContextType {
  status: SubscriptionStatus;
  refresh: () => Promise<void>;
  loading: boolean;
}

const SubscriptionContext = createContext<SubscriptionContextType>({
  status: 'none',
  refresh: async () => {},
  loading: false,
});

// Accepts a FirebaseUser or null
interface SubscriptionProviderProps {
  user: FirebaseUser | null;
  children: ReactNode;
}

export function SubscriptionProvider({
  user,
  children,
}: SubscriptionProviderProps) {
  const [status, setStatus] = useState<SubscriptionStatus>('none');
  const [loading, setLoading] = useState(false);

  // Helper to get/set cache
  const uid = user?.uid;
  const cacheKey = uid ? `subscriptionStatus_${uid}` : null;
  const getCached = (): SubscriptionStatus | null => {
    if (!cacheKey) return null;
    try {
      const cached = JSON.parse(localStorage.getItem(cacheKey) || '{}');
      if (cached.value && Date.now() - cached.timestamp < 5 * 60 * 1000) {
        return cached.value as SubscriptionStatus;
      }
    } catch {}
    return null;
  };
  const setCached = (value: SubscriptionStatus) => {
    if (!cacheKey) return;
    localStorage.setItem(
      cacheKey,
      JSON.stringify({ value, timestamp: Date.now() })
    );
  };

  const fetchStatus = async () => {
    if (!uid) {
      setStatus('none');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`/api/auth/register?firebaseUid=${uid}`);
      const data = await res.json();
      setStatus(data.status || 'none');
      setCached(data.status || 'none');
    } catch {
      setStatus('none');
    } finally {
      setLoading(false);
    }
  };

  // On mount or user change, use cache or fetch
  useEffect(() => {
    if (!uid) {
      setStatus('none');
      return;
    }
    const cached = getCached();
    if (cached) {
      setStatus(cached);
    } else {
      fetchStatus();
    }
    // eslint-disable-next-line
  }, [uid]);

  return (
    <SubscriptionContext.Provider
      value={{ status, refresh: fetchStatus, loading }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubscriptionContextType {
  return useContext(SubscriptionContext);
}

export function useAuth() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      // Always upsert user in the database after login
      const user = result.user;
      try {
        await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            name: user.displayName,
            firebaseUid: user.uid,
          }),
        });
      } catch (err) {
        console.error('Failed to register user in database:', err);
      }
      return user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    signInWithGoogle,
    logout,
  };
}
