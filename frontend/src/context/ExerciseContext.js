import { createContext, useReducer } from "react";

export const ExerciseContext = createContext();

export const exercisesReducer = (state, action) =>{
    switch(action.type){
        case 'SET_EXERCISES': 
            return{ exercises:action.payload}
        case 'CREATE_EXERCISE':
            return{exercises : [action.payload, ...state.exercises] }
        case 'DELETE_EXERCISE':
            return {exercises : state.exercises.filter((exercise)=> exercise._id !== action.payload._id)} // will show the array without the exercise we just deleted
        default:
            return state
    }
}
//This component will raps the app sp the hole different components can excess to it
export const ExerciseContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(exercisesReducer, {
        exercises : null
    });

    return(
        <ExerciseContext.Provider value ={{...state, dispatch}}>
            {children}
        </ExerciseContext.Provider>
    )

}