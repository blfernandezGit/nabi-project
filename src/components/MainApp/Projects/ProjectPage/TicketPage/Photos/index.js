import { useState } from 'react'
import Dialog from '../../../../Layout/Dialog'

const Index = ({image}) => {
    const [ open, setOpen ] = useState()
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return (
        <>
            <img
                src={image.url}
                alt='BugImage'
                loading="lazy"
                style = {{maxWidth: '70%'}}
                onClick={handleOpen}
            />
        <Dialog
            open={open}
            setOpen={setOpen}
            fullScreen={true}
            style={{maxWidth: '100vw', maxHeight: '100vh', padding: '0px', margin: '0px'}}
        >
            <img
                src={image.url}
                alt='BugImage'
                loading="lazy"
                style={{maxWidth: '100vw', maxHeight: '100vh'}}
                onClick={handleClose}
            />
            </Dialog>
        </>
    );
};

export default Index;