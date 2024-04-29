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
            .populate('reactions')

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
            const user = await User.findOne({ username: req.body.username })

            if (!user) {
                return res.status(404).json(`User not found`);
            }

            const thought = await Thought.create(req.body)

            await User.findOneAndUpdate(
                { _id: user._id },
                {$addToSet: { thoughts: thought._id }},
                { runValidators: true, new: true }
            )

            res.json(`Thought: '${thought.thoughtText}' created!`);
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

            res.json(`Thought: '${req.body}' updated!`);
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

            res.json({ message: `Thought: '${thought.thoughtText}' deleted!` });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    }
}