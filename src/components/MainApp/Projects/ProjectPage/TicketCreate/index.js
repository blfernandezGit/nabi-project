import { useContext, useEffect, useState } from 'react'
import { Formik, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { useQuery } from 'react-query'
import { apiClient } from '../../../../Helpers/apiClient'
import { AppContext } from '../../../../Context/AppContext'
import { projectListUrl } from '../../../../Helpers/constants'
import { Button } from '../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import MaterialMenuItem from '@mui/material/MenuItem'
import MaterialAutocomplete from '@mui/material/Autocomplete'


const Index = ({ code, handleclose, getUpdatedProjectTickets }) => {
    const { title, description, status, handleCreateTicket,
        // assignee
     } = useHooks(code)

     const { currentUser } = useContext ( AppContext )
     const [ projectUsers , setProjectUsers ] = useState()
     const [selectedAssignee, setSelectedAssignee] = useState(null)
 
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
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Create New Ticket
            </MaterialTypography>
            <Formik
                initialValues={{ title: '', description: '', status: 'Open',
                //  assignee: ''
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
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                isValid,
                dirty
            }) => (
                <form onSubmit = { handleSubmit } style= {{width: '80%'}}>
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
                        sx = {{ mt: 2 }}
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
                        sx = {{ mt: 3 }}
                        select
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
                            sx={{ width: 300, my: 3 }}
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
                        sx = {{ mb: 3 }}
                    />
                    <Button 
                        type = "submit"
                        disabled = { isSubmitting ? isSubmitting : !(isValid && dirty) }
                        onClick = {( e ) => handleCreateTicket( e, handleclose, getUpdatedProjectTickets, selectedAssignee )}
                        variant = "contained"
                        size = "large"
                    >
                        Create Ticket
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
