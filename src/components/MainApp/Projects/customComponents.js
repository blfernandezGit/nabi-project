import styled from 'styled-components'
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

export const BorderLinearProgress = styled( LinearProgress )(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: 'light-grey',
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 2,
    backgroundColor: '#AEF794'
  },
}));