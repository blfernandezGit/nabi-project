import { useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from './constants'

/* Custom hook for using axios */
const useAxios = ( url, headers, requestData, auditTrail, method ) => {
    // States for data, loading and error
    const [fetchedData, setFetchedData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    axios.defaults.baseURL = baseUrl

    useEffect(() => {
        let isActive = true
        axios({
            // Axios needed parameters to fetch API
            url: url,
            data: requestData || {},
            headers: {...headers, 'Access-Control-Allow-Origin': '*'} || {}, 
            method: method
        })
        .then(response => {
            if( isActive ){
                // Loading set to false when response is retrieved
                setIsLoading(false)
                // Get response data
                setFetchedData(response.data?.data)
                setErrorMessage(response.data?.errors)
                // Display action done via API in console
                console.log(auditTrail)
            }
        })
        .catch(error => {
            if( isActive ){
                // Loading set to false when error is retrieved
                setIsLoading(false)
                // set error message from error response
                setErrorMessage(error.response?.data?.errors)
            }
        })

        return () => { isActive = false }
        //eslint-disable-next-line
    }, [ url ]) // checker used for re-requesting api every time the checker value changes

    // when api is called, these values can be retrieved
    return { fetchedData, isLoading, errorMessage}
}

export default useAxios