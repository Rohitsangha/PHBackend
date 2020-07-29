const express = require('express');
const app = express();

// const test = [
//     {
//         approxSize
//         geom:[lat,long]
//         date submitted; 
//         username = 
//     }
// ]

app.get('/api/ph', (req,res) => {

})


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})