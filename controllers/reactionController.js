const { ObjectId } = require('mongoose');
const { Thought, Reaction } = require('../models');

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

            res.json(thought)
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    },
};