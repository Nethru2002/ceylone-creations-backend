const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    topic: {
        type: String,
        trim: true,
    },
    review: {
        type: String,
        required: true,
        trim: true,
    },
    artisanRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    productRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    overallRating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    image: {
        type: String,
    },
    date: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
