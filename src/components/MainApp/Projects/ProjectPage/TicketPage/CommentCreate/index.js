import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import MaterialTextField from '@mui/material/TextField'
import MaterialButton from '@mui/material/Button'
import MaterialDialogActions from '@mui/material/DialogActions'

const Index = ({ code, ticket_no, handleclose, getNewComments }) => {
    const { handleCreateComment, comment_text } = useHooks( code, ticket_no );

    return (
        <>
            <Formik
                initialValues={{ comment_text: ''}}
                validationSchema={Yup.object().shape({
                    comment_text: Yup.string().max(255).required('Comment Text is required')
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
                        label = "Comment"
                        type = "text"
                        name = "comment_text"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.comment_text }
                        inputRef = { comment_text }
                        error = {Boolean( touched.comment_text && errors.comment_text )}
                        helperText = { touched.comment_text && errors.comment_text }
                        fullWidth
                        sx = {{ my: 2 }}
                        multiline
                        rows = { 8 }
                    />
                    <MaterialDialogActions>
                        <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
                        </MaterialButton>
                        <MaterialButton 
                            type = "submit"
                            disabled = { isSubmitting ? isSubmitting : !(isValid && dirty) }
                            onClick = {( e ) => handleCreateComment( e, handleclose, getNewComments )}
                            autoFocus
                        >
                            Add Comment
                        </MaterialButton>
                    </MaterialDialogActions>

                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
