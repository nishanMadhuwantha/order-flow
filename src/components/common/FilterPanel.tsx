import {
  TextField,
  MenuItem,
  Slider,
  Stack,
  Box,
  Typography,
} from '@mui/material';

interface Props {
  search: string;
  status: string;
  quantity: number[];
  onSearchChange: (v: string) => void;
  onStatusChange: (v: string) => void;
  onQuantityChange: (v: number[]) => void;
  statuses: any[];
}

const FilterPanel = ({
  search,
  status,
  quantity,
  onSearchChange,
  onStatusChange,
  onQuantityChange,
  statuses,
}: Props) => {
  return (
    <Stack spac-ing={2} gap={2} flexDirection="row">
      <Box width="100%">
        <TextField
          label="Customer Search"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </Box>

      <Box width="100%" className="!mt-0">
        <TextField
          select
          size="small"
          fullWidth
          label="Status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {statuses.map((cat) => (
            <MenuItem key={cat.key} value={cat}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Box width="100%" className="!mt-0">
        <Typography
          fontSize="11px"
          marginBottom={0}
          id="input-slider"
          gutterBottom
        >
          Quantity
        </Typography>
        <Slider
          size="small"
          title="Quantity"
          value={quantity}
          onChange={(_, val) => onQuantityChange(val as number[])}
          valueLabelDisplay="auto"
          min={0}
          max={100}
          sx={{ paddingBottom: 0 }}
        />
      </Box>
    </Stack>
  );
};

export default FilterPanel;
