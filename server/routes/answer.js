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
        await question.save();
        res.status(200).json(savedAnswer);
    } catch (error) {
        res.status(500).json(error);
    }
}
);
// write the json to test this route
// {
//     "text": "This is a test answer",
//     "userId": "5f0d4e4a1c9d440000c8b7d7",
//     "questionId": "5f0d4e4a1c9d440000c8b7d6"
// }


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



module.exports = router;