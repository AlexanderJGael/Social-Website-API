const { ObjectId } = require('mongodb');
const { Thought, User } = require('../models');

module.exports = {
    // get all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find()

            res.json(thoughts);
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    },

    async getThoughtById(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id })
            .select('-__v')

            if (!thought) {
                return res.status(400).json({ message: `No 'Thought' found with this id!` })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body)

            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thought: thought._id }},
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but no user found with that ID.'
                })
            }

            res.json('Thought created!');
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: `Error ${err}` })
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(400).json({ message: `No 'Thought' found with this id!` })
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: `Error ${err}` });
        };
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });

            if (!thought) {
                return res.status(404).json({ message: `No 'Thought' found with this id!`});
            }

            const user = await User.findOneAndUpdate(
                { thoughts: req.params.id },
            )

            res.json({ message: `Thought deleted!` });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}