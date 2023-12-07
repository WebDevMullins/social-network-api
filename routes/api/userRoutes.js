const router = require('express').Router()
const { getUsers, createUser, getUserById, updateUser, deleteUser, addFriend } = require('../../controllers/userController')

router.route('/').get(getUsers).post(createUser)

router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser)

router.route('/:userId/friends/:friendId').post(addFriend)

module.exports = router
