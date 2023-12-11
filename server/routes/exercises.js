const express = require ('express');
const router = express.Router();
const {
    createExercise,
    getExercises,
    getExercise,
    updateExercise,
    deleteExercise,
    exportExercises, 
    printExercise,
    getRandomApprovedExercise
} = require('../controllers/exerciseController')


//GET All exercises
router.get('/export-exercises', exportExercises)
router.get('/random-approved', getRandomApprovedExercise);

router.get('/',getExercises);

router.get('/:id',getExercise)

router.post('/', createExercise)

router.delete('/:id',deleteExercise)

router.patch('/:id', updateExercise)


router.post('/print',printExercise)
module.exports = router

