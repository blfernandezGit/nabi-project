import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import MaterialTextField from '@mui/material/TextField'
import MaterialButton from '@mui/material/Button'
import MaterialDialogActions from '@mui/material/DialogActions'
import MaterialDialogContentText from '@mui/material/DialogContentText'

const Index = ({ username, handleclose, getNewUsers }) => {
    const { inputUsername, handleDeleteUser } = useHooks( username );

    return (
        <>
            <MaterialDialogContentText
                color="error"
                variant="subtitle2"
                sx = {{ my: 2 }}
            >
                Warning: This action will delete the selected user permanently as well as all the tickets and comments created by the user. Please type username of user to be deleted to proceed.
            </MaterialDialogContentText>
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
                    <MaterialDialogActions>
                        <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
                        </MaterialButton>
                        <MaterialButton 
                            type = "submit"
                            disabled = { isSubmitting }
                            onClick = {( e ) => handleDeleteUser( e, handleclose, getNewUsers )}
                            autoFocus
                        >
                            Delete User
                        </MaterialButton>
                    </MaterialDialogActions>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
