import { useContext, useEffect, useState } from 'react'
import { Formik, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { useQuery } from 'react-query'
import { apiClient } from '../../../../Helpers/apiClient'
import { AppContext } from '../../../../Context/AppContext'
import { projectListUrl } from '../../../../Helpers/constants'
import { Button } from '../../../Layout/Elements'
import MainLoading from '../../../Layout/LoadingScreen/MainLoading'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import MaterialMenuItem from '@mui/material/MenuItem'
import MaterialAutocomplete from '@mui/material/Autocomplete'

const Index = ({ origTitle, origDescription, origStatus, origAssignee, origResolution, code, ticket_no, handleclose, getUpdatedTicket }) => {
    const { title, description, status, resolution, handleEditTicket,
        assignee
    } = useHooks( code, ticket_no )

    const { currentUser } = useContext ( AppContext )
    const [ projectUsers , setProjectUsers ] = useState()
    const [selectedAssignee, setSelectedAssignee] = useState(origAssignee);

    const { isLoading: isLoadingProject, data: projectData } = useQuery( `${ code }`, apiClient(`${projectListUrl}/${code}`, currentUser.headers, null, 'GET' ), {retry: false})

    useEffect(() => {
        setProjectUsers(
            projectData?.attributes?.users
            .map( user => {
                return ({
                    label: user?.username,
                    id: user?.id 
                })
            })
        )
    //eslint-disable-next-line
    }, [isLoadingProject])

    return (
        <>
            <MainLoading isLoading = { isLoadingProject } />
            { !isLoadingProject &&
            <>
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Edit Ticket
            </MaterialTypography>
            <Formik
                initialValues={{ title: origTitle, description: origDescription || '', status: origStatus, resolution: origResolution || '',
                assignee: origAssignee || {label: '', id: ''}
            }}
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(255).required('Title is required'),
                    status: Yup.string().required('Status is required')
                })}
            >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                isValid,
                setFieldTouched,
                setFieldValue,
                onBlur
            }) => (
                <form onSubmit = { handleSubmit }>
                    <MaterialTextField
                        label = "Title"
                        type = "text"
                        name = "title"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.title }
                        inputRef = { title }
                        error = {Boolean( touched.title && errors.title )}
                        helperText = { touched.title && errors.title }
                        fullWidth
                        sx = {{ mt: 1 }}
                    />
                    <MaterialTextField
                        label = "Status"
                        type = "text"
                        name = "status"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.status }
                        inputRef = { status }
                        error = {Boolean( touched.status && errors.status )}
                        helperText = { touched.status && errors.status }
                        fullWidth
                        select
                        sx = {{ mt: 2 }}
                    >
                        <MaterialMenuItem value='Open'>Open</MaterialMenuItem>
                        <MaterialMenuItem value='ForFixing'>For Fixing</MaterialMenuItem>
                        <MaterialMenuItem value='ForTesting'>For Testing</MaterialMenuItem>
                        <MaterialMenuItem value='Closed'>Closed</MaterialMenuItem>
                        <MaterialMenuItem value='Cancelled'>Cancelled</MaterialMenuItem>
                    </MaterialTextField>
                    {projectUsers &&
                        <MaterialAutocomplete
                            value = { selectedAssignee }
                            name = 'assignee'
                            options={ projectUsers }
                            onChange={(e, value) => {
                                setSelectedAssignee(value)
                            }}
                            isOptionEqualToValue={(option, value) => option?.id === value?.id}
                            sx={{ width: 300, mt: 2 }}
                            renderInput={params => (
                                <MaterialTextField
                                    {...params}
                                    label="Assignee"
                                    name = 'assignee'
                                    fullWidth
                                />
                            )}
                        />
                    }
                    <MaterialTextField
                        label = "Description"
                        type = "text"
                        name = "description"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.description }
                        inputRef = { description }
                        error = {Boolean( touched.description && errors.description )}
                        helperText = { touched.description && errors.description }
                        fullWidth
                        multiline
                        rows = {4}
                        sx = {{ mt: 2 }}
                    />
                    <MaterialTextField
                        label = "Resolution"
                        type = "text"
                        name = "resolution"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.resolution }
                        inputRef = { resolution }
                        error = {Boolean( touched.resolution && errors.resolution )}
                        helperText = { touched.resolution && errors.resolution }
                        fullWidth
                        multiline
                        rows = {4}
                        sx = {{ my: 2 }}
                    />
                    <Button 
                        type = "submit"
                        disabled = { isSubmitting ? isSubmitting : !isValid }
                        onClick = {( e ) => handleEditTicket( e, handleclose, getUpdatedTicket, selectedAssignee )}
                        variant = "contained"
                        size = "large"
                    >
                        Update Ticket
                    </Button>
                </form>
            )}
            </Formik>
            </>
            }
        </>
    )
}

export default Index
