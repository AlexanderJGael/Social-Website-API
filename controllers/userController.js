const { User } = require('../models');
const { ObjectId } = require('mongoose')

module.exports = {
    async getUsers(req, res) {
        try {
            const user = await User.find()
            .select('-__v');
            
            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id })
            .select('-__v')

            if (!user) {
                    return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json(user);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);

            res.json({ message: 'User created!', username: user.username, email: user.email });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.id });

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json({ message: 'User deleted!' });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json({ message: 'User updated' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });

            if (!friend) {
                return res.status(404).json(`No user found at '/friend/:id'`)
            }

            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res.status(404).json({ message: `No user found at 'users/:id'` });
            }


            res.json({ message: "Friend added", username: friend.username });
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    async deleteFriend(req, res) {
        try {
            const friend = await User.findOne({ _id: req.params.friendId });

            if (!friend) {
                return res.status(404).json({ message: `No user found at '/friend/:id'` })
            };

            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )

            if (!user) {
                return res.status(404).json(`${err}`);
            }

            res.json({ message: "Friend deleted", username: friend.username });
        } catch (err) {
            console.log(err);
            res.status(500).json(`${err}`);
        }
    },
};