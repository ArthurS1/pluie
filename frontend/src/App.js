import Topbar from "./components/topbar";
import Widget from "./components/widget";
import Button from "@mui/material/Button";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

function App() {
  const [selectedCity, setSelectedCity] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleChangeCity = (event) => {
    setSelectedCity(event.target.value);
    console.log(event.target.value);
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  let widgets = [];

  for (let i = 0; i < 1; i++) {
    widgets.push(<Widget city="Bangkok" />);
  }

  return (
    <div className="App">
      <div>
        <Topbar />
      </div>
      <div
        style={{
          gridTemplateColumns: "repeat(4, 1fr)",
          display: "grid",
          gap: "64px",
          marginTop: "32px",
          marginLeft: "32px",
        }}
      >
        {widgets.map((w) => {
          return w;
        })}
      </div>
      <div>
        <Button
          variant="contained"
          style={{
            width: "200px",
            height: "64px",
            position: "fixed",
            bottom: "4vh",
            right: "3vw",
          }}
          onClick={handleOpen}
        >
          Add a new widget
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a new weather widget
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">City</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCity}
                label="Age"
                onChange={handleChangeCity}
              >
                <MenuItem value={"Bangkok"}>Bangkok</MenuItem>
                <MenuItem value={"Paris"}>Paris</MenuItem>
                <MenuItem value={"London"}>London</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

export default App;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
