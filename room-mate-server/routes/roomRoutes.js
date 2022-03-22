const express = require('express')
const upload = require('../helpers/uploadHelper')
const router = express.Router();
const roomController = require('../controllers/roomController');
const UserModel = require('../models/UserModel');
// const UserModel = require('../models/UserModel');
router.post('/addRoom', upload.array('files', 10), roomController.addRoom);
router.get('/find_rooms', roomController.getAllRooms);
router.get('/find_room/:_id', roomController.findSingleRoom);
router.post('/postUsers', roomController.postUser);

router.get("/getUser/:email", roomController.getUser);

router.get('/' , (req, res, next) => {
    res.json({msg: 'Welcome'})
})


module.exports = {
    routes: router,
}