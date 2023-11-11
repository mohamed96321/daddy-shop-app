import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PAYPAL_CLIENT_ID from 'client_id';

const PayPalButton = ({ total, onPaymentSuccess, onPaymentError, disabled }) => {
  return (
    <PayPalScriptProvider options={{ "client-id": PAYPAL_CLIENT_ID }}>
      <PayPalButtons
        disabled={disabled}
        forceReRender={[total()]}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: total(),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          onPaymentSuccess(data);
        }}
        onError={(err) => {
          onPaymentError(err);
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;