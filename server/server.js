require ('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');


const exerciseRoutes = require('./routes/exercises')
const app = express();
//middleware:
app.use(express.json()); //allows us to get info from the request body
app.use((req,res,next)=>{
    // console.log(req.path, req.method);
    next();
})
//routes
app.use('/api/exercises',exerciseRoutes);


//connect to DB
mongoose.connect(process.env.ATLAS_URI)
    .then(()=>{
        console.log('connected to DB');
        const port = process.env.PORT;
        app.listen(port,()=>{
        console.log('listening on port '+ port);
});
    })
    .catch((error)=>{
        console.log(error);
    })

