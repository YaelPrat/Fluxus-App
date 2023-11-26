import { useState } from "react"
import { useExercisesContext } from "../hooks/useExercisesContext";

const ExerciseForm = () =>{
    const {dispatch} =useExercisesContext();
    const [title, setTitle] = useState('');
    const [sentence, setSentence] = useState('');
    const [author, setAuthor] = useState('');
    const [breakfast, setBreakfast] = useState('');
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleSubmit = async (e)=>{ // The function is async because we having a request here
        e.preventDefault() //to avoid refresh the page 
        const exercise = {title,sentence,author, breakfast};
        const response = await fetch('/api/exercises' , {
            method:'POST',
            body: JSON.stringify(exercise), // change the object into json
            headers:{
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json();
        if(!response.ok){
            setError(json.error);
            setEmptyFields(json.emptyFields)
        }
        if(response.ok){
            //reset the form
            setAuthor(''); setBreakfast(''); setSentence(''); setTitle('');  setEmptyFields([]);
            setError(null) ;
            console.log("new exercise added to the DB");
            dispatch({type:'CREATE_EXERCISE', payload: json});
        }

    }
    return(
        <form className="create" onSubmit={handleSubmit}>
            <h3><strong>תרגילי פלוקסוס לחיים אחרים</strong></h3>
            
            <label>שם התרגיל</label>
            <input
                type="text"
                onChange={(e)=> setTitle(e.target.value)}
                value={title}
            />
            <label>התרגיל</label>
            <input
                type="text"
                onChange={(e)=> setSentence(e.target.value)}
                value={sentence}
                className= {emptyFields.includes('sentence') ? 'error' :''}
            />
            <label>שם הכותב.ת</label>
            <input
                type="text"
                onChange={(e)=> setAuthor(e.target.value)}
                value={author}
                className= {emptyFields.includes('author') ? 'error' :''}
            />
 
            <label>?מה אכלת לארוחת הבוקר</label> 
            <input
                type="text"
                onChange={(e)=> setBreakfast(e.target.value)}
                value={breakfast}
            />
            <button>שלח</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default ExerciseForm;