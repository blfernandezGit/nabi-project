import MaterialDialog from '@mui/material/Dialog'
import MaterialDialogActions from '@mui/material/DialogActions'
import MaterialDialogContent from '@mui/material/DialogContent'
import MaterialDialogContentText from '@mui/material/DialogContentText'
import MaterialDialogTitle from '@mui/material/DialogTitle'
import MaterialButton from '@mui/material/Button'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTheme } from '@mui/material/styles'

const Index = ( props ) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'))
    const handleClose = () => { props.setOpen( false ) }
    return (
        <>
            <MaterialDialog
                fullScreen={props.fullScreen ? props.fullScreen : fullScreen}
                open={props.open}
                maxWidth={props.maxWidth}
                scroll='paper'
                onClose={handleClose}
                fullWidth
                aria-labelledby="dialog"
                style={props.style}
            >
                <MaterialDialogTitle>
                    { props.title }
                </MaterialDialogTitle>
                <MaterialDialogContent>
                    { props.warningText &&
                        <MaterialDialogContentText
                            color = 'error'
                        >
                            { props.warningText }
                        </MaterialDialogContentText>
                    }
                    { props.children }
                </MaterialDialogContent>
            </MaterialDialog>
        </>
    );
};

export default Index;
