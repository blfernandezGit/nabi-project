import {useEffect, useState} from 'react';
import {Formik} from 'formik';
import useHooks from './hooks';
import MaterialButton from '@mui/material/Button';
import MaterialDialogActions from '@mui/material/DialogActions';
import Select from 'react-select';

const Index = ({userProjects, userData, projectsData, handleclose, getNewProjects}) => {
  const {handleAddUserProjects} = useHooks( userData );
  const [projectsList, setProjectList] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);

  const handleChange = (e, setFieldValue) => {
    setSelectedProjects(Array.isArray(e) ? e.map((select) => select.value) : []);
    setFieldValue('name', Array.isArray(e) ? e.map((select) => select.value) : []);
  };

  useEffect(() => {
    setProjectList(
        projectsData
            .filter((project) => !userProjects?.map((userProject) => {
              return userProject.id;
            }).includes(project.id))
            .map( (project) => {
              return ({value: project?.id, label: project?.attributes?.name});
            }),
    );
    // eslint-disable-next-line
    }, [])

  return (
    <>
      <Formik
        initialValues={{name: '', description: ''}}
      >
        {({
          handleSubmit,
          isSubmitting,
          setFieldValue,
          setFieldTouched,
          dirty,
        }) => (
          <form onSubmit = { handleSubmit } style={{minHeight: '300px'}}>
            <Select
              options = { projectsList }
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
                onClick = {( e ) => handleAddUserProjects( e, handleclose, getNewProjects, selectedProjects )}
                autoFocus
              >
                            Add Projects
              </MaterialButton>
            </MaterialDialogActions>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Index;
