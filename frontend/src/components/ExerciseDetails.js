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
    const handelApproved = () => {
        console.log("dbg------ update the approved field");
    }
    return(
        <div className="exercise-details">
            <h3>{exercise.title}</h3>
            <h4>{exercise.sentence}</h4>
            <p>{exercise.author}</p>
            <span onClick={handelClick}>Delete</span>
            <button onClick={ handelApproved}>Approved</button>
        </div>
    )
}


export default ExerciseDetails;