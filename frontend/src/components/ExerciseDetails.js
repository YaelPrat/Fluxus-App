import { useExercisesContext } from "../hooks/useExercisesContext";

const ExerciseDetails = ({exercise}) =>{
    const {dispatch} = useExercisesContext();
    const handelClick = async () =>{
        const response = await fetch ('/api/exercises/'+ exercise._id,{
            method: 'DELETE'
        });
        const json = await response.json();
        if(response.ok){
            dispatch({type:'DELETE_EXERCISE', payload: json})
        }
    }

    return(
        <div className="exercise-details">
            <h4>{exercise.sentence}</h4>
            <p>{exercise.author}</p>
            <span onClick={handelClick}>Delete</span>
        </div>
    )
}


export default ExerciseDetails;