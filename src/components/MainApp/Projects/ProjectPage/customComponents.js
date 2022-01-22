import styled from 'styled-components'
import MaterialTableCell from '@mui/material/TableCell'

export const HideTableCell = styled(MaterialTableCell) `
    @media (max-width: 900px) {
        display: none !important;
    }
`