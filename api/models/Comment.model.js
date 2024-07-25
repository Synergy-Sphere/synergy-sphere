import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema(
  {
    onPost: {
      type: mongoose.ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    commentedBy: {
      type: mongoose.ObjectId,
      ref: "User",
      required: true,
    },
    likes: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "User",
          required: true,
        },
      ],
      default: [],
    },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

export default Comment;
