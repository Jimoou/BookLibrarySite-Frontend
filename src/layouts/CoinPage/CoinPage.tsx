import { useOktaAuth } from "@okta/okta-react";
import { useNavigate } from "react-router-dom";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { CoinCharge } from "./components/CoinCharge";
import { CoinChargeHistoryPage } from "./components/CoinChargeHistoryPage";
import { CoinUsingHistoryPage } from "./components/CoinUsingHistoryPage";

export const CoinPage = () => {
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
          <Tab label="코인 충전" id="nav-loans-tab" />
          <Tab label="코인 충전 내역" id="nav-history-tab" />
          <Tab label="코인 사용 내역" id="nav-history-tab" />
        </Tabs>
      </Box>
      <Box>
        {value === 0 && (
          <Typography component="div" role="tabpanel">
            <CoinCharge />
          </Typography>
        )}
        {value === 1 && (
          <Typography component="div" role="tabpanel">
            <CoinChargeHistoryPage />
          </Typography>
        )}
        {value === 2 && (
          <Typography component="div" role="tabpanel">
            <CoinUsingHistoryPage />
          </Typography>
        )}
      </Box>
    </Box>
  );
};
