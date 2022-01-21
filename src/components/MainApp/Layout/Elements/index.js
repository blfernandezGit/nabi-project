import MaterialBox from '@mui/material/Box'
import MaterialContainer from '@mui/material/Container'
import MaterialButton from '@mui/material/Button'
import MaterialLink from '@mui/material/Link'
import styled, { keyframes } from 'styled-components'
import { fadeIn } from 'react-animations'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

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
    min-height: 100vh !important;
    animation: 1s ${ fadeInAnimation };
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