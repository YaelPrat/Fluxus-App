const Exercise = require('../models/exerciseModel')
const mongoose = require ('mongoose')
//Get all exe
const getExercises = async (req,res)=>{
    try {
        const exercises = await Exercise.find({}); //This will return all docs. if i want to filter i can do : find({author :"Yael"})
        // I can add .sort({filed name : -1})  to sort them. (-1 the news at the top)
        res.status(200).json(exercises);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Get a single exe
const getExercise = async (req,res)=>{
    try {
        const {id} = req.params;   // The {id} destructuring the "id" from the url in the params

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such exercise.'});
        const exercise = await Exercise.findById(id);

        if(!exercise) return res.status(404).json({error: 'No such exercise.'});

        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Create a new exe

const createExercise = async (req, res)=>{
    const {sentence, author} = req.body;

    let emptyFields= [];
    if(!sentence)
        {
            emptyFields.push('sentence');
             //if i want to do this for multiple fields i can send the array as a second argument inside the {}
        }
    if(!author){
        emptyFields.push('author');
    } 
    if(emptyFields.length > 0) return res.status(400).json({error: 'יש למלא תרגיל ואת הכותב.ת',emptyFields})
    
    try{
        const exercise = await Exercise.create({sentence, author});
        res.status(200).json(exercise);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

//Update an exe
const updateExercise = async (req,res) =>{
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such exercise.'});

        const exercise = await Exercise.findOneAndUpdate({_id : id},{...req.body}); // {...req.body} and it will speared the body to it fields.

        if(!exercise) return res.status(404).json({error: 'No such exercise.'});

        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Delete an exe
const deleteExercise = async (req,res)=>{
    try {
        const {id} = req.params;

        if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({error: 'No such exercise.'});

        const exercise = await Exercise.findOneAndDelete({_id: id});

        if(!exercise) return res.status(404).json({error: 'No such exercise.'});

        res.status(200).json(exercise);
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
module.exports = {
    createExercise,
    getExercises,
    getExercise,
    updateExercise,
    deleteExercise
}
