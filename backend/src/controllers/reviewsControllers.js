const reviewsController = {};

import reviewsModel from "../models/Reviews.js";

reviewsController.getReviews = async (req, res) => {
    const reviews = await reviewsModel.find().populate("idClient")
    res.json(reviews)
}

reviewsController.insertReview = async (req, res) => {
    const { comment, rating, idClient } = req.body;
    const newReview = new reviewsModel({ comment, rating, idClient });
    await newReview.save();
    res.json({ message: "Review added" });
}

reviewsController.updateReview = async (req, res) => {
    const { comment, rating, idClient } = req.body;
    const updatedReview = await reviewsController.findByIdAndUpdate(req.params.id, { comment, rating, idClient }, {new: true})
    
    res.json({message: 'updated'});
}

reviewsController.deleteReview = async (req, res) => {
    await reviewsModel.findByIdAndDelete( req.params.id );
    res.json({ message: 'Review deleted' });
}

export default reviewsController;