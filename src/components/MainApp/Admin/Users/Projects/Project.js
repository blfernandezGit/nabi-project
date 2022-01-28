import { useState } from 'react'
import { dateFormatter } from '../../../../Helpers/constants'

const Project = ({ project, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography, FormContainer }) => {

    return (
        <>
            <MaterialTableRow>
                <MaterialTableCell>
                    <MaterialTypography>
                        { project?.name }
                    </MaterialTypography>
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { project?.description }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(project?.created_at)) }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(project?.updated_at)) }
                    </MaterialTypography>
                </HideTableCell>
            </MaterialTableRow>
        </>
    )
}

export default Project
