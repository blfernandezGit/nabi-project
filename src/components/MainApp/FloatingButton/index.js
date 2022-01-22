import { Fab } from './customComponents'

const Index = ({ Icon, func }) => {
    return (
        <Fab color="secondary" onClick = { func } aria-label="add" sx={{my: 4, mx: 2}}>
            <Icon />
        </Fab>
    );
};

export default Index;
