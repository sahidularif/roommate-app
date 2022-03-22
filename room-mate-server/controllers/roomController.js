let AdddRoom = require('../models/AddRoom');
const UserModel = require('../models/UserModel');

const roomController = {};
roomController.addRoom = async (req, res, next) => {
    try {
        const amenities = req.body.amenities.map(json => JSON.parse(json))
        const utilities = req.body.utilities.map(json => JSON.parse(json))

        const reqFiles = [];
        const url = req.protocol + '://' + req.get('host');
        for (let i = 0; i < req.files.length; i++) {
            reqFiles.push(url + '/uploads/' + req.files[i].filename);
        }

        let amenityList = [];
        amenities.forEach(element => {
            amenityList.push(element)
        });
        let utilityList = [];
        utilities.forEach(element => {
            utilityList.push(element)
        });
        const body = req.body;
        const room = new AdddRoom({
            region: body.region,
            city: body.city,
            state: body.state,
            zip: body.zip,
            rent: body.rent,
            deposit: body.deposit,
            date: body.date,
            description: body.description,
            specialization: body.specialization,
            roomType: body.roomType,
            room: body.room,
            bed: body.bed,
            bath: body.bath,
            minStay: body.minStay,
            maxStay: body.maxStay,
            amenities: amenityList,
            utilities: utilityList,
            img_collection: reqFiles,
        })

        await room.save();
        res.status(200).send("Room successfully added")
    } catch (error) {
        res.status(500).send(error);
        console.log(error)
    }
}

roomController.getAllRooms = async (req, res, next) => {
    try {
        const rooms = await AdddRoom.find();
        res.status(200).send(rooms);
    } catch (error) {
        res.status(400).send(error.message);
    }
}
roomController.findSingleRoom = async (req, res, next) => {
    try {
        const rooms = await AdddRoom.findById({ _id: req.params._id });
        res.status(200).send(rooms);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


roomController.postUser = async (req, res, next) => {
    try {
        const newUser = new UserModel(req.body)
        await newUser.save();
        res.status(201).json({
            success: true,
            message: "User successfully saved",
            data: req.body
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "There was a server side error"
        })
    }
}

// roomController.getUser = async (req, res) => {
//    const user = await UserModel.findOne({email: req.params.email});
//    if(!user){
//     res.status(404).send('not found')
//    }
//    res.status(200).send(user)
// };

roomController.getUser = async (req, res, next) => {
    try {
        let user = await UserModel.findOne({ email: req.params.email })
        if (!user)
            return res.status('404').json({
                error: "User not found"
            })

        res.status(200).send(user)

        // next()
    } catch (err) {
        return res.status('400').json({
            error: "Could not retrieve user"
        })
    }
}

module.exports = roomController;