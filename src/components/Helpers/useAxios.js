import { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from './constants'
import { AppContext } from '../Context/AppContext'

/* Custom hook for using axios */
const useAxios = ( url, headers, requestData, auditTrail, method ) => {
    const { setIsLoading } = useContext( AppContext )
    // States for data, loading and error
    const [ fetchedData, setFetchedData ] = useState( null )
    const [ errorMessage, setErrorMessage ] = useState( null )

    axios.defaults.baseURL = baseUrl

    useEffect(() => {
        let isActive = true
        setIsLoading( true )
        axios({
            // Axios needed parameters to fetch API
            url: url,
            data: requestData || {},
            headers: { ...headers, 'Access-Control-Allow-Origin': '*' } || {}, 
            method: method
        })
        .then(response => {
            if( isActive ){
                // Loading set to false when response is retrieved
                setIsLoading( false )
                // Get response data
                setFetchedData( response.data?.data )
                // Display action done via API in console
                console.log( auditTrail )
                console.log(response) //TODO: remove this line
                console.log(response.data?.messages) //TODO: handle messages
            }
        })
        .catch(error => {
            if( isActive ){
                // Loading set to false when error is retrieved
                setIsLoading( false )
                // set error message from error response
                setErrorMessage( error.response?.data?.errors )
            }
        })

        return () => { isActive = false }
        //eslint-disable-next-line
    }, [ url ])

    // when api is called, these values can be retrieved
    return { fetchedData, errorMessage }
}

export default useAxios