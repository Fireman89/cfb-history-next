'use client'
import { TextField } from '@mui/material';

const SearchBar: React.FC = () => {
    return (
        <form>
            <TextField
                placeholder="Search..."
            />
        </form>
    );
};

export default SearchBar;