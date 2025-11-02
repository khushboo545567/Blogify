import mongoose from "mongoose";

const likeSchema = mongoose.Schema(
  {
    targetId: { type: mongoose.Schema.Types.ObjectId, required: true }, //ids of post or comment
    targetModel: { type: String, required: true, enum: ["Post", "Comment"] },
    likedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, //id of user who like the post or comment
    },
  },
  { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
