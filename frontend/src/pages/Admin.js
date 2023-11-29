import { useEffect } from "react";
import { useExercisesContext } from "../hooks/useExercisesContext";

//components
import ExerciseDetails from '../components/ExerciseDetails';


const Admin = () => {
    const {exercises,dispatch} = useExercisesContext();

    useEffect(()=>{
        const fetchExercises = async ()=>{
            const response = await fetch('/api/exercises');
            const json = await response.json();
            if(response.ok){
                dispatch({type:'SET_EXERCISES', payload: json}) //dispatch (action)
            }
            else{
                // console.log('dbg not good response');
            }
        }

        fetchExercises();
    },[dispatch])//fires when the component is render. [] make it runs only for the first time it renders.

    const onExportFile = async ()=>{
        try {
            const response = await fetch('/api/exercises/export-exercises', {
                method: 'GET',
              });
            if(response.ok){
                console.log('Export successful');
            } else {
              console.error('Export failed');   
            }
        } catch (error) {
            console.error('Error during export:', error);
        }
    }

   return (
    <div className="home">
        <div className="exercises">
            <button onClick={onExportFile}>export file with all exercises</button>
            {exercises && exercises.filter(exercise => !exercise.approved).map((exercise)=>(
             <ExerciseDetails key= {exercise._id} exercise = {exercise}>

             </ExerciseDetails>
            ))}
        </div> 
    </div>
   )}
 
export default Admin;

