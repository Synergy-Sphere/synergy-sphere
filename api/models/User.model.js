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
      unique:true
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
      default: "",
    },
    location: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    friendList: {
      type: Array, // we push userIds to it
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
      default: ["Gaming"],
    },
    posts: {
      type: [
        {
          type: mongoose.ObjectId,
          required: true,
          ref: "Post",
        },
      ],
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
      default: [],
    },
  },
  { timestamps: true }
);

const User = model("User", userSchema);

export default User;