const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    text: {
        type: String,
    },
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
    }],   
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    tags: [{
        type: String,
    }],
    views: {
        type: Number,
        default: 0,
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Question', QuestionSchema);