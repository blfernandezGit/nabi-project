import {Formik} from 'formik';
import * as Yup from 'yup';
import useHooks from './hooks';
import MaterialTextField from '@mui/material/TextField';
import MaterialButton from '@mui/material/Button';
import MaterialDialogActions from '@mui/material/DialogActions';

const Index = ({code, origName, origDescription, handleclose, getNewProjects}) => {
  const {name, description, handleEditProject} = useHooks( code );

  return (
    <>
      <Formik
        initialValues={{name: origName, description: origDescription}}
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
          isValid,
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
            <MaterialTextField
              label = "Description"
              type = "text"
              name = "description"
              onChange = { handleChange }
              onBlur = { handleBlur }
              value = { values.description }
              inputRef = { description }
              error = {Boolean( touched.description && errors.description )}
              helperText = { touched.description && errors.description }
              fullWidth
              multiline
              rows = { 5 }
              sx = {{my: 3}}
            />
            <MaterialDialogActions>
              <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
              </MaterialButton>
              <MaterialButton
                type = "submit"
                disabled = { isSubmitting ? isSubmitting : !isValid }
                onClick = {( e ) => handleEditProject( e, handleclose, getNewProjects )}
                autoFocus
              >
                            Update Project
              </MaterialButton>
            </MaterialDialogActions>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Index;
