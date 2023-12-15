const router = require('express').Router();
const Question = require('../model/Question');
const User = require('../model/User');
const Answer = require('../model/Answer');

// adding points to the user who asked the question

// ask a question
router.post('/', async (req, res) => {
    const newQuestion = new Question(req.body);
    try {
        await User.findByIdAndUpdate(req.body.user, { $inc: { 'points.questionsPoints': 1 } });
        const savedQuestion = await newQuestion.save();
        await User.findByIdAndUpdate(req.body.user, { $push: { questions: savedQuestion._id } });
        res.status(200).json(savedQuestion);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
});

// edit a question
router.put('/edit/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question.userId === req.body.userId) {
            await question.updateOne({ $set: req.body });
            res.status(200).json("Question has been updated");
        } else {
            res.status(403).json("You can update only your question");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);


// get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// get a question and update views
router.put('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        res.status(200).json(question);
        if (!question.views.includes(req.body.userId)) {
            await question.updateOne({ $push: { views: req.body.userId } });
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// get questions by userId
router.put('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question.user === req.body.userId) {
            await question.updateOne({ $set: req.body });
            res.status(200).json("Question has been updated");
        } else {
            res.status(403).json("You can update only your question");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// delete a question
router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        console.log(question.user, req.body)
        if (question.user.equals(req.body.user)) {
            await question.deleteOne();
            await User.findByIdAndUpdate(req.body.user, { $inc: { 'points.questionsPoints': -1 } });
            await Answer.deleteMany({ questionId: req.params.id });
            await User.findByIdAndUpdate(req.body.user, { $pull: { questions: req.params.id } });
            res.status(200).json("Question has been deleted");
        } else {
            res.status(403).json("You can delete only your question");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// upvote a question (the same user can upvote and downvote the same question and can only upvote once and vice versa)
router.put('/:id/upvote', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question.upvotes.includes(req.body.userId)) {
            await question.updateOne({ $push: { upvotes: req.body.userId } });
            await User.findByIdAndUpdate(req.body.userId, { $inc: { 'points.questionUpvotesPoints': 1 } });
            res.status(200).json("The question has been upvoted");
        } else {
            await question.updateOne({ $pull: { upvotes: req.body.userId } });
            await User.findByIdAndUpdate(req.body.userId, { $inc: { 'points.questionUpvotesPoints': -1 } });
            res.status(200).json("The question has been unupvoted");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// downvote a question (the same user can upvote and downvote the same question and can only downvote once and vice versa)
router.put('/:id/downvote', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question.downvotes.includes(req.body.userId)) {
            await question.updateOne({ $push: { downvotes: req.body.userId } });
            await User.findByIdAndUpdate(req.body.userId, { $inc: { 'points.questionDownvotesPoints': 1 } });
            res.status(200).json("The question has been downvoted");
        } else {
            await question.updateOne({ $pull: { downvotes: req.body.userId } });
            await User.findByIdAndUpdate(req.body.userId, { $inc: { 'points.questionDownvotesPoints': -1 } });
            res.status(200).json("The question has been undownvoted");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);



// report a question
router.put('/:id/report', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (!question.reports.includes(req.body.userId)) {
            await question.updateOne({ $push: { reports: req.body.userId } });
            res.status(200).json("The question has been reported");
        } else {
            await question.updateOne({ $pull: { reports: req.body.userId } });
            res.status(200).json("The question has been unreported");
        }
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// get all reported questions
router.get('/reported', async (req, res) => {
    try {
        const questions = await Question.find({ reports: { $ne: [] } });
        res.status(200).json(questions);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// get all questions by userId
router.get('/user/:userId', async (req, res) => {
    try {
        const questions = await Question.find({ userId: req.params.userId });
        res.status(200).json(questions);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// get all questions by tag
router.get('/tag/:tag', async (req, res) => {
    try {
        const questions = await Question.find({ tags: req.params.tag });
        res.status(200).json(questions);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);

// get all questions by title
router.get('/title/:title', async (req, res) => {
    try {
        const questions = await Question.find({ title: req.params.title });
        res.status(200).json(questions);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);  

// get a question by id
router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        res.status(200).json(question);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}
);



module.exports = router;

