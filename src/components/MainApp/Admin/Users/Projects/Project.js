import { useState } from 'react'
import { dateFormatter } from '../../../../Helpers/constants'

const Project = ({ project, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography, FormContainer }) => {
    const projectDetails = project.attributes

    return (
        <>
            <MaterialTableRow>
                <MaterialTableCell>
                    <MaterialTypography>
                        { projectDetails?.name }
                    </MaterialTypography>
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { projectDetails?.description }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { project.relationships?.tickets?.data?.length || 0 }
                    </MaterialTypography>
                </HideTableCell>
                <MaterialTableCell>
                    { project.relationships?.users?.data?.length || 0 }
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(projectDetails?.created_at)) }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(projectDetails?.updated_at)) }
                    </MaterialTypography>
                </HideTableCell>
            </MaterialTableRow>
        </>
    )
}

export default Project
