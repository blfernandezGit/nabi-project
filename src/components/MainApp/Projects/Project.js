import React from 'react'

const Project = ({ project }) => {
    const projectDetails = project.attributes

    console.log(project.attributes)

    return (
        <div>
            {projectDetails.name}
            {projectDetails.description}
        </div>
    )
}

export default Project
