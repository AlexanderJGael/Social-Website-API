const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
} = require('../../controllers/userController');

// GET/POST /api/users
router.route('/')
    .get(getUsers)
    .post(createUser);

// GET/POST /api/users/:id
router.route('/:id')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

// Friends Route
router.route('/:id/friends').post(addFriend);

module.exports = router;