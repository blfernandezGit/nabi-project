import {TextField} from './customComponents'
import SavedSearchIcon from '@mui/icons-material/SavedSearch'
import InputAdornment from '@mui/material/InputAdornment'

const Index = ({ setFilter, label }) => {
    return (
            <TextField
                label = { label }
                color = 'secondary'
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