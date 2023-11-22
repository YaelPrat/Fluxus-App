import { useEffect } from "react";
import { useExercisesContext } from "../hooks/useExercisesContext";

//components
import ExerciseDetails from '../components/ExerciseDetails';
import ExerciseForm from "../components/ExerciseForm";


const Home = ()=>{
    // const [exercises, setExercises] = useState(null);
    const {exercises,dispatch} = useExercisesContext();

    useEffect(()=>{
        const fetchExercises = async ()=>{
            const response = await fetch('/api/exercises');
            const json = await response.json();
            if(response.ok){
                // console.log('dbg  good response');

                // setExercises(json);
                dispatch({type:'SET_EXERCISES', payload: json}) //dispatch (action)
            }
            else{
                // console.log('dbg not good response');
            }
        }

        fetchExercises();
    },[dispatch])//fires when the component is render. [] make it runs only for the first time it renders.
   return (
    <div className="home">
        <div className="exercises">
            {exercises && exercises.map((exercise)=>(
             <ExerciseDetails key= {exercise._id} exercise = {exercise}>

             </ExerciseDetails>
            ))}
        </div> 
        <ExerciseForm></ExerciseForm>   
    </div>
   )
}

export default Home;