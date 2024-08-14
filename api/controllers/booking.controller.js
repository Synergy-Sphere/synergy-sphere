import Stripe from "stripe";
import Event from "../models/Event.model.js";
import Ticket from "../models/Ticket.model.js";
import User from "../models/User.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const YOUR_DOMAIN = "http://localhost:5173";

export const createCheckoutSession = async (req, res) => {
  console.log("checkout session called");
  console.log(req.body);
  const tokenUserId = req.user;
  console.log(req.user);

  const user = await User.findById(tokenUserId);

  const { eventId } = req.body;

  // console.log(quantity);
  console.log(eventId);

  // const items = [];

  // for (let i = 0; i < 1; i++) {
    const ticket = await Ticket.findOne({
      forEvent: eventId
      // _id: { $not: { $in: items.map((item) => item._id) } },
    });
    // if (ticket) {
    //   items.push(ticket);
    // }
  // }

  // console.log(items);

  const lineItems = [{
    price_data: {
      currency: "eur",
      unit_amount: ticket.price * 100,
      product_data: {
        name: `Ticket#${ticket._id}`,
      },
    },
    quantity: 1, // assuming each item has a quantity of 1
  }];

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    line_items: lineItems,
    mode: "payment",
    return_url: `${YOUR_DOMAIN}/${eventId}/return?session_id={CHECKOUT_SESSION_ID}`,
    // return_url: `${YOUR_DOMAIN}/${user._id}/feed/${user.username}/event/${eventId}`
  });

  console.log(session);

  res.send({ clientSecret: session.client_secret });
};

export const sessionStatus = async (req, res) => {
  const session = await stripe.checkout.sessions.retrieve(req.query.session_id);

  const lineItems = await stripe.checkout.sessions.listLineItems(
    req.query.session_id
  );

  console.log(session);
  console.log(lineItems);

  res.send({
    status: session.status,
    customer_email: session.customer_details.email,
    lineItems: lineItems.data,
  });
};

export const deleteTickets = async (req, res, next) => {
  const { lineItems, eventId } = req.body;
  const idsOfTickets = lineItems?.map((item) => item.description.split("#")[1]);
  console.log(idsOfTickets);
  const event = await Event.findById(eventId);

  await Promise.all(
    idsOfTickets.map(async (id) => {
      await Ticket.findByIdAndDelete(id);
    })
  );

  // Remove ticket references from Event document
  await event.updateOne({ $pull: { tickets: { $in: idsOfTickets } } });
};
