import { useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import MaterialFormControlLabel from '@mui/material/FormControlLabel'
import MaterialCheckbox from '@mui/material/Checkbox'

const Index = ({ username, origFirstName, origLastName, origIsAdmin, handleclose, getNewUsers }) => {
    const { first_name, last_name, is_admin, handleEditUser } = useHooks( username )

    const [ checked, setChecked ] = useState(origIsAdmin)

    return (
        <>
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Edit User
            </MaterialTypography>
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
                        sx = {{ my: 3 }}
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
                        sx = {{ my: 3 }}
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
                    } label="Set User as Administrator" />
                    <Button 
                        type = "submit"
                        disabled={ !isValid }
                        onClick = {( e ) => handleEditUser( e, handleclose, getNewUsers )}
                        variant = "contained"
                        size = "large"
                    >
                        Update User
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
