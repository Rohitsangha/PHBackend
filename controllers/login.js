const token = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginRouter = require('express').Router();
const userS = require('../models/user');

loginRouter.post('/', async(req,res) => {
    const body = req.body;

    const user = await userS.findOne({username: body.username});

    const passwordCorrect = 
    user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

    if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  userTok = {
      username: user.username,
      id: user._id,
  }

  const tokenR = token.sign(userTok, process.env.SECRET)
  
  res.status(200).send({tokenR, user:user.username})

})

module.exports = loginRouter;