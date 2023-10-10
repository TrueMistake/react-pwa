import React from 'react';
import {Box, FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const Selected = ({sort, val}) => {
  const handlerChange = (event) => {
    sort(event)
  }

  return (
    <Box sx={{margin: '20px 0'}}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Сортировка:</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={val}
          label="Сортировка:"
          onChange={e => handlerChange(e.target.value)}
        >
          <MenuItem value="asc">asc</MenuItem>
          <MenuItem value="desc">desc</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default Selected;