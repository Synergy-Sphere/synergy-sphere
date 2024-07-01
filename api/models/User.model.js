import mongoose, { Schema, model } from "mongoose";

// User schema
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    profilePic: {
      type: String,
      required: true,
      default: "",
    },
    location: {
      type: String,
      required: true,
      default: "",
    },
    bio: {
      type: String,
      required: true,
      default: "",
    },
    friendList: {
      type: Array, // we push userIds to it
      required: true,
      default: [],
    },
    interests: {
      type: [String],
      enum: {
        values: [
          "Sport",
          "Fitness",
          "Work out",
          "Football",
          "Basketball",
          "Volleyball",
          "Kayaking",
          "Scuba diving",
          "Swimming",
          "Tennis",
          "Yoga",
          "Hiking",
          "Cycling",
          "Art",
          "Painting",
          "Drawing",
          "Crafting",
          "Photography",
          "Writing",
          "Music",
          "Gaming",
          "Video games",
          "Board games",
          "Card games",
          "Puzzles",
          "Reading",
          "Books",
          "Articles",
          "Blogs",
          "Magazines",
          "Languages",
          "Science",
          "Technology",
          "IT",
          "Gadgets",
          "Programming",
          "Robotics",
          "Astronomy",
          "Traveling",
          "Cultures",
          "Cooking",
          "Volunteering",
          "Charity",
          "Movies",
          "TV Shows",
          "Watching films",
          "Series",
          "Dancing",
          "Concerts",
          "Theater",
          "Literature",
          "Blogging",
          "Journalism",
          "Gardening",
          "Landscaping",
          "Animals",
          "Birds",
          "Climbing",
          "Paragliding",
          "Meditation",
          "Renovating",
          "Decorating",
          "Furniture",
          "Design",
          "Crafting",
          "Sewing",
          "Knitting",
          "Woodworking",
        ],
      },
      required: true,
      default: "", // "?"
    },
    posts: {
      type: [
        {
          type: mongoose.ObjectId,
          required: true,
          ref: "Post",
        },
      ],
      required: true,
      default: [],
    },
    events: {
      type: [
        {
          type: mongoose.ObjectId,
          required: true,
          ref: "Event",
        },
      ],
      required: true,
      default: [],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;