const phRouter = require('express').Router();
const pH = require('../models/ph');

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

    const ph = {
        fixed: new Date()
    }

    pH.findByIdAndUpdate(req.params.id, ph, {new: true})
        .then(update => {res.json(update)})
})

phRouter.delete('/:id', (req,res) => {
    pH.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
          })
})

module.exports = phRouter