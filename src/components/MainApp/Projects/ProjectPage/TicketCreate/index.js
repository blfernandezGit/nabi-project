import { useContext, useEffect, useState } from 'react'
import { Formik, Field as FormikField } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { useQuery } from 'react-query'
import { apiClient } from '../../../../Helpers/apiClient'
import { AppContext } from '../../../../Context/AppContext'
import { projectListUrl } from '../../../../Helpers/constants'
import MainLoading from '../../../Layout/LoadingScreen/MainLoading'
import MaterialTextField from '@mui/material/TextField'
import MaterialMenuItem from '@mui/material/MenuItem'
import MaterialAutocomplete from '@mui/material/Autocomplete'
import MaterialButton from '@mui/material/Button'
import MaterialDialogActions from '@mui/material/DialogActions'


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
    }, [projectData])

    return (
        <>
            <MainLoading isLoading = { isLoadingProject } />
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
                <form onSubmit = { handleSubmit } style={{paddingTop: '8px'}}>
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
                        sx = {{ mb: 2 }}
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
                        sx = {{ mb: 2 }}
                        select
                    >
                        <MaterialMenuItem value='Open'>Open</MaterialMenuItem>
                        <MaterialMenuItem value='ForFixing'>For Fixing</MaterialMenuItem>
                        <MaterialMenuItem value='ForTesting'>For Testing</MaterialMenuItem>
                        <MaterialMenuItem value='Closed'>Closed</MaterialMenuItem>
                        <MaterialMenuItem value='Cancelled'>Cancelled</MaterialMenuItem>
                    </MaterialTextField>
                    {projectData && projectUsers &&
                        <MaterialAutocomplete
                            value = { selectedAssignee }
                            name = 'assignee'
                            options={ projectUsers }
                            onChange={(e, value) => {
                                setSelectedAssignee(value)
                            }}
                            isOptionEqualToValue={(option, value) => option?.id === value?.id}
                            sx={{ mb: 2 }}
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
                        sx = {{ mb: 2 }}
                    />
                    <MaterialDialogActions>
                        <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
                        </MaterialButton>
                        <MaterialButton 
                            type = "submit"
                            onClick={( e ) => handleCreateTicket( e, handleclose, getUpdatedProjectTickets, selectedAssignee )} 
                            disabled = { isSubmitting ? isSubmitting : !(isValid && dirty) }
                            autoFocus
                        >
                            Add Bug
                        </MaterialButton>
                    </MaterialDialogActions>
                </form>
            )}
            </Formik>
            <MainLoading/>
        </>
    )
}

export default Index
