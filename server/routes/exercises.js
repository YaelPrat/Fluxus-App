const express = require ('express');
const router = express.Router();
const {
    createExercise,
    getExercises,
    getExercise,
    updateExercise,
    deleteExercise,
    exportExercises
} = require('../controllers/exerciseController')


//GET All exercises
router.get('/export-exercises', exportExercises)

router.get('/',getExercises);

router.get('/:id',getExercise)

router.post('/', createExercise)

router.delete('/:id',deleteExercise)

router.patch('/:id', updateExercise)

module.exports = router

