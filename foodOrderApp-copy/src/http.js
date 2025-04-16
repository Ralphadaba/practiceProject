export async function fetchMeals() { //we could add a method and set it to GET i.e. {method: 'GET'} after the url but GET is already the default fettch method
    const response = await fetch('http://localhost:3000/meals');
    const resData = await response.json(); //the data in the backend is in json format. To convert it to js objects & values, we must use the json() method on the response object.

    // if (!response.ok) { //we're checking if the response is an error response. If it returns true(meaning theres an error), you've a 400, 500 status code. If not, 200, 300
    //     throw new Error('Failed to fetch meals'); // built-in Error class
    // }

    return resData; 
}

/**
 * //we await because we want it to wait 1, and 2, it's a promise. If we don't await, it will return a promise object instead of the actual value i.e. Output: Promise { <pending> }
 */
