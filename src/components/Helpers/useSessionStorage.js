import { useState } from 'react';

function useSessionStorage( key, initialValue ) {
    const [ storedValue, setStoredValue ] = useState(() => {
        try {
            const item = sessionStorage.getItem( key )
            return item ? JSON.parse( item ) : initialValue
        } catch ( error ) {
            console.log( error )
            return initialValue
        }
    })

    const setValue = ( value ) => {
        try {
            const valueToStore = value instanceof Function ? value( storedValue ) : value
            setStoredValue( valueToStore )
            sessionStorage.setItem( key, JSON.stringify( valueToStore ) )
        } catch ( error ) {
            console.log( error )
        }
    }
    
    return [ storedValue, setValue ]
}

export default useSessionStorage