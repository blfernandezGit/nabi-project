import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container,  Link, Logo } from '../../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'

const Index = ({ code, ticket_no, handleclose, getNewComments }) => {
    const { handleCreateComment, comment_text } = useHooks( code, ticket_no );

    return (
        <>
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Add New Comment
            </MaterialTypography>
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
                isSubmitting
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
                    <Button 
                        type = "submit"
                        disabled = { isSubmitting }
                        onClick = {( e ) => handleCreateComment( e, handleclose, getNewComments )}
                        variant = "contained"
                        size = "large"
                    >
                        Add Comment
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
