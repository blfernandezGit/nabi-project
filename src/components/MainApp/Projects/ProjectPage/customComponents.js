import styled from 'styled-components'
import MaterialTableCell from '@mui/material/TableCell'
import MaterialContainer from '@mui/material/Container'

export const HideTableCell = styled(MaterialTableCell) `
    @media (max-width: 900px) {
        display: none !important;
    }
`

export const FormContainer = styled( MaterialContainer ) `
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    height: 100vh !important;
    text-align: center;
    justify-content: center;
    background: #FFFFFF !important;
    @media (min-width: 600px) {
        height: 80vh !important;
    }
`
