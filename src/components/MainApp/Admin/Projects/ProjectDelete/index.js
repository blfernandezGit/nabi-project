import {Formik} from 'formik';
import * as Yup from 'yup';
import useHooks from './hooks';
import MaterialTextField from '@mui/material/TextField';
import MaterialDialogContentText from '@mui/material/DialogContentText';
import MaterialButton from '@mui/material/Button';
import MaterialDialogActions from '@mui/material/DialogActions';

const Index = ({code, projectName, handleclose, getNewProjects}) => {
  const {name, handleDeleteProject} = useHooks( code, projectName );

  return (
    <>
      <MaterialDialogContentText
        color="error"
        variant="subtitle2"
      >
                Warning: This action will delete the project permanently as well as all the tickets within the project. Please type Project Name to proceed.
      </MaterialDialogContentText>
      <Formik
        initialValues={{name: ''}}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Project Name is required'),
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
        }) => (
          <form onSubmit = { handleSubmit }>
            <MaterialTextField
              label = "Project Name"
              type = "text"
              name = "name"
              onChange = { handleChange }
              onBlur = { handleBlur }
              value = { values.name }
              inputRef = { name }
              error = {Boolean( touched.name && errors.name )}
              helperText = { touched.name && errors.name }
              fullWidth
              sx = {{my: 2}}
            />
            <MaterialDialogActions>
              <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
              </MaterialButton>
              <MaterialButton
                type = "submit"
                disabled = { isSubmitting }
                onClick = {( e ) => handleDeleteProject( e, handleclose, getNewProjects )}
                autoFocus
              >
                            Delete Project
              </MaterialButton>
            </MaterialDialogActions>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Index;
