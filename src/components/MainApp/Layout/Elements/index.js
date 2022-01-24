import MaterialBox from '@mui/material/Box'
import MaterialContainer from '@mui/material/Container'
import MaterialButton from '@mui/material/Button'
import MaterialLink from '@mui/material/Link'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'
import MaterialTableCell from '@mui/material/TableCell'

const fadeInAnimation = keyframes`${ fadeIn }`

export const Box = styled(MaterialBox) `
    display: flex !important;
    flex-direction: column !important;
    
`

export const Container = styled( MaterialContainer ) `
    display: flex !important;
    align-items: center !important;
    height: 100vh !important;
    text-align: center;
    justify-content: center;
    background: #6667ab !important;
    animation: 1s ${ fadeInAnimation };
`

export const ColumnContainer = styled( MaterialContainer ) `
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    min-height: 100% !important;
    width: 100% !important;
    max-width: 100% !important;
    padding: 0 !important;
    padding-bottom: 50px !important;
    animation: 1s ${ fadeInAnimation };
    @media (min-width: 600px) {
        padding: 16px !important;
        padding-bottom: 50px !important;
    }
`

export const TitleContainer = styled( MaterialContainer ) `
    display: flex !important;
    align-items: center !important;
`

export const Button = styled( MaterialButton ) `
    background: #6667ab !important;
    &:hover {
        background: #000000 !important;
    }
`
export const Link = styled( MaterialLink ) `
    color: #6667ab !important;
`

export const Logo = styled.img ``

export const LogoImg = styled.img `
    width: 29 px;
    height: 40px;
    padding-right: 11px;
`

export const LoadingContainer = styled( MaterialContainer ) `
  position: absolute !important;
  display: from !important;
  align-items: center !important;
  height: 100% !important;
  text-align: center;
  justify-content: center;
`

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
    height: 100% !important;
    text-align: center;
    justify-content: center;
    background: #FFFFFF !important;
    overflow: auto !important;
    @media (min-width: 600px) {
        height: 80% !important;
    }
`