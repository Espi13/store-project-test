import { Grid, InputAdornment, TextField } from '@mui/material';
import { FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface ISearchInputProps {
  onSearch: (searchTerm: string) => void;
}

const SearchInput: FC<ISearchInputProps> = ({ onSearch }) => {
  return (
    <Grid>
      <TextField
        id="search-product-input"
        variant="outlined"
        placeholder="Buscar..."
        sx={{ width: '35vw' }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        onChange={(e) => onSearch(e.target.value)}
      />
    </Grid>
  );
};

export default SearchInput;
