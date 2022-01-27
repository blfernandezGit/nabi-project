import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import MaterialTextField from '@mui/material/TextField'
import MaterialFormControlLabel from '@mui/material/FormControlLabel'
import MaterialCheckbox from '@mui/material/Checkbox'
import MaterialButton from '@mui/material/Button'
import MaterialDialogActions from '@mui/material/DialogActions'

const Index = ({ handleclose, getNewUsers }) => {
    const { firstName, lastName, username, email, is_admin, password, passwordConfirmation, handleCreateUser} = useHooks()

    return (
        <>
            <Formik
                initialValues={{ firstName: '', lastName: '', username: '', email: '', is_admin: false, password: '', passwordConfirmation: ''}}
                validationSchema={Yup.object().shape({
                    firstName: Yup.string().max(255).required('First Name is required'),
                    lastName: Yup.string().max(255).required('Last Name is required'),
                    username: Yup.string().max(255).required('Username is required'),
                    email: Yup.string().email('Invalid email').max(255).required('Email is required'),
                    is_admin: Yup.string().required('Admin indicator is required'),
                    password: Yup.string().max(255).required('Password is required'),
                    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Password confirmation is required')
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
                        sx = {{ mt: 3 }}
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
                        sx = {{ mt: 2 }}
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
                        sx = {{ mt: 2 }}
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
                        sx = {{ mt: 2 }}
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
                        sx = {{ mt: 2 }}
                    />
                    <MaterialFormControlLabel control={
                        <MaterialCheckbox 
                            name="is_admin"
                            onChange = { handleChange }
                            onBlur = { handleBlur }
                            value = { values.is_admin }
                            inputRef = { is_admin }
                        />
                    } label="Set User as Administrator" sx = {{ mt: 2 }} />
                    <MaterialDialogActions>
                        <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
                        </MaterialButton>
                        <MaterialButton 
                            type = "submit"
                            disabled={ isSubmitting ? isSubmitting : !(isValid && dirty) }
                        onClick = {( e ) => handleCreateUser( e, handleclose, getNewUsers )}
                            autoFocus
                        >
                            Create User
                        </MaterialButton>
                    </MaterialDialogActions>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
