import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import MaterialMenuItem from '@mui/material/MenuItem'

const Index = ({ username, handleclose, getNewUsers }) => {
    const { inputUsername, handleDeleteUser } = useHooks( username );

    return (
        <>
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Delete User
            </MaterialTypography>
            <MaterialTypography
                color="error"
                variant="subtitle2"
                sx = {{ my: 2 }}
            >
                Warning: This action will delete the user permanently as well as all the tickets and comments created by the user. Please type username of user to be deleted to proceed.
            </MaterialTypography>
            <Formik
                initialValues={{ inputUsername: '' }}
                validationSchema={Yup.object().shape({
                    inputUsername: Yup.string().max(255).required('Username is required')
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
                        label = "Username"
                        type = "text"
                        name = "inputUsername"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.inputUsername }
                        inputRef = { inputUsername }
                        error = {Boolean( touched.inputUsername && errors.inputUsername )}
                        helperText = { touched.inputUsername && errors.inputUsername }
                        fullWidth
                        sx = {{ my: 2 }}
                    />
                    <Button 
                        type = "submit"
                        disabled = { isSubmitting }
                        onClick = {( e ) => handleDeleteUser( e, handleclose, getNewUsers )}
                        variant = "contained"
                        size = "large"
                    >
                        Delete User
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
