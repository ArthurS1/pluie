import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import * as React from "react";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
//import IconButton from "@mui/joy/IconButton";

export default function Widget() {
  return (
    <Card variant="outlined" sx={{ width: 320 }}>
      <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
        Weather in Bangkok
      </Typography>
      <Typography level="body2">Date of the day</Typography>

      <Box sx={{ display: "flex" }}>
        <div>
          <Typography level="body3" marginBottom="10px">
            Data
          </Typography>
          <Typography fontSize="lg" fontWeight="lg"></Typography>
        </div>
        <Button
          variant="solid"
          size="sm"
          color="primary"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: "auto", fontWeight: 600 }}
        >
          More information
        </Button>
      </Box>
    </Card>
  );
}
