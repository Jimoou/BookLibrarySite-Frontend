import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const LinearLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        minWidth: "100vw",
        backgroundColor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "80%",
          marginBottom: 2,
        }}
      >
        <LinearProgress color="primary" />
      </Box>
      <Typography variant="h6" color="text.primary">
        Loading...
      </Typography>
    </Box>
  );
};
