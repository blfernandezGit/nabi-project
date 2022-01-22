import { FabRight, FabLeft } from './customComponents'

const Index = ({ Icon, func, position, color = 'secondary' }) => {
    let Element = FabRight
    let size = 'large'
    if( position === 'left') {
        Element = FabLeft
        size = 'small'
    }
    return (
        <Element size = { size } color= {color} onClick = { func } aria-label="add" sx={{my: 4, mx: 2}}>
            <Icon />
        </Element>
    );
};

export default Index;
