import { useEffect, useState } from 'react'
import { Link as RouteLink } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import useHooks from './hooks'
import { Button, Container, Link, Logo } from '../../../../Layout/Elements'
import MaterialTextField from '@mui/material/TextField'
import MaterialTypography from '@mui/material/Typography'
import MaterialMenuItem from '@mui/material/MenuItem'
import MaterialTable from '@mui/material/Table'
import MaterialTableRow from '@mui/material/TableRow'
import MaterialTableBody from '@mui/material/TableBody'
import Select from 'react-select'

const Index = ({ userProjects, userData, projectsData, handleclose, getNewProjects }) => {
    const { handleAddUserProjects } = useHooks( userData )
    const [ projectsList, setProjectList ] = useState([])
    const [ selectedProjects, setSelectedProjects ] = useState([])

    const handleChange = (e, setFieldValue) => {
        setSelectedProjects(Array.isArray(e) ? e.map(select => select.value) : [])
        setFieldValue('name', Array.isArray(e) ? e.map(select => select.value) : [])
    }
    
    useEffect(() => {
        setProjectList(
            projectsData
            .filter(project => !userProjects?.map(userProject => { return userProject.id }).includes(project.id))
            .map( project => {
                return ({ value: project?.id, label: project?.attributes?.name })
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
                Add user to projects
            </MaterialTypography>
            <Formik
                initialValues={{ name: '', description: '' }}
            >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                setFieldTouched,
                dirty
            }) => (
                <form onSubmit = { handleSubmit } style = {{ width: '80%' }}>
                    <Select
                        options = { projectsList }
                        isMulti
                        onChange = { (e) => handleChange(e, setFieldValue) }
                        onBlur = { setFieldTouched }
                        name = "name"
                    />
                    <Button
                        type = "submit"
                        disabled = { isSubmitting ? isSubmitting : !dirty }
                        onClick = {( e ) => handleAddUserProjects( e, handleclose, getNewProjects, selectedProjects )}
                        variant = "contained"
                        size = "large"
                        sx = {{ my: 3}}
                    >
                        Add Projects
                    </Button>
                </form>
            )}
            </Formik>
        </>
    )
}

export default Index
