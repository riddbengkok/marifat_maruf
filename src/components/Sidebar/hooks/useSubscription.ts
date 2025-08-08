import { useCallback, useEffect, useState } from 'react';
import { SubscriptionStatus } from '../types';

export const useSubscription = (userEmail?: string) => {
  const [subscriptionStatus, setSubscriptionStatus] =
    useState<SubscriptionStatus>(null);
  const [subLoading, setSubLoading] = useState(false);

  const refetchSubscriptionStatus = useCallback(async () => {
    if (!userEmail) return;

    setSubLoading(true);
    try {
      const res = await fetch(
        `/api/auth/register?email=${encodeURIComponent(userEmail)}`
      );
      const data = await res.json();
      setSubscriptionStatus((data.status as SubscriptionStatus) || 'none');
    } catch (e) {
      setSubscriptionStatus('none');
    } finally {
      setSubLoading(false);
    }
  }, [userEmail]);

  useEffect(() => {
    refetchSubscriptionStatus();
  }, [refetchSubscriptionStatus]);

  return {
    subscriptionStatus,
    subLoading,
    refetchSubscriptionStatus,
  };
};
