import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'

const Index = () => {
    const { email, password, handleLogin} = useHooks();

    return (
        <div>
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
                    <input
                        type = "email"
                        name = "email"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.email }
                        ref = { email }
                    />
                    {errors.email && touched.email && errors.email}
                    <input
                        type = "password"
                        name = "password"
                        onChange = { handleChange }
                        onBlur = { handleBlur }
                        value = { values.password }
                        ref = { password }
                    />
                    {errors.password && touched.password && errors.password}
                    <button type="submit" disabled={isSubmitting} onClick={(e) => handleLogin(e)}>
                        Login
                    </button>
                </form>
            )}
            </Formik>
        </div>
    )
}

export default Index
