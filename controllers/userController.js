const { ObjectId } = require('mongoose').Types;
const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const user = await User.find();
            const userObj = {
                user
            };
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userid })
                .select('-__v')
                .lean();

                if (!user) {
                        return res.status(404).json({ message: 'No user found with this id!' });
                }

            res.json({
                user
            });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.id });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try
        {const user = await User.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
}