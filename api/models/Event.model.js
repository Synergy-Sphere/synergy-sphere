import mongoose, { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    eventType: {
      type: [String],
      enum: {
        values: [
          // "Sport",
          // "Fitness",
          // "Work out",
          // "Football",
          // "Basketball",
          // "Volleyball",
          // "Kayaking",
          // "Scuba diving",
          // "Swimming",
          // "Tennis",
          // "Yoga",
          // "Hiking",
          // "Cycling",
          // "Art",
          // "Painting",
          // "Drawing",
          // "Crafting",
          // "Photography",
          // "Writing",
          // "Music",
          // "Gaming",
          // "Video games",
          // "Board games",
          // "Card games",
          // "Puzzles",
          // "Reading",
          // "Books",
          // "Articles",
          // "Blogs",
          // "Magazines",
          // "Languages",
          // "Science",
          // "Technology",
          // "IT",
          // "Gadgets",
          // "Programming",
          // "Robotics",
          // "Astronomy",
          // "Traveling",
          // "Cultures",
          // "Cooking",
          // "Volunteering",
          // "Charity",
          // "Movies",
          // "TV Shows",
          // "Watching films",
          // "Series",
          // "Dancing",
          // "Concerts",
          // "Theater",
          // "Literature",
          // "Blogging",
          // "Journalism",
          // "Gardening",
          // "Landscaping",
          // "Animals",
          // "Birds",
          // "Climbing",
          // "Paragliding",
          // "Meditation",
          // "Renovating",
          // "Decorating",
          // "Furniture",
          // "Design",
          // "Crafting",
          // "Sewing",
          // "Knitting",
          // "Woodworking",
          "Sport",
          "Yoga",
          "Outdoor activities",
          "Art",
          "Photography",
          "Writing",
          "Music",
          "Gaming",
          "Languages",
          "Science",
          "Reading",
          "Technology",
          "IT",
          "Programming",
          "Traveling",
          "Cooking",
          "Volunteering",
          "Films",
          "Series",
          "Dancing",
          "Concerts",
          "Theater",
          "Literature",
          "Landscaping",
          "Design",
          "Animals",
        ],
      },
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    participants: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      default: [],
    },
    deletedAt: {
      type: Date,
      default: null,
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

// tickets: {
//   type: [
//     {
//       price: {
//         type: String,
//         required: true,
//       },
//       numberOfTickets: {
//         type: Number,
//         required: true,
//       },
//       //   optional ticketType : "normal", "vip"
//     },
//   ],
//   validate: {
//     validator: function(tickets) {
//       return this.isPaid === true;
//     },
//     message: 'Tickets can only be specified if isPaid is true',
//   },
// },
// });

const Event = model("Event", eventSchema);

export default Event;