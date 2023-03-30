import { Box, Button, Container, Typography } from "@mui/material";

export const SuccessPage = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.paper",
          borderRadius: "10px",
          p: 4,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom mt={2}>
          결제가 완료되었습니다.
        </Typography>
        <Box mt={3} display="flex" justifyContent="space-between" width="40%">
          <Button
            variant="contained"
            color="primary"
            onClick={() => window.location.replace("/cart")}
            sx={{ mb: 2 }}
          >
            결제 내역
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => window.location.replace("/search")}
            sx={{ mb: 2 }}
          >
            책 보러가기
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
