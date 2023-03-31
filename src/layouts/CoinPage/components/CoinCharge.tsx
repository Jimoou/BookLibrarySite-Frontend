import React, { useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { loadPaymentWidget } from "@tosspayments/payment-widget-sdk";
import { tossConfig } from "../../../lib/tossConfig";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { EnergySavingsLeaf } from "@mui/icons-material";

export const CoinCharge = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState(0);

  const coinPackages = [
    { price: 5000, coins: 50 },
    { price: 10000, coins: 120 },
    { price: 15000, coins: 180 },
  ];
  const generateOrderId = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=";
    const charactersLength = characters.length;
    let result = "";

    for (let i = 0; i < 15; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  };

  const handleSelectPackage = (price: number) => {
    setSelectedPrice(price);
  };

  const tossPay = async () => {
    const paymentWidget = await loadPaymentWidget(
      tossConfig.clientKey,
      tossConfig.customerKey
    );
    paymentWidget.renderPaymentMethods("#payment-method", selectedPrice);

    const userEmail = authState?.accessToken?.claims.sub;
    const userName = authState?.accessToken?.claims.name;

    const selectedPackage = coinPackages.find(
      (pkg) => pkg.price === selectedPrice
    );
    const orderName = selectedPackage
      ? `${selectedPackage.coins}개 코인 구매`
      : "코인 구매";
    const generatedOrderId = "coin" + generateOrderId();
    paymentWidget
      .requestPayment({
        orderId: generatedOrderId,
        orderName: orderName,
        successUrl: "https://springboot-library-add4e.web.app/success",
        failUrl: "https://springboot-library-add4e.web.app/fail",
        customerEmail: userEmail,
        customerName: userName,
      })
      .catch((error) => {
        setHttpError(error.message);
      });
  };
  if (httpError) {
    return (
      <div
        className="modal fade show"
        style={{ display: "block" }}
        tabIndex={-1}
        aria-modal="true"
      >
        <div className="modal-dialog" style={{ textAlign: "center" }}>
          <div className="modal-content">
            <div className="modal-body">{httpError}</div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <Container>
      <div id="payment-method"></div>
      <Typography variant="h4" align="center" gutterBottom>
        코인 충전하기
      </Typography>
      <Grid container spacing={4}>
        {coinPackages.map((coinPackage, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <CardContent>
                <Typography variant="h5" align="center">
                  {coinPackage.coins} <EnergySavingsLeaf />
                </Typography>
                <Typography variant="subtitle1" align="center">
                  {coinPackage.price.toLocaleString()}원
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  fullWidth
                  variant={
                    selectedPrice === coinPackage.price
                      ? "contained"
                      : "outlined"
                  }
                  color="primary"
                  onClick={() => handleSelectPackage(coinPackage.price)}
                >
                  선택
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box mt={4} display="flex" flexDirection="column" alignItems="center">
        <Typography variant="h6">선택한 상품: {selectedPrice}원</Typography>
        <Box mt={2}>
          <Button variant="contained" color="primary" onClick={tossPay}>
            결제하기
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
