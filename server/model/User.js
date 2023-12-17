const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
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
    loginHistory: [{
      loginTime: {
        type: Date,
        default: Date.now,
      },
      ipAddress: {
        type: String,
        required: true,
      },
      ua: String,
      browser: {
        name: String,
        version: String,
        major: String,
      },
      engine: {
        name: String,
        version: String,
      },
      os: {
        name: String,
        version: String,
      },
      device: {
        vendor: String,
        model: String,
        type: String,
      },
      cpu: {
        architecture: String,
      },
    }],
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
