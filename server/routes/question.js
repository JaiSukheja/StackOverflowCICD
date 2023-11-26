const router = require('express').Router();
const Question = require('../model/Question');


// add a question
router.post('/', async (req, res) => {
    const newQuestion = new Question(req.body);
    try {
        const savedQuestion = await newQuestion.save();
        res.status(200).json(savedQuestion);
    } catch (error) {
        res.status(500).json(error);
    }
});

// get all questions
router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
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
        res.status(500).json(error);
    }
}
);

// get questions by userId
router.put('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question.userId === req.body.userId) {
            await question.updateOne({ $set: req.body });
            res.status(200).json("Question has been updated");
        } else {
            res.status(403).json("You can update only your question");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
);

// delete a question
router.delete('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question.userId === req.body.userId) {
            await question.deleteOne();
            res.status(200).json("Question has been deleted");
        } else {
            res.status(403).json("You can delete only your question");
        }
    } catch (error) {
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
            res.status(200).json("The question has been upvoted");
        } else {
            await question.updateOne({ $pull: { upvotes: req.body.userId } });
            res.status(200).json("The question has been unupvoted");
        }
    } catch (error) {
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
            res.status(200).json("The question has been downvoted");
        } else {
            await question.updateOne({ $pull: { downvotes: req.body.userId } });
            res.status(200).json("The question has been undownvoted");
        }
    } catch (error) {
        res.status(500).json(error);
    }
}
);


// accept an answer
router.put('/:id/accept', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        if (question.userId === req.body.userId) {
            await question.updateOne({ $set: { acceptedAnswer: req.body.answerId } });
            res.status(200).json("The answer has been accepted");
        } else {
            res.status(403).json("You can accept only your question");
        }
    } catch (error) {
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
        res.status(500).json(error);
    }
}
);  



module.exports = router;
