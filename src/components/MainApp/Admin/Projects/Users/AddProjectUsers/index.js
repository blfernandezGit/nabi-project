import { useEffect, useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container, Link, Logo } from '../../../../Layout/Elements'
import MaterialTypography from '@mui/material/Typography'
import Select from 'react-select'

const Index = ({ projectUsers, projectData, usersData, handleclose, getNewUsers }) => {
    const { handleAddProjectUsers } = useHooks( projectData )
    const [ usersList, setUsersList ] = useState([])
    const [ selectedUsers, setSelectedUsers ] = useState([])

    const handleChange = (e, setFieldValue) => {
        setSelectedUsers(Array.isArray(e) ? e.map(select => select.value) : [])
        setFieldValue('name', Array.isArray(e) ? e.map(select => select.value) : [])
    }

    console.log(projectUsers)
    console.log(usersData)
    
    useEffect(() => {
        setUsersList(
            usersData
            .filter(user => !projectUsers?.map(projectUser => { return projectUser.id }).includes(user.id))
            .map( user => {
                return ({ value: user?.id, label: user?.attributes?.username })
            })
        )
    //eslint-disable-next-line
    }, [])

    return (
        <>
            <MaterialTypography
                color="textSecondary"
                variant="body2"
                sx = {{ my: 2 }}
            >
                Add users to project
            </MaterialTypography>
            <Formik
                initialValues={{ name: '', description: '' }}
                validationSchema={Yup.object().shape({
                    name: Yup.string().ensure().required('Project Name is required')
                })}
            >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setFieldTouched
            }) => (
                <form onSubmit = { handleSubmit } style = {{ width: '80%' }}>
                    <Select
                        options = { usersList }
                        isMulti
                        onChange = { (e) => handleChange(e, setFieldValue) }
                        onBlur = { setFieldTouched }
                        name = "name"
                    />
                    <Button
                        type = "submit"
                        disabled = { isSubmitting }
                        onClick = {( e ) => handleAddProjectUsers( e, handleclose, getNewUsers, selectedUsers )}
                        variant = "contained"
                        size = "large"
                        sx = {{ my: 3}}
                    >
                        Add Users
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
