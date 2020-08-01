const phRouter = require('express').Router();
const pH = require('../models/ph');
const tokenJWT= require('jsonwebtoken');
const logger = require('../utils/logger');

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }


phRouter.get('/', (req,res) => {
    pH.find({}).then(resp => {res.json(resp)});
})

phRouter.post('/', (req,res) => {
    const body = req.body;

    const ph = new pH({
        reported: new Date(),
        lat: body.lat,
        lon: body.lon,
        scale: body.scale,
        fixed: null,
    })

    ph.save().then(saved => {
        res.json(saved)
    })

})

phRouter.put('/:id', (req,res) => {

    const token = getTokenFrom(req)
    if (token === null) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
    const decodedToken = tokenJWT.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }

    const ph = {
        fixed: new Date()
    }

    pH.findByIdAndUpdate(req.params.id, ph, {new: true})
        .then(update => {res.json(update)})
})

phRouter.delete('/:id', (req,res) => {

    const token = getTokenFrom(req)
    if (token === null) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
    const decodedToken = tokenJWT.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' })
      }
    
    pH.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
          })
})

module.exports = phRouter