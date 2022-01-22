import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'

const Index = ({ code, handleclose, getNewTickets }) => {
    const { title, description, status, assignee, handleCreateTicket } = useHooks(code);

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
                initialValues={{ title: '', description: '', status: 'Open', assignee: ''}}
                validationSchema={Yup.object().shape({
                    title: Yup.string().max(255).required('Title is required'),
                    description: Yup.string(),
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
                        sx = {{ my: 3 }}
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
                        sx = {{ my: 3 }}
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
                        sx = {{ my: 3 }}
                    />
                    <Button 
                        type = "submit"
                        disabled = { isSubmitting }
                        onClick = {( e ) => handleCreateTicket( e, handleclose, getNewTickets )}
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
