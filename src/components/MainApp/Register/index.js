import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import { LogoContainer, LogoFormContainer, RegisterContainer } from './customComponents'
import nabi_logo from '../../../assets/nabi_logo.png'

// TODO: make this prettier
// TODO: add more validations from backend
const Index = () => {
    const { firstName, lastName, username, email, password, passwordConfirmation, handleSignUp} = useHooks();

    return (
        <>
            <Container
                maxWidth = "xl"
            >
                <LogoContainer>
                    <Logo 
                        src={nabi_logo}
                    />
                    <MaterialTypography
                        color="textSecondary"
                        variant="body2"
                        sx = {{ my: 2 }}
                    >
                        Nabi Project: Bug Tracking App
                    </MaterialTypography>
                </LogoContainer>
                <RegisterContainer>
                    <LogoFormContainer>
                        <Logo 
                            src={nabi_logo}
                        />
                    </LogoFormContainer>
                    <Formik
                        initialValues={{ firstName: '', lastName: '', username: '', email: '', password: '', passwordConfirmation: ''}}
                        validationSchema={Yup.object().shape({
                            firstName: Yup.string().max(255).required('First Name is required'),
                            lastName: Yup.string().max(255).required('Last Name is required'),
                            username: Yup.string().max(255).required('Username is required'),
                            email: Yup.string().email('Invalid email').max(255).required('Email is required'),
                            password: Yup.string().max(255).required('Password is required')
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
                                label = "First Name"
                                type = "text"
                                name = "firstName"
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                value = { values.firstName }
                                inputRef = { firstName }
                                error = {Boolean( touched.firstName && errors.firstName )}
                                helperText = { touched.firstName && errors.firstName }
                                fullWidth
                                sx = {{ my: 3 }}
                            />
                            <MaterialTextField
                                label = "Last Name"
                                type = "text"
                                name = "lastName"
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                value = { values.lastName }
                                inputRef = { lastName }
                                error = {Boolean( touched.lastName && errors.lastName )}
                                helperText = { touched.lastName && errors.lastName }
                                fullWidth
                            />
                            <MaterialTextField
                                label = "Username"
                                type = "text"
                                name = "username"
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                value = { values.username }
                                inputRef = { username }
                                error = {Boolean( touched.username && errors.username )}
                                helperText = { touched.username && errors.username }
                                fullWidth
                                sx = {{ my: 3 }}
                            />
                            <MaterialTextField
                                label = "Email Address"
                                type = "email"
                                name = "email"
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                value = { values.email }
                                inputRef = { email }
                                error = {Boolean( touched.email && errors.email )}
                                helperText = { touched.email && errors.email }
                                fullWidth
                            />
                            <MaterialTextField
                                label = "Password"
                                type = "password"
                                name = "password"
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                value = { values.password }
                                inputRef = { password }
                                error = {Boolean( touched.password && errors.password )}
                                helperText = { touched.password && errors.password }
                                fullWidth
                                sx = {{ my: 3 }}
                            />
                            <MaterialTextField
                                label = "Password Confirmation"
                                type = "password"
                                name = "passwordConfirmation"
                                onChange = { handleChange }
                                onBlur = { handleBlur }
                                value = { values.passwordConfirmation }
                                inputRef = { passwordConfirmation }
                                error = {Boolean( touched.passwordConfirmation && errors.passwordConfirmation )}
                                helperText = { touched.passwordConfirmation && errors.passwordConfirmation }
                                fullWidth
                                sx = {{ mb: 3 }}
                            />
                            <Button 
                                type = "submit"
                                disabled = { isSubmitting }
                                onClick = {( e ) => handleSignUp( e )}
                                variant = "contained"
                                size = "large"
                            >
                                Sign up
                            </Button>
                            <MaterialTypography
                                color="textSecondary"
                                variant="body2"
                                sx = {{ my: 2 }}
                                >
                                Already have an account?
                                {' '}
                                <Link 
                                    component = { RouteLink }
                                    to = "/login"
                                    underline = "hover"
                                    variant = "body1"
                                >
                                    Log in
                                </Link>
                            </MaterialTypography>
                        </form>
                    )}
                    </Formik>
                </RegisterContainer>
            </Container>
        </>
    )
}

export default Index