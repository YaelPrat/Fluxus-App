
//components
import { useEffect } from "react";
import ExerciseForm from "../components/ExerciseForm";


const Home = ()=>{
    // const buttonPressed = async () => {
    //     console.log("dbg dbg push the button push the button");
    //     try {
    //         // Simulate sending a request to print on the server
    //         const response = await fetch('/api/exercises/print', {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //           },
    //           body: JSON.stringify({ message: 'Exercise data to be printed' }),
    //         });
      
    //         const json = await response.json();
      
    //         if (response.ok) {
    //           console.log('Server response:', json.message);
    //         } else {
    //           console.error('Error:', json.error);
    //         }
    //       } catch (error) {
    //         console.error('Error:', error.message);
    //       }
    // }


    const buttonPressed = async () => {
        console.log('Simulating button press...');
        try {
          // Fetch a random approved exercise from the server
          const response = await fetch('/api/exercises/random-approved', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
      
          const json = await response.json();
      
          if (response.ok) {
            console.log('Fetched random approved exercise:', json);
            
            // Simulate sending a request to print on the server
            const printResponse = await fetch('/api/exercises/print', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ exercise: json }),
            });
      
            const printJson = await printResponse.json();
      
            if (printResponse.ok) {
              console.log('Server response:', printJson.message);
              console.log('The exercise: ', json.title)
            } else {
              console.error('Error:', printJson.error);
            }
          } else {
            console.error('Error fetching random approved exercise:', json.error);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      

    useEffect(()=>{
        //It will be an event listener for the physical button when it arrive
        const handleKeyboardPress = (event)=>{
            if(event.key ==='-'){
                buttonPressed();
            }
        }

        window.addEventListener('keydown', handleKeyboardPress);

        // Remove event listener when the component unmounts
        return () => {
          window.removeEventListener('keydown', handleKeyboardPress);
        };
    },[])

   return (
    <div className="home">
        <ExerciseForm></ExerciseForm>   
    </div>
   )
}

export default Home;