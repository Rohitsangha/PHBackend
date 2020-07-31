require('dotenv').config()
const express = require('express');
const app = express();
const { json } = require('express');
const pH = require('./models/ph');



const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }

app.use(express.json());
app.use(requestLogger)



app.get('/api/ph', (req,res) => {
    pH.find({}).then(resp => {res.json(resp)});
})

app.post('/api/ph', (req,res) => {
    const body = req.body;

    // if(body.content === undefined) {
    //     return res.status(400).json({error:'content missing'})
    // }

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

app.put('/api/ph/:id', (req,res) => {

    const ph = {
        fixed: new Date()
    }

    pH.findByIdAndUpdate(req.params.id, ph, {new: true})
        .then(update => {res.json(update)})
})

app.delete('/api/ph/:id', (req,res) => {
    pH.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
          })
})


const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})