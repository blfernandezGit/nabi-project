import MaterialTextField from '@mui/material/TextField'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'
import InputAdornment from '@mui/material/InputAdornment'
import MaterialContainer from '@mui/material/Container'

const Index = ({ setFilter, label }) => {
    return (
        <MaterialContainer maxWidth = 'md' sx = {{ my: 2 }}>
            <MaterialTextField 
                label = { label }
                onChange={(e) => setFilter(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <SavedSearchIcon />
                    </InputAdornment>
                )}}
            />
        </MaterialContainer>
    );
};

export default Index;