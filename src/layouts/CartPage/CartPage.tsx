import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { CartItem } from "./components/CartItem";
import { PaymentHistoryPage } from "./components/PaymentHistoryPage";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";

export const CartPage = () => {
  const navigate = useNavigate();
  const { authState } = useOktaAuth();
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  if (!authState?.isAuthenticated) {
    navigate("/login");
  }

  return (
    <Box className="container" mt={3}>
      <Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="nav tabs"
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="내 장바구니" id="nav-loans-tab" />
          <Tab label="구매 내역" id="nav-history-tab" />
        </Tabs>
      </Box>
      <Box>
        {value === 0 && (
          <Typography component="div" role="tabpanel">
            <CartItem />
          </Typography>
        )}
        {value === 1 && (
          <Typography component="div" role="tabpanel">
            <PaymentHistoryPage />
          </Typography>
        )}
      </Box>
    </Box>
  );
};
