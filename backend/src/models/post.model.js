import mongoose, { mongo } from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    postImage: [
      {
        type: String, // store URLs or file paths
      },
    ],
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// PERFORMING ON DELETE CASECADE

// post hook fired after Model.findOneAndDelete / findByIdAndDelete
postSchema.post("findOneAndDelete", async function (doc) {
  if (!doc) return;
  try {
    const Comment = mongoose.model("Comment");
    const Like = mongoose.model("Like");

    // get comment id from this post
    const comments = await Comment.find({ commentOnPost: doc._id }).select(
      "_id"
    );
    const commentIds = comments.map((c) => c._id);

    // 2) delete likes on those comments
    if (commentIds.length > 0) {
      await Like.deleteMany({
        targetModel: "Comment",
        targetId: { $in: commentIds },
      });
    }

    // 3) delete comments
    await Comment.deleteMany({ commentOnPost: doc._id });

    // 4) delete likes on the post itself
    await Like.deleteMany({ targetModel: "Post", targetId: doc._id });
  } catch (err) {
    // log — don't throw (post hooks should not break the original delete flow unexpectedly)
    console.error("Error cascading deletes for post", doc._id, err);
  }
});

// (Optional) if you sometimes call postDoc.remove()
postSchema.pre("remove", async function (next) {
  try {
    const Comment = mongoose.model("Comment");
    const Like = mongoose.model("Like");

    const comments = await Comment.find({ commentOnPost: this._id }).select(
      "_id"
    );
    const commentIds = comments.map((c) => c._id);

    if (commentIds.length > 0) {
      await Like.deleteMany({
        targetModel: "Comment",
        targetId: { $in: commentIds },
      });
    }
    await Comment.deleteMany({ commentOnPost: this._id });
    await Like.deleteMany({ targetModel: "Post", targetId: this._id });

    next();
  } catch (err) {
    next(err);
  }
});

export const Post = mongoose.model("Post", postSchema);
