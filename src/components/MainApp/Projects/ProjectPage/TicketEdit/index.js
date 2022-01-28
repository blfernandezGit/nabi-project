import MaterialAutocomplete from '@mui/material/Autocomplete';
import MaterialButton from '@mui/material/Button';
import MaterialCheckbox from '@mui/material/Checkbox';
import MaterialDialogActions from '@mui/material/DialogActions';
import MaterialFormControlLabel from '@mui/material/FormControlLabel';
import MaterialMenuItem from '@mui/material/MenuItem';
import MaterialTextField from '@mui/material/TextField';
import MaterialTypography from '@mui/material/Typography';
import {Formik} from 'formik';
import {useContext, useEffect, useState} from 'react';
import {useQuery} from 'react-query';
import * as Yup from 'yup';
import {AppContext} from '../../../../Context/AppContext';
import {apiClient} from '../../../../Helpers/apiClient';
import {projectListUrl} from '../../../../Helpers/constants';
import MainLoading from '../../../Layout/LoadingScreen/MainLoading';
import useHooks from './hooks';

const Index = ({origTitle, origDescription, origStatus, origAssignee, origResolution, origImage, code, ticket_no, handleclose, getUpdatedTicket}) => {
  const {title, description, status, resolution, handleEditTicket,
    uploadedImage, deleteImage,
  } = useHooks( code, ticket_no );

  const {currentUser} = useContext( AppContext );
  const [projectUsers, setProjectUsers] = useState();
  const [selectedAssignee, setSelectedAssignee] = useState(origAssignee);

  const {isLoading: isLoadingProject, data: projectData} = useQuery( `${ code }`, apiClient(`${projectListUrl}/${code}`, currentUser.headers, null, 'GET' ), {retry: false});

  useEffect(() => {
    setProjectUsers(
        projectData?.attributes?.users
            .map( (user) => {
              return ({
                label: user?.username,
                id: user?.id,
              });
            }),
    );
    // eslint-disable-next-line
    }, [projectData])

  return (
    <>
      <MainLoading isLoading = { isLoadingProject } />
      <>
        <Formik
          initialValues={{title: origTitle, description: origDescription || '', status: origStatus, resolution: origResolution || '',
            assignee: origAssignee || {label: '', id: ''},
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().max(255).required('Title is required'),
            status: Yup.string().required('Status is required'),
          })}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            isValid,
          }) => (
            <form onSubmit = { handleSubmit }>
              <MaterialTextField
                label = "Title"
                type = "text"
                name = "title"
                onChange = { handleChange }
                onBlur = { handleBlur }
                value = { values.title }
                inputRef = { title }
                error = {Boolean( touched.title && errors.title )}
                helperText = { touched.title && errors.title }
                fullWidth
                sx = {{mt: 1}}
              />
              <MaterialTextField
                label = "Status"
                type = "text"
                name = "status"
                onChange = { handleChange }
                onBlur = { handleBlur }
                value = { values.status }
                inputRef = { status }
                error = {Boolean( touched.status && errors.status )}
                helperText = { touched.status && errors.status }
                fullWidth
                select
                sx = {{mt: 2}}
              >
                <MaterialMenuItem value='Open'>Open</MaterialMenuItem>
                <MaterialMenuItem value='ForFixing'>For Fixing</MaterialMenuItem>
                <MaterialMenuItem value='ForTesting'>For Testing</MaterialMenuItem>
                <MaterialMenuItem value='Closed'>Closed</MaterialMenuItem>
                <MaterialMenuItem value='Cancelled'>Cancelled</MaterialMenuItem>
              </MaterialTextField>
              {projectData && projectUsers &&
                        <MaterialAutocomplete
                          value = { selectedAssignee }
                          name = 'assignee'
                          options={ projectUsers }
                          onChange={(e, value) => {
                            setSelectedAssignee(value);
                          }}
                          isOptionEqualToValue={(option, value) => option?.id === value?.id}
                          sx={{mt: 2}}
                          renderInput={(params) => (
                            <MaterialTextField
                              {...params}
                              label="Assignee"
                              name = 'assignee'
                              fullWidth
                            />
                          )}
                        />
              }
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
                rows = {4}
                sx = {{mt: 2}}
              />
              <MaterialTextField
                label = "Resolution"
                type = "text"
                name = "resolution"
                onChange = { handleChange }
                onBlur = { handleBlur }
                value = { values.resolution }
                inputRef = { resolution }
                error = {Boolean( touched.resolution && errors.resolution )}
                helperText = { touched.resolution && errors.resolution }
                fullWidth
                multiline
                rows = {4}
                sx = {{my: 2}}
              />
              <MaterialTypography component="span">
                {
                        origImage ?
                        'Replace Image: ' :
                        'Add Image: '
                }
              </MaterialTypography>
              <label htmlFor="icon-button-file">
                <input accept="image/*" id="icon-button-file" type="file" ref={uploadedImage} />
              </label>
              { origImage &&
                        <MaterialFormControlLabel control={
                          <MaterialCheckbox
                            name="delete_image"
                            onChange = { handleChange }
                            onBlur = { handleBlur }
                            value = { values.delete_image }
                            inputRef = { deleteImage }
                          />
                        } label="Delete Image"/>
              }
              <MaterialDialogActions>
                <MaterialButton autoFocus onClick={handleclose}>
                            Cancel
                </MaterialButton>
                <MaterialButton
                  type = "submit"
                  onClick = {( e ) => handleEditTicket( e, handleclose, getUpdatedTicket, selectedAssignee )}
                  disabled = { isSubmitting ? isSubmitting : !isValid }
                  autoFocus
                >
                            Update Bug
                </MaterialButton>
              </MaterialDialogActions>
            </form>
          )}
        </Formik>
      </>
    </>
  );
};

export default Index;
