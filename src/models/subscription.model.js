import mongoose from "mongoose";

const subscriptionSchema = mongoose.Schema(
  {
    subscriber: {
      type: mongoose.Schema.Types.ObjectId, // one who is subscriber
      ref: "User",
    },
    channel: {
      type: mongoose.Schema.Types.ObjectId, // one to whom subscriber is subscribing
      ref: "User",
    },
  },
  { timeStamps: true }
);

const Subscription =
  mongoose.models.Subscription ||
  mongoose.model("Subscription", subscriptionSchema);

export { Subscription };
