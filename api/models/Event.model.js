import mongoose, { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      default: "",
    },
    description: {
      type: String,
      required: true, // "?" 
      default: "",
    },
    eventType: {
      type: String,
      enum: {
        values: ["", "SPORT", "TECH", "etc..."], // add all types from User.interests or only general?
      },
      required: true,
      default: ["SPORT"], // "?"
    },
    startDate: {
      type: String, // Date ? 
      required: true,
      default: "",
    },
    endDate: {
      type: String, // Date ?
      required: true,
      default: "",
    },
    location: {
      type: String,
      required: true,
      default: "",
    },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    participants: {
      type: Array, // we push userIds to it
      required: true,
      default: [],
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    tickets: {
      type: [
        {
          price: {
            type: String,
            required: true,
          },
          numberOfTickets: {
            type: Number,
            required: true,
          },
          //   optional ticketType : "normal", "vip"
        },
      ],
    },
  },
  { timestamps: true }
);

const Event = model("Event", eventSchema);

export default Event;