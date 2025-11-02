import mongoose from "mongoose";

const followShcema = mongoose.Schema({}, { timestamps: true });

export const Follow = mongoose.model("Follow", followShcema);
