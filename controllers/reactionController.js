const { ObjectId } = require('mongoose');
const { Thought, Reaction } = require('../models');
const reactionSchema = require('../models/Reaction');

module.exports = {
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { reactions: req.body },
                { new: true },
            )

            if (!thought) {
                return res.status(404).json(`reaction not created`)
            }

            const reaction = req.body.reactionBody

            res.json({ message: "reaction posted", thought: thought.thoughtText, reactionBody: reaction })
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
};