const router = require('express').Router();
const Question = require('../model/Question');

router.post('/', async (req, res) => {
    const newQuestion = new Question(req.body);
    try {
        const savedQuestion = await newQuestion.save();
        res.status(200).json(savedQuestion);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/', async (req, res) => {
    try {
        const questions = await Question.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

router.get('/:id', async (req, res) => {
    try {
        const question = await Question.findById(req.params.id);
        question.views = question.views + 1;    
        await question.save();
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json(error);
    }
}
);

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



module.exports = router;
