import MaterialAvatar from '@mui/material/Avatar';
import styled from 'styled-components';
import MaterialBox from '@mui/material/Box';

export const Avatar = styled(MaterialAvatar) `
    width: 28px !important;
    height: 28px !important;
`;

export const MainBox = styled(MaterialBox) `
    @media (min-width: 600px) {
        padding: 8px;
    }
`;
