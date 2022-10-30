import Topbar from "./components/topbar";
import Widget from "./components/widget";
import Button from "@mui/material/Button";
import Login from "./components/login";
import Register from "./components/login";
import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import "./style/styles.css"

function App() {
  const [selectedCity, setSelectedCity] = useState("");
  const [open, setOpen] = useState(false);
  const [widgets, setWidgets] = useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const notify = (msg) =>
    toast.error(msg, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

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
        {widgets.map((w, i) => {
          return <Widget city={w} key={i} />;
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
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box mb={1}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add a new weather widget
            </Typography>
          </Box>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <TextField
                required
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value);
                }}
                label="City"
                variant="outlined"
                helperText="Please enter a city name"
              />
            </FormControl>
          </Box>
          <Box
            mt={1}
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
          >
            <Button
              variant="contained"
              color="primary"
              sx={{ height: 40 }}
              onClick={() => {
                if (selectedCity !== "") {
                  axios
                    .get("http://localhost:8082/service/api/weather", {
                      params: { city: selectedCity, days: 1 },
                    })
                    .then((response) => {
                      if (response.data.error) {
                        notify("The city was not found");
                        return;
                      }
                      setWidgets([...widgets, selectedCity]);
                      handleClose();
                    });
                } else {
                  notify("Please enter a city name");
                }
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
    
  );
}

export default App;
