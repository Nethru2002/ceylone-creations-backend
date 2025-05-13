const Review = require('../model/review');
const express = require('express');

const createReview = async (req, res) => {
    try {
        const { name, topic, review, artisanRating, productRating, overallRating, image, date } = req.body;
        const newReview = new Review({
            name,
            topic,
            review,
            artisanRating,
            productRating,
            overallRating,
            image,
            date
        });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        console.error('Error creating review:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createReview, getReviews };
