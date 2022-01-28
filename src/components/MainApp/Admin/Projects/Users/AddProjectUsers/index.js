import { useEffect, useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import Select from 'react-select'
import MaterialButton from '@mui/material/Button'
import MaterialDialogActions from '@mui/material/DialogActions'

const Index = ({ projectUsers, projectData, usersData, handleclose, getNewUsers }) => {
    const { handleAddProjectUsers } = useHooks( projectData )
    const [ usersList, setUsersList ] = useState([])
    const [ selectedUsers, setSelectedUsers ] = useState([])

    const handleChange = (e, setFieldValue) => {
        setSelectedUsers(Array.isArray(e) ? e.map(select => select.value) : [])
        setFieldValue('name', Array.isArray(e) ? e.map(select => select.value) : [])
    }
    
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
            <Formik
                initialValues={{ name: '' }}
            >
            {({
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                dirty
            }) => (
                <form onSubmit = { handleSubmit } style = {{ minHeight: '300px' }}>
                    <Select
                        options = { usersList }
                        isMulti
                        onChange = { (e) => handleChange(e, setFieldValue) }
                        onBlur = { setFieldTouched }
                        name = "name"
                    />
                    <MaterialDialogActions>
                        <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
                        </MaterialButton>
                        <MaterialButton 
                            type = "submit"
                            disabled = { isSubmitting ? isSubmitting : !dirty }
                            onClick = {( e ) => handleAddProjectUsers( e, handleclose, getNewUsers, selectedUsers )}
                            autoFocus
                        >
                            Add Users
                        </MaterialButton>
                    </MaterialDialogActions>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
