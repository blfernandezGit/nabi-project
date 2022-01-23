import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import MaterialMenuItem from '@mui/material/MenuItem'

const Index = ({ code, origName, origDescription, handleclose, getNewProjects }) => {
    const { name, description, handleEditProject } = useHooks( code );

    return (
        <>
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Edit Project
            </MaterialTypography>
            <Formik
                initialValues={{ name: origName, description: origDescription }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Project Name is required'),
                    description: Yup.string().nullable(),
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
                isValid
            }) => (
                <form onSubmit = { handleSubmit }>
                    <MaterialTextField
                        label = "Project Name"
                        type = "text"
                        name = "name"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.name }
                        inputRef = { name }
                        error = {Boolean( touched.name && errors.name )}
                        helperText = { touched.name && errors.name }
                        fullWidth
                        sx = {{ my: 2 }}
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
                        rows = { 5 }
                        sx = {{ my: 3 }}
                    />
                    <Button 
                        type = "submit"
                        disabled = { !isValid }
                        onClick = {( e ) => handleEditProject( e, handleclose, getNewProjects )}
                        variant = "contained"
                        size = "large"
                    >
                        Update Project
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
