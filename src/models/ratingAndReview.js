const mongoose = require("mongoose");

const ratingAndReviewsSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  rating: {
    type: Number,
    required: true,
  },

  review: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("RatingAndReviews", ratingAndReviewsSchema);
