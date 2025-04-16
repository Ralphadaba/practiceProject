import { useEffect, useState } from 'react';

import Places from './Places.jsx';
import ErrorPage from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false); // loading state
  const [availablePlaces, setAvailablePlaces] = useState([]); // data state //Note that when fetching data asynchronously, it's not there yet, so we need the component to do something e.g. loading when waiting for the data and to reload or re-execute when it has gottten the data. This state handles that. We update state once the data is available so the browser can re-executwith the updated values or display.
  const [error, setError] = useState();  //error state
  // When fetching data, its super common to have these 3 pieces of state together

  useEffect(() => {
    //setIsFetching(true);  // Also correct
    async function fetchPlaces() {  //created a new function inside of another function so we can use the async/await as using it with arrow functions isn't supported by react or js
      setIsFetching(true);

      try { // check below //we're using try catch to prevent the app from crashing when you "throw" an error. It will crash with the "throw new Error" defined in http.js if there's an error
        const places = await fetchAvailablePlaces(); //we're outsourcing the fetching code and also awaiting this because it's and async function that will still yield a promise in this component.

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places,
            position.coords.latitude,
            position.coords.longitude
          );
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) { //the error object receiver here could be what was caught from the custom thrown error or any other identified error
        setError({
          message:
            error.message || 'Could not fetch places, please try again later.' //so we always have an error message. If the fist is undefined, the secondd will be returned.
        });
        setIsFetching(false);
      } 

      //setAvailablePlaces(resData.places); This was moved due to block scoping of resData.places
      //setIsFetching(false);  was moved too because we can't await the navigator. This will run once the navigator is initiated before getting the data and we want it to run after we've fetched the location based data
    }

    fetchPlaces();
  }, [])

  if (error) {
    return <ErrorPage title="An error occured" message={error.message} />;
  }


  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace} 
    />
  );
}


/**
 *  fetch('http://localhost:3000/places').then; //the http...3000 will target the server while the /places will target the /places path
 * fetch returns a Promise which is a wrapper object around an object that isn't there yet but will be there eventually.
 * then() is the promise. 
 * 
 * We can't wrap async around a component function in React so we use then. 
 * 
 *  // fetch('http://localhost:3000/places')
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((resData) => {     //Here, we're working with the data result gotten
    //     setAvailablePlaces(resData.places);
    //   });
 * 
 *   
 * } catch (error) {
        //... (you can catch errors that have been thrown and define code that should be executed)
      }
 * 
 * 
 *  navigator.geolocation.getCurrentPosition(() => {}); //A built-in browser method for getting the 
 * location of a user on a browser. It takes a function which executes eventually once the position has been fetched
 * 
 * TRY/CATCH
 * The throw new Error() statement is used to explicitly create and signal an error condition when something unexpected happens.
 * If it's not caught, it will propagate up the call stack and potentially crash the application. The throw in fetchData provides specific details about what went wrong (e.g., a 404 error, a server issue).
 * 
 * The try...catch block is used to catch and handle errors—either those thrown by your code (like throw new Error) or those caused by other issues (like a failed fetch request).
 * This ensures your application doesn’t crash and can gracefully recover or display a meaningful message to the user.
 * 
 * 
 * error.message is a property on the Error object (or a similar object passed into setError). In this case, error.message represents the specific reason for the error.
 * If the error came from a failed HTTP request, it might say "404 Not Found" or "Network Error".
 * If the error came from code, it might have a custom message like "Invalid data".
 * 
 * The || is just the opposite of the && in outputting values. If the first value returns true, don't output the other one, if it returns false, null, undefined... output the next.
 * 
 */