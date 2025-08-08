import { useCallback, useEffect, useRef, useState } from 'react';
import { User } from '../types';
import { getSubscribePrice } from '../utils';

export const usePayment = (user?: User) => {
  const [pendingOrderToken, setPendingOrderToken] = useState<string>('');
  const [pendingOrderId, setPendingOrderId] = useState<string>('');
  const snapShownRef = useRef(false);

  const fetchPendingOrderToken = useCallback(async () => {
    if (!user?.email || user.email === null) return;

    // 1. Check for existing pending order by email
    const orderStatusRes = await fetch(
      `/api/order-status?email=${encodeURIComponent(user.email)}`
    );
    const orderStatusData = await orderStatusRes.json();

    if (
      orderStatusData.status === 'pending' &&
      orderStatusData.token &&
      orderStatusData.order_id
    ) {
      setPendingOrderToken(orderStatusData.token);
      setPendingOrderId(orderStatusData.order_id);
      return;
    }

    // 2. If no pending order, create a new one
    const customerDetails = {
      first_name: user.firstName || '',
      last_name: user.lastName || '',
      email: user.email || '',
      phone: user.phone || '',
    };

    const subscribePrice = getSubscribePrice();

    const res = await fetch('/api/subscription', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        customer_details: customerDetails,
        item_details: [
          {
            id: 'sub001',
            price: subscribePrice,
            quantity: 1,
            name: 'Subscription',
          },
        ],
      }),
    });
    const data = await res.json();
    if (data.token && data.order_id) {
      setPendingOrderToken(data.token);
      setPendingOrderId(data.order_id);
    }
  }, [user]);

  useEffect(() => {
    snapShownRef.current = false;
    fetchPendingOrderToken();
  }, [fetchPendingOrderToken]);

  return {
    pendingOrderToken,
    pendingOrderId,
    snapShownRef,
    fetchPendingOrderToken,
  };
};
