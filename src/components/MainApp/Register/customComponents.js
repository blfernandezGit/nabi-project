import MaterialContainer from '@mui/material/Container';
import styled from 'styled-components';

export const RegisterContainer = styled( MaterialContainer ) `
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    height: 100% !important;
    width: 40% !important;
    text-align: center;
    justify-content: center;
    background: #FFFFFF !important;
    @media (max-width: 900px) {
        width: 100% !important;
    }
`;

export const LogoContainer = styled( MaterialContainer ) `
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    height: 100% !important;
    width: 60% !important;
    text-align: center;
    justify-content: center;
    @media (max-width: 900px) {
        display: none !important;
    }
`;

export const LogoFormContainer = styled( MaterialContainer ) `
    @media (min-width: 900px) {
        display: none !important;
    }
`;
