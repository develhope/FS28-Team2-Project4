// src/App.js
// import { useEffect, useState } from 'react';
import Esercizio from './MyComponents/Esercizio';

const App = () => {
    // const [nutrition, setNutrition] = useState([]);
    // const [workouts, setWorkouts] = useState([]);

    // useEffect(() => {
    //     // Funzione per caricare i dati nutrizionali
    //     const fetchNutritionData = async () => {
    //         try {
    //             const response = await fetch('/gymExercise.json');
    //             const data = await response.json();
    //             setNutrition(data);
    //         } catch (error) {
    //             console.error('Errore nel caricamento dei dati nutrizionali:', error);
    //         }
    //     };

    //     // Funzione per caricare i dati di allenamento
    //     const fetchWorkoutData = async () => {
    //         try {
    //             const response = await fetch('/workoutData.json');
    //             const data = await response.json();
    //             setWorkouts(data);
    //         } catch (error) {
    //             console.error('Errore nel caricamento dei dati di allenamento:', error);
    //         }
    //     };

    //     fetchNutritionData();
    //     fetchWorkoutData();
    // }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold">Schede di Allenamento</h1>
            <Esercizio/>
            {/* <h1 className="text-2xl font-bold mt-8">Alimentazione</h1> */}
            {/* <NutritionTable nutrition={nutrition} /> */}
        </div>
    );
};

export default App;




