import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config); //contains the raw HTTP response

    const resData = await response.json()   //extracts the actual content from the response

    if (!response.ok) { // if (!response.ok) for backend response issues. //the response might fail if something went wrong on the backend
        throw new Error(
            resData.message || 'Something went wrong, failed to send request.'    //we could simply return 'Something went wrong' in the Error object but we want to be more specific about the error and resData could be carrying the error message from d backend
        );
    }

    return resData;
}

export default function useHttp(url, config, initialData) { //This is about updating state based on the request status
    const [data, setData] = useState(initialData);
    const [isLoading, setIsloading] = useState(false);
    const [error, setError] = useState();

    function clearData() {
        setData(initialData);
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        setIsloading(true);
        try {  //try...catch for network and runtime errors.
            const resData = await sendHttpRequest(url, {...config, body: data}); //without await, we'll only get the promise which will yield an error. We use await to extract the actual data from the promise object
            setData(resData);
        } catch (error) {  // this error is if there's some other error like no internet connection
            setError(error.message || 'Something went wrong!');
        }
        setIsloading(false);
    }, [url, config]);

    useEffect(() => {
        if ((config && (config.method === 'GET' || !config.method)) || !config) { //check below
            sendRequest();  //with the if statement, we're making sure that this request is only sent if we have a GET request
        }
    }, [sendRequest, config]);   //Is any prop or function defined outside useEffect a dependency? why?

    return {
        data,
        isLoading,
        error,
        sendRequest,   //This is so that other components that use this customhook can get direct access to the sendRequest function and execute it
        clearData
    }
}









/**
 * resData extracts the actual content from the response: 
 * const resData = await response.json() parses the response body as JSON. This is the data you want to work with, rather than the full response object itself.
 * 
 * resData.message provides a more detailed error message:
 * When the request fails, resData.message may contain a specific error message returned by the backend.
 * If no message is provided, the fallback "Something went wrong, failed to send request." is used.
 * 
 * if (!response.ok) checks for server-side failures where a response was received but contains an error.
 * 
 * try...catch captures JavaScript runtime errors or network-related issues.
 * 
 * if (config && config.method === 'GET') { //If we're sending a GET request, there will be an error because we do not explicitly 
 * set the method for fetch to GET because fetch() is a get metod by default. So, we could also check if it is undefined i.e !config.method
 * or if there's no config at all i.e. if (config && (config.method === 'GET' || !config.method || !config)) {
 * 
 */