import Topbar from "./components/topbar";
import Widget from "./components/widget";
import Button from "@mui/material/Button";
import "./App.css";
import axios from "axios";
import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function App() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let widgets = [];

  axios
    .get("http://localhost:8082/service/api/weather", {
      params: { city: "Bangkok", days: 1 },
    })
    .then((response) => console.log(response.data));

  for (let i = 0; i < 50; i++) {
    widgets.push(<Widget />);
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
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            (Parametres des widgets ici à rajouter)
          </Typography>
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
