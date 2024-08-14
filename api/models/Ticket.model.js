import mongoose, { Schema, model } from "mongoose";

// Ticket schema
const ticketSchema = new Schema(
  {
    forEvent: {
      type: mongoose.ObjectId,
      ref: "Event",
      required: true,
    },
    offeredBy: {
      type: mongoose.ObjectId,
      ref: "Event",
      required: true,
      populate: { path: "createdBy" },
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Ticket = model("Ticket", ticketSchema);

export default Ticket;
