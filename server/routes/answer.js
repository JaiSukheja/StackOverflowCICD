const router = require('express').Router();
const Answer = require('../model/Answer');
const Question = require('../model/Question');
const User = require('../model/User');

router.post('/:id', async (req, res) => {
    const newAnswer = new Answer(req.body);
    try {
        const savedAnswer = await newAnswer.save();
        const question = await Question.findById(req.params.id);
        question.answers.push(savedAnswer);
        await User.findByIdAndUpdate(req.body.user, { $inc: { 'points.answersPoints': 1 } });
        await question.save();
        await User.findByIdAndUpdate(req.body.user, { $push: { answers: savedAnswer._id } });
        res.status(200).json(savedAnswer);
    } catch (error) {
        res.status(500).json(error);
    }
}
);


router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        const answers = await Promise.all(
            question.answers.map(answerId => {
                return Answer.findById(answerId);
            })
        );
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json(error);
    }
});

// delete answer and remove it from question

router.delete('/delete/:id', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (answer.user.equals(req.body.user)) {
            const question = await Question.findById(answer.questionId);
            await question.updateOne({ $pull: { answers: req.params.id } });
            await answer.deleteOne();
            await User.findByIdAndUpdate(req.body.user, { $inc: { 'points.answersPoints': -1 } });
            await User.findByIdAndUpdate(req.body.user, { $pull: { answers: req.params.id } });
            res.status(200).json("The answer has been deleted");
        } else {
            res.status(403).json("You can delete only your answer");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


// accept answer if the question is yours

router.post('/accept/:id', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (answer.questionId.equals(req.body.questionId)) {
            answer.isAccepted = !answer.isAccepted;
            await answer.save();
            answer.isAccepted ? await User.findByIdAndUpdate(answer.user, { $inc: { 'points.acceptedanswersPoints': 1 } }) : await User.findByIdAndUpdate(answer.user, { $inc: { 'points.acceptedanswersPoints': -1 } });
            res.status(200).json("The accept status has been changed");
        } else {
            res.status(403).json("You can accept only your answer");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// edit answer if the answer is yours

router.put('/edit/:id', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (answer.user.equals(req.body.user)) {
            answer.text = req.body.text;
            const updatedAnswer = await answer.save();
            res.status(200).json(updatedAnswer);
        } else {
            res.status(403).json("You can edit only your answer");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});
    
// upvote answer

router.put('/upvote/:id', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer.upvotes.includes(req.body.user)) {
            await answer.updateOne({ $push: { upvotes: req.body.user } });
            await User.findByIdAndUpdate(answer.user, { $inc: { 'points.answerUpvotesPoints': 1 } });
            res.status(200).json("The answer has been upvoted");
        } else {
            await answer.updateOne({ $pull: { upvotes: req.body.user } });
            await User.findByIdAndUpdate(answer.user, { $inc: { 'points.answerUpvotesPoints': -1 } });
            res.status(200).json("The answer has been unupvoted");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

// downvote answer

router.put('/downvote/:id', async (req, res) => {
    try {
        const answer = await Answer.findById(req.params.id);
        if (!answer.downvotes.includes(req.body.user)) {
            await answer.updateOne({ $push: { downvotes: req.body.user } });
            await User.findByIdAndUpdate(answer.user, { $inc: { 'points.answerDownvotesPoints': -1 } });
            res.status(200).json("The answer has been downvoted");
        } else {
            await answer.updateOne({ $pull: { downvotes: req.body.user } });
            await User.findByIdAndUpdate(answer.user, { $inc: { 'points.answerDownvotesPoints': 1 } });
            res.status(200).json("The answer has been undownvoted");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});






module.exports = router;