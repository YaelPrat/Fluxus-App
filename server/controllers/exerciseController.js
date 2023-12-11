const Exercise = require('../models/exerciseModel')
const mongoose = require ('mongoose')
const fs = require('fs');
const path = require('path');

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
    const {title,sentence, author, breakfast} = req.body;

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
        const exercise = await Exercise.create({title,sentence, author,breakfast});
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

// const exportExercises= async(req, res) => {
//     try {
//         const exercises = await Exercise.find({}); // Fetch all exercises from your database

//         // Create a file with the exercises data
//         const filePath = path.join(__dirname, 'exercises-export.json');
//         fs.writeFileSync(filePath, JSON.stringify(exercises,null,null));

//         // Send the file to the client
//         res.download(filePath, 'exercises-export.json', (err) => {
//             // Delete the file after it's sent
//             // fs.unlinkSync(filePath);
//         });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }
const exportExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find({}); // Fetch all exercises from your database

        // Create a file with the exercises data
        const fileName = 'exercises-export.json';
        const filePath = path.join(process.env.USERPROFILE, 'Downloads', fileName);
        fs.writeFileSync(filePath, JSON.stringify(exercises, null, 2));

        // Suggest the filename for the download
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
        res.setHeader('Content-Type', 'application/json');

        // Send the file to the client
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal server error.' });
            }

            // Delete the file after it's sent
            // fs.unlinkSync(filePath);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};


const printExercise = (req, res)=>{

    try {
        // Simulate printing by logging a message
        console.log('Printing exercise:', req.body);
    
        res.status(200).json({ message: 'Exercise sent to the printer', exercise: req.body });
      } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: error.message });
      }
}

const getRandomApprovedExercise = async (req,res)=>{
    try {
        // Fetch a random approved exercise from your database
        const randomApprovedExercise = await Exercise.aggregate([
          { $match: { approved: true } },
          { $sample: { size: 1 } },
        ]);
    
        if (randomApprovedExercise.length > 0) {
          res.status(200).json(randomApprovedExercise[0]);
        } else {
          res.status(404).json({ error: 'No approved exercises found' });
        }
      } catch (error) {
        console.error('Error in getRandomApprovedExercise:', error);

        res.status(500).json({ error: error.message });
      }
}

module.exports = {
    createExercise,
    getExercises,
    getExercise,
    updateExercise,
    deleteExercise,
    exportExercises,
    printExercise,
    getRandomApprovedExercise
}

