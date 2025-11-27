import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    commentedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: String,
    likeCount: { type: Number, default: 0 },
    commentOnPost: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

// PERFORMING ON DELETE CASCADE

// post hook for query-based deletions (findOneAndDelete, findByIdAndDelete)
commentSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;
  try {
    const Like = mongoose.model("Like");
    await Like.deleteMany({ targetModel: "Comment", targetId: doc._id });
  } catch (err) {
    console.error("Failed to delete likes for comment", doc._id, err);
  }
});

// (Optional) doc middleware for remove()
// if you use commentDoc.remove() somewhere, this will also run
commentSchema.pre("remove", async function (next) {
  try {
    const Like = mongoose.model("Like");
    await Like.deleteMany({ targetModel: "Comment", targetId: this._id });
    next();
  } catch (err) {
    next(err);
  }
});

export const Comment = mongoose.model("Comment", commentSchema);
