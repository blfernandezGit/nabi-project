import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import MaterialMenuItem from '@mui/material/MenuItem'

const Index = ({ code, projectName, handleclose, getNewProjects }) => {
    const { name, handleDeleteProject } = useHooks( code, projectName );

    return (
        <>
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Delete Project
            </MaterialTypography>
            <MaterialTypography
                color="error"
                variant="subtitle2"
                sx = {{ my: 2 }}
            >
                Warning: This action will delete the project permanently as well as all the tickets within the project. Please type Project Name to proceed.
            </MaterialTypography>
            <Formik
                initialValues={{ name: '' }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().max(255).required('Project Name is required')
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
                    <Button 
                        type = "submit"
                        disabled = { isSubmitting }
                        onClick = {( e ) => handleDeleteProject( e, handleclose, getNewProjects )}
                        variant = "contained"
                        size = "large"
                    >
                        Delete Project
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
