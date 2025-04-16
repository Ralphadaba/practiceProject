import Meal from "./Meal";
import useHttp from '../hooks/useHttp.js';
import Error from "./Error.jsx";

const requestConfig = {}; // we're creating this out here cause we don't want it to reload with the Meals component as it's passed to useEffect in useHttp and it will cause an infinite loop

export default function Meals() {
    const {
        data: loadedMeals,  //loadedMeals is an alias... idg
        isLoading, 
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []); //It's important we set the empty array as an initial value for the state or it will return an error, undefined because the fetched data won't be there initially.

    if (isLoading) {
        return <p className="center">Fetching meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error} />
    }
//An alternative to fix the undefined problem.
    // if(!data) {
    //     return <p>No meals found.</p>
    // }

    return (
        <ul id="meals">
            {loadedMeals.map((meal) => (
                <Meal meal={meal} key={meal.id} />
            ))}
        </ul>
    );
}


/**
 *     const {data, isLoading, error} = useHttp('http://localhost:3000/meals', {}, []); //This is how we access the value returned from a hook just like we do with useContext. We could also pass parameters
 * 
 * 
 * PREV useState & useEffect: so basically, the custom hook, useHttp has defined all this code below so 
 * we can use it multiple times.
 * 
 * const [loadedMeals, setLoadedMeals] = useState([]);
 * 
 * useEffect(() => {
        async function fetchMeals() {
            const response = await fetch('http://localhost:3000/meals');

            if (!response.ok) {
                // ...
            }

            const meals = await response.json();
            setLoadedMeals(meals);
        }

        fetchMeals();
    }, []);
 * 
 */