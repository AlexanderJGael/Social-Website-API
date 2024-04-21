const { User } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const user = await User.find()
            .populate('thoughts');
            
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

            res.json({ message: 'User created!', user });
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

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $addToSet: { friends: req.body } },
                { new: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'No user found with this id!' });
            }

            res.json('Friend added!');
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },
}