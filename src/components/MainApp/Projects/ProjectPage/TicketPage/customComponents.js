import styled from 'styled-components'
import MaterialContainer from '@mui/material/Container'

export const CommentContainer = styled( MaterialContainer ) `
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
        height: 60vh !important;
    }
`
