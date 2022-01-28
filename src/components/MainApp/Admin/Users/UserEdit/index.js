import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import MaterialFormControlLabel from '@mui/material/FormControlLabel'
import MaterialCheckbox from '@mui/material/Checkbox'
import MaterialButton from '@mui/material/Button'
import MaterialDialogActions from '@mui/material/DialogActions'

const Index = ({ username, origFirstName, origLastName, origIsAdmin, handleclose, getNewUsers }) => {
    const { first_name, last_name, is_admin, handleEditUser } = useHooks( username )

    const [ checked, setChecked ] = useState(origIsAdmin)

    return (
        <>
            <Formik
                initialValues={{ first_name: origFirstName, last_name: origLastName, is_admin: origIsAdmin  }}
                validationSchema={Yup.object().shape({
                    first_name: Yup.string().max(255).required('First Name is required'),
                    last_name: Yup.string().max(255).required('Last Name is required'),
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
                        label = "First Name"
                        type = "text"
                        name = "first_name"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.first_name }
                        inputRef = { first_name }
                        error = {Boolean( touched.first_name && errors.first_name )}
                        helperText = { touched.first_name && errors.first_name }
                        fullWidth
                        sx = {{ mt: 3 }}
                    />
                    <MaterialTextField
                        label = "Last Name"
                        type = "text"
                        name = "last_name"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.last_name }
                        inputRef = { last_name }
                        error = {Boolean( touched.last_name && errors.last_name )}
                        helperText = { touched.last_name && errors.last_name }
                        fullWidth
                        sx = {{ mt: 2 }}
                    />
                    <MaterialFormControlLabel control={
                        <MaterialCheckbox 
                            name="is_admin"
                            onChange = { () => setChecked(!checked) }
                            onBlur = { handleBlur }
                            value = { checked }
                            inputRef = { is_admin }
                            checked = { checked }
                        />
                    } label="Set User as Administrator"
                    sx = {{ mt: 2 }}
                    />
                    <MaterialDialogActions>
                        <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
                        </MaterialButton>
                        <MaterialButton 
                            type = "submit"
                            disabled={ isSubmitting ? isSubmitting : !isValid }
                            onClick = {( e ) => handleEditUser( e, handleclose, getNewUsers )}
                            autoFocus
                        >
                            Update User
                        </MaterialButton>
                    </MaterialDialogActions>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
