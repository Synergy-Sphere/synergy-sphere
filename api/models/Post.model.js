import mongoose, { Schema, model } from "mongoose";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      default: "",
    },
    likes: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "User",
          required: true,
        },
      ], // we push userIds to it
      // required: true,
      default: [],
    },
    createdBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    // comments: {
    //   type: [
    //     {
    //       content: {
    //         type: String,
    //         required: true,
    //         // default: "",
    //       },
    //       commentedBy: {
    //         type: mongoose.ObjectId,
    //         ref: "User",
    //         required: true,
    //       },
    //       likes: {
    //         type: [
    //           {
    //             type: mongoose.ObjectId,
    //             ref: "User",
    //             required: true,
    //           },
    //         ],
    //         default: [],
    //       },
    //       createdAt: {
    //         type: Date,
    //         default: Date.now,
    //       },
    //     },
    //   ],
    //   default: [],
    // },
    comments: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "Comment",
          required: true,
        },
      ],
      default: [],
    },
    images: {
      type: [String],
      // required: true,
      default: [],
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    // media: {
    //   type: mongoose.ObjectId,
    //   ref: "media",
    //   required: true,
    //   default: "",
    // },
  },
  { timestamps: true }
);

const Post = model("Post", postSchema);

export default Post;
