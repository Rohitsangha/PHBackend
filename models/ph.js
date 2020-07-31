const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

const url = process.env.MONGODB_URI;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phSchema = new mongoose.Schema({
    reported: Date,
    lat: Number,
    lon: Number,
    scale: Number,
    fixed: { type: Date, default: null },
})

phSchema.set('toJSON', {
    transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    }
})

module.exports = mongoose.model('Ph', phSchema);