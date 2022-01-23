import MaterialTextField from '@mui/material/TextField'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'
import InputAdornment from '@mui/material/InputAdornment'

const Index = ({ setFilter, label }) => {
    return (
            <MaterialTextField 
                sx = {{ width: '100%'}}
                label = { label }
                onChange={(e) => setFilter(e.target.value)}
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="end">
                        <SavedSearchIcon />
                    </InputAdornment>
                )}}
            />
    );
};

export default Index;