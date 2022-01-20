import React from 'react'

const User = ({ user }) => {
    const userDetails = user?.attributes
    
    return (
        <div>
            {userDetails.username}
            {userDetails.email}
        </div>
    )
}

export default User
