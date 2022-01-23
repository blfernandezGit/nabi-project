import { dateFormatter } from '../../../../Helpers/constants'

const Project = ({ user, HideTableCell, MaterialTableCell, MaterialTableRow, MaterialTypography }) => {
    const userDetails = user.attributes

    return (
        <>
            <MaterialTableRow>
            <MaterialTableCell>
                    <MaterialTypography>
                        { userDetails?.username }
                    </MaterialTypography>
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { userDetails?.first_name }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { userDetails?.last_name }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { userDetails?.email }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { user.relationships?.author_tickets?.data?.length || 0 }
                    </MaterialTypography>
                </HideTableCell>
                <MaterialTableCell>
                        { user.relationships?.projects?.data?.length || 0 }
                </MaterialTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(userDetails?.created_at)) }
                    </MaterialTypography>
                </HideTableCell>
                <HideTableCell>
                    <MaterialTypography>
                        { dateFormatter.format(Date.parse(userDetails?.updated_at)) }
                    </MaterialTypography>
                </HideTableCell>
            </MaterialTableRow>
        </>
    )
}

export default Project
