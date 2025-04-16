export async function fetchAvailablePlaces() {  //we're puting this here so other files that may need it can outsource it from here rather than hardcoding it multiple times. 
    const response = await fetch('http://localhost:3000/places'); // this will send a get request to this url
    const resData = await response.json(); // why are we awaiting twice? // Waits for the response to be converted to JSON

    if (!response.ok) { //we're checking if the response is an error response. If it returns true(meaning theres an error), you've a 400, 500 status code. If not, 200, 300
        throw new Error('Failed to fetch places'); // custom error message // built-in Error class
    }

    return resData.places;  
}

export async function updateUserPlaces(places) { //NOTE: A request to store data
    const response = await fetch('http://localhost:3000/user-places', {  //fetch request to change data with PUT method
        //configuring the request 
        method: 'PUT',  //we add this because the default is get. 
        body: JSON.stringify({ places }), //The places data need to be in an attachable format. js arrays are not attachable so we convert to JSON
    //  body: JSON.stringify({ places })  the same as above
        headers: {
            'Content-Type': 'application/json' //This informs the backend that the data attached to this request will be in JSON format. Required to ensure successful extraction of data on the backend. 
        }
    });

    const resData = await response.json(); //Waits for the response to be converted to JSON

    if (!response.ok) {
        throw new Error('Failed to update user data');
    }

    return resData.message; 
}

export async function fetchUserPlaces() {
    const response = await fetch('http://localhost:3000/user-places');
    const resData = await response.json();

    if (!response.ok) { //we're checking if the response is an error response. If it returns true, you ve a 200, 300 status code. If not, 400, 500
        throw new Error('Failed to fetch user places'); // built-in Error class
    }

    return resData.places;
}

/**
 * //we await because we want it to wait 1, and 2, it's a promise. If we don't await, it will return a promise object instead of the actual value i.e. Output: Promise { <pending> }
 */