import axios from 'axios'
import { baseUrl } from './constants'

/* Reusable function for using axios post */
export const postAPI = (url, requestData, headers, auditTrail, method) => {
    axios.defaults.baseURL = baseUrl
    console.log(requestData)
    return axios({
        // Axios needed parameters to fetch API
        url: url,
        data: requestData || {},
        headers: headers || {},
        method: method
    })
    .then(response => {
        // create array that includes both response data and headers
        const data = [ response.data, response.headers ]
        // Display action done via API in console
        console.log( auditTrail )
        console.log( response.data )
        // Passes data value to js that called it
        // used Promise.resolve since cannot use useState hook in a function
        return Promise.resolve( data )
    })
    .catch(error => {
        // create variable to store error message from error response
        const errorMessages = error.response?.data?.errors
        console.log( error.response?.data?.errors )
        // Passes error value to js that called it
        return Promise.reject( errorMessages )
    })
}
//used a separate function for POST since cannot call a custom hook within a function such as handleLogin in Login.js