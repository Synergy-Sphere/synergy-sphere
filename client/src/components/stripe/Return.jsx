import React, { useCallback, useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../contexts/authContext/AuthContext";
import { useEventContext } from "../../contexts/eventContext/EventContext";
import { useEvent } from "../../hooks";

const stripePromise = loadStripe(
  "pk_test_51PmgjWIou5sdoDC5ZTrLCO0XFCKKRX9NtsWxoru37J6RVDEirIb87WwaSWspEIT9CyNsfI1ikAyZVyEmH247mYCN009Jqwf8pB"
);

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");
  const [lineItems, setLineItems] = useState(null);
  const nav = useNavigate();

  const { eventId } = useParams();
  const { loggedInUser } = useAuthContext();
  const { singleEvent } = useEventContext();
  const { joinEvent } = useEvent();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(
      `http://localhost:5555/booking/session-status?session_id=${sessionId}`,
      {
        credentials: "include",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
        setLineItems(data.lineItems);
      });
  }, []);

  async function deleteTickets() {
    const res = await fetch("http://localhost:5555/booking/deleteTickets", {
      method: "DELETE",
      body: JSON.stringify({ lineItems: lineItems, eventId: eventId }),
      headers: {
        "Content-Type": "application/JSON",
      },
      credentials: "include",
    });
  }
  const joinEventMemoized = useCallback(() => joinEvent(eventId), [eventId, joinEvent]);

  console.log(lineItems);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    toast.success("Payment successful");
    deleteTickets();
    // joinEvent(eventId);
    setTimeout(() => {
      joinEventMemoized();
      nav(
        `/${loggedInUser?._id}/feed/${loggedInUser?.username}/event/${eventId}`
      );
    }, 5000);
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

export default Return;
