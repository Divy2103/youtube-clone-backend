import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const tweetSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

tweetSchema.plugin(mongooseAggregatePaginate);

const Tweet = mongoose.models.Tweet || mongoose.model("Tweet", tweetSchema);

export { Tweet };
