import MaterialContainer from '@mui/material/Container'
import styled from 'styled-components'

export const LoginContainer = styled( MaterialContainer ) `
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    height: 100vh !important;
    text-align: center;
    justify-content: center;
    box-border: rounded !important;
    background: #FFFFFF !important;
    @media (min-width: 600px) {
        height: 80vh !important;
    }
`