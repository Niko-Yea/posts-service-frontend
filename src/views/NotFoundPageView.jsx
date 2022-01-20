import { Link } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";

export default function NotFoundPageView() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography variant="h3" sx={{ marginTop: "50px" }}>
        Page not found
      </Typography>
      <Button
        variant="contained"
        component={Link}
        to="/"
        sx={{ marginTop: "50px" }}
      >
        Back to home
      </Button>
    </Box>
  );
}
