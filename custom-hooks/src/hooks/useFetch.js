import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {   //functions that start with use are treated as hooks and the rules of hooks are enforced on those functions
    const [isFetching, setIsFetching] = useState();
    const [error, setError] = useState();
    const [fetchedData, setFetchedData] = useState(initialValue);

    useEffect(() => {   //you can use other hooks inside of hooks functions 
        async function fetchData() {
            setIsFetching(true);
            try {
                const data = await fetchFn();
                setFetchedData(data);
            } catch (error) {
                setError({ message: error.message || 'Failed to fetch data.' });
            }

            setIsFetching(false);
        }

        fetchData();
    }, [fetchFn]);        //fetchFn is passed as a dependency because it is a funcion which isn't defined in useEffect and could change

    return {   
        isFetching,
        fetchedData,
        setFetchedData,
        error
    }
}  