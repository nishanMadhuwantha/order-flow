import { TextField, MenuItem, Slider, Stack, Box } from '@mui/material';

interface Props {
  search: string;
  category: string;
  price: number[];
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onPriceChange: (v: number[]) => void;
  categories: string[];
}

const FilterPanel = ({
                       search,
                       category,
                       price,
                       onSearchChange,
                       onCategoryChange,
                       onPriceChange,
                       categories,
                     }: Props) => {
  return (
      <Stack spac-ing={2} gap={2} flexDirection='row'>
        <Box width="100%">
          <TextField
            label="Search"
            size="small"
            fullWidth
            value={search}
            onChange={e => onSearchChange(e.target.value)}
          />
        </Box>

        <Box width="100%" className='!mt-0'>
          <TextField
            select
            size="small"
            fullWidth
            label="Category"
            value={category}
            onChange={e => onCategoryChange(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {categories.map(cat => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Box width="100%" className='!mt-0'>
          <Slider
            size="small"
            value={price}
            onChange={(_, val) => onPriceChange(val as number[])}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
          />
        </Box>
      </Stack>
  );
};

export default FilterPanel;
