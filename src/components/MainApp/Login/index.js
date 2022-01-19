import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo, TextField, Typography } from '../Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import { LoginContainer } from './customComponents'
import nabi_logo from '../../../assets/nabi_logo.png'

const Index = () => {
    const { email, password, handleLogin} = useHooks();

    return (
        <>
            <Container
                maxWidth = "xl"
            >
                <LoginContainer
                    maxWidth = "sm"
                >
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
                    <Formik
                        initialValues={{ email: '', password: ''}}
                        validationSchema={Yup.object().shape({
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
                                sx = {{ mt: 2 }}
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
                            <Button 
                                type = "submit"
                                disabled = { isSubmitting }
                                onClick = {( e ) => handleLogin( e )}
                                variant = "contained"
                                size = "large"
                            >
                                Log in
                            </Button>
                            <MaterialTypography
                                color="textSecondary"
                                variant="body2"
                                sx = {{ my: 2 }}
                                >
                                Don't have an account?
                                {' '}
                                <Link 
                                    component = { RouteLink }
                                    to = "/register"
                                    underline = "hover"
                                    variant = "body1"
                                >
                                    Sign up
                                </Link>
                            </MaterialTypography>
                        </form>
                    )}
                    </Formik>
                </LoginContainer>
            </Container>
        </>
    )
}

export default Index
