const { userController } = require('../../controllers');
const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/');

// GET/POST /api/users
router.route('/').get(getUsers).post(createUser);

// GET/POST /api/users/:id
router.route('/:id').get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;