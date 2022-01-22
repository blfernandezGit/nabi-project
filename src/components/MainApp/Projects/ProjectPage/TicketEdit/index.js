import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'

const Index = ({ origTitle, origDescription, origStatus, origAssignee, origResolution, code, ticket_no, handleclose, getUpdatedTicket }) => {
    const { title, description, status, assignee, resolution, handleEditTicket } = useHooks( code, ticket_no );

    return (
        <>
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Edit Ticket
            </MaterialTypography>
            <Formik
                initialValues={{ title: origTitle, description: origDescription || '', status: origStatus, assignee: origAssignee || '', resolution: origResolution || ''}}
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(255).required('Title is required'),
                    description: Yup.string().nullable(),
                    assignee: Yup.string().nullable(),
                    status: Yup.string().required('Status is required'),
                    resolution: Yup.string().nullable()
                })}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
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
                        sx = {{ mt: 2 }}
                    />
                    <MaterialTextField
                        label = "Assignee"
                        type = "text"
                        name = "assignee"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.assignee }
                        inputRef = { assignee }
                        error = {Boolean( touched.assignee && errors.assignee )}
                        helperText = { touched.assignee && errors.assignee }
                        fullWidth
                        sx = {{ mt: 2 }}
                    />
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
                        disabled = { isSubmitting }
                        onClick = {( e ) => handleEditTicket( e, handleclose, getUpdatedTicket )}
                        variant = "contained"
                        size = "large"
                    >
                        Update Ticket
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
