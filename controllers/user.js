const bcrypt = require('bcrypt');
const userRouter = require('express').Router();
const userS = require('../models/user');
const logger = require('../utils/logger');

userRouter.post('/', async (req,res) => {
    const body = req.body;
    const saltRounds = 10;
    let passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new userS({
        username: body.username,
        passwordHash: passwordHash
    })

    user.save().then(saved => {res.json(saved)});
});

userRouter.get('/', (req,res) => {
    userS.find({}).then(data => {res.json(data)})
});


module.exports = userRouter;