import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export function Filter(props) {
  return (
    <div className="filter-inputs">
      <div className="search-container inp-lbl-wrapper">
        <label htmlFor="searchByNameInput">Search By Name:</label>
        <TextField
          id="outlined-basic"
          label="Search Todo Name"
          variant="outlined"
          value={props.searchVal}
          onChange={(e) => props.setSearchVal(e.target.value.toLowerCase())}
        />
      </div>
      <div className="select-container inp-lbl-wrapper">
        <label htmlFor="searchByStatus">Status:</label>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.selectVal}
              label="Status"
              onChange={(e) => {
                props.setSelectVal(e.target.value);
              }}
            >
              <MenuItem value={""}>All</MenuItem>
              <MenuItem value={false}>Ongoing</MenuItem>
              <MenuItem value={true}>Completed</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </div>
    </div>
  );
}
