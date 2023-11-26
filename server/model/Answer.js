const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    questionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    },
    upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    isAccepted: {
        type: Boolean,
        default: false,
    },
    reports: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
    },
    { timestamps: true }
);

module.exports = mongoose.model('Answer', AnswerSchema);