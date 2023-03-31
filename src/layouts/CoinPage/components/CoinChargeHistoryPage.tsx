import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import CoinChargingHistory from "../../../models/CoinChargingHistory";
import { LinearLoading } from "../../Utils/LinearLoading";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
export const CoinChargeHistoryPage = () => {
  const { authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [coinChargingHistory, setCoinChargingHistory] = useState<
    CoinChargingHistory[]
  >([]);

  useEffect(() => {
    const getPaymentHistory = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/coins/secure/history/charge`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();
        setCoinChargingHistory(responseJson);
        setIsLoading(false);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
      }
    };
    getPaymentHistory().catch((error: any) => {
      setIsLoading(true);
      console.log(error);
    });
  }, [authState]);

  if (isLoading) {
    return <LinearLoading />;
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="coin charging history">
          <TableHead>
            <TableRow>
              <TableCell component="th">번호</TableCell>
              <TableCell align="center">코인 수</TableCell>
              <TableCell align="center">가격</TableCell>
              <TableCell align="center">결제 일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinChargingHistory.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.price}</TableCell>
                <TableCell align="center">{row.paymentDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
