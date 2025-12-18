import type { GridFilterOperator } from '@mui/x-data-grid';
import { Box, Slider, Typography } from '@mui/material';

export const SliderFilter: GridFilterOperator = {
  label: 'Between',
  value: 'between',

  getApplyFilterFn: (item) => {
    if (!item.value) return null;
    const [min, max] = item.value;
    return ({ value }) => value >= min && value <= max;
  },

  InputComponent: ({ item, applyValue }) => {
    const value = item.value ?? [0, 100];

    return (
      <Box px={2}>
        <Slider
          value={value}
          onChange={(_, newValue) => applyValue({ ...item, value: newValue })}
          min={0}
          max={100}
        />
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="caption">{value[0]}</Typography>
          <Typography variant="caption">{value[1]}</Typography>
        </Box>
      </Box>
    );
  },
};
