import { FabRight } from './customComponents'

const Index = ({ Icon, func, color = 'secondary' }) => {
    return (
        <FabRight color= {color} onClick = { func } aria-label="add" sx={{my: 4, mx: 2}}>
            <Icon />
        </FabRight>
    );
};

export default Index;
