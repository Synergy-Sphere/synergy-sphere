import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51PmgjWIou5sdoDC5ZTrLCO0XFCKKRX9NtsWxoru37J6RVDEirIb87WwaSWspEIT9CyNsfI1ikAyZVyEmH247mYCN009Jqwf8pB"
);

const CheckoutForm = () => {
  const { state } = useLocation();

  // const quantity = state.quantity;
  const eventId = state.eventId;

  // console.log(quantity);
  console.log(eventId);

  const fetchClientSecret = useCallback(async () => {
    // Create a Checkout Session
    const res = await fetch(
      "http://localhost:5555/booking/create-checkout-session",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/JSON",
        },
        body: JSON.stringify({ eventId: eventId }),
      }
    );
    const data = await res.json();
    console.log(data);
    
    return data.clientSecret;
  }, [state]);

  const options = { fetchClientSecret };

  return (
    <div id="checkout">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  );
};

export default CheckoutForm;
