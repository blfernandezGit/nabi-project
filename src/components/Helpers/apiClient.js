import axios from 'axios'
import { baseUrl } from './constants'

axios.defaults.baseURL = baseUrl

export const apiClient = (url, headers, requestData, method) => {
    return () => axios({
        url: url,
        headers: headers || {},
        data: requestData || {},
        method: method
    })
    .then( response => method === 'GET' ? response.data?.data : response )
}