const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: "https://i.pinimg.com/736x/de/59/4e/de594ec09881da3fa66d98384a3c72ff.jpg",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }],
    isLoggedin: {
        type: Boolean,
        default: false,
    },
    points: {
        type: Object,
        default: { 
            questionsPoints: 0,    
            answersPoints: 0,
            acceptedanswersPoints: 0,
            questionUpvotesPoints: 0,
            questionDownvotesPoints: 0,
            answerUpvotesPoints: 0,
            answerDownvotesPoints: 0,
        },
    },
    },
    { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);

// Points System Example:
// Asking a Question:

// Points: 10
// Rationale: Encourages users to actively seek information and engage with the community.
// Providing an Answer:

// Points: 20
// Rationale: Recognizes and rewards users for contributing helpful information.
// Answer Upvote:

// Points: 5
// Rationale: Encourages users to provide valuable answers that are appreciated by the community.
// Answer Downvote:

// Points: -2
// Rationale: Discourages low-quality or incorrect answers.
// Question Upvote:

// Points: 2
// Rationale: Recognizes users for asking valuable and well-received questions.
// Question Downvote:

// Points: -1
// Rationale: Encourages users to ask clear and relevant questions.
// Accepting an Answer:

// Points: 15
// Rationale: Rewards users for selecting the most helpful answer, adding value to the platform.
// Upvoting a Comment: