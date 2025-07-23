// src/components/Auth/handleSubscribePayment.ts
export async function handleSubscribePayment(user: {
  email?: string | null;
  displayName?: string | null;
  phoneNumber?: string | null;
}) {
  const subscribePrice =
    typeof process !== 'undefined' && process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE
      ? parseInt(process.env.NEXT_PUBLIC_SUBSCRIBE_PRICE, 10)
      : 10000;
  try {
    const email = user?.email ?? undefined;
    if (!email) {
      alert('User email not found or not registered.');
      return;
    }
    // Extract first and last name from displayName
    const displayName = user?.displayName || '';
    const [first_name = '', ...lastArr] = displayName.split(' ');
    const last_name = lastArr.join(' ');
    const phone = user?.phoneNumber || '';

    let orderId = localStorage.getItem('snap_order_id') || '';
    let snapToken = localStorage.getItem('snap_token') || '';
    if (!orderId) {
      const res = await fetch('/api/subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          customer_details: {
            first_name,
            last_name,
            email,
            phone,
          },
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
        snapToken = data.token;
        orderId = data.order_id;
        localStorage.setItem('snap_token', snapToken);
        localStorage.setItem('snap_order_id', orderId);
      } else {
        alert(
          'Failed to get payment token: ' + (data.error || 'Unknown error')
        );
        return;
      }
      if (window.snap && window.snap.pay) {
        window.snap.pay(snapToken, {
          onSuccess: async function (result) {
            alert('Payment Success!');
            try {
              const orderId =
                typeof result === 'object' && result && 'order_id' in result
                  ? result.order_id
                  : '';
              if (orderId) {
                await fetch('/api/subscription', {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    order_id: orderId,
                    transaction_status: 'paid',
                    plan: 'pro',
                  }),
                });
              }
            } catch (e) {}
            localStorage.removeItem('snap_token');
            localStorage.removeItem('snap_order_id');
          },
          onPending: function () {
            alert('Payment Pending!');
          },
          onError: function () {
            alert('Payment Error!');
          },
          onClose: function () {
            alert('Payment popup closed without finishing the payment');
            localStorage.removeItem('snap_token');
            localStorage.removeItem('snap_order_id');
          },
        });
      } else {
        alert('Midtrans Snap.js is not loaded.');
      }
      return;
    }
    // If order_id exists, check its status
    const orderIdNum = orderId.replace('order-', '');
    const orderRes = await fetch(`/api/order-status?id=${orderIdNum}`);
    const orderData = await orderRes.json();
    if (orderData.status === 'pending') {
      if (!snapToken) {
        alert('No Snap token available. Please try again.');
        return;
      }
      if (window.snap && window.snap.pay) {
        window.snap.pay(snapToken, {
          onSuccess: async function (result) {
            alert('Payment Success!');
            try {
              const orderId =
                typeof result === 'object' && result && 'order_id' in result
                  ? result.order_id
                  : '';
              if (orderId) {
                await fetch('/api/subscription', {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    order_id: orderId,
                    transaction_status: 'paid',
                    plan: 'pro',
                  }),
                });
              }
            } catch (e) {}
            localStorage.removeItem('snap_token');
            localStorage.removeItem('snap_order_id');
          },
          onPending: function () {
            alert('Payment Pending!');
          },
          onError: function () {
            alert('Payment Error!');
          },
          onClose: function () {
            alert('Payment popup closed without finishing the payment');
          },
        });
      } else {
        alert('Midtrans Snap.js is not loaded.');
      }
    } else {
      localStorage.removeItem('snap_token');
      localStorage.removeItem('snap_order_id');
      await handleSubscribePayment(user); // Recursively call to create new transaction
    }
  } catch (err) {
    let message = 'Unknown error';
    if (err instanceof Error) message = err.message;
    else if (typeof err === 'string') message = err;
    alert('Error: ' + message);
  }
}
