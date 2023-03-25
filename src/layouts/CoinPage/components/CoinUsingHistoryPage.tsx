import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import CoinUsingHistory from "../../../models/CoinUsingHistory";
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
export const CoinUsingHistoryPage = () => {
  const { authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState(true);

  const [coinUsingHistory, setCoinUsingHistory] = useState<CoinUsingHistory[]>(
    []
  );

  useEffect(() => {
    const getUsingHistory = async () => {
      if (authState && authState.isAuthenticated) {
        const url = `${process.env.REACT_APP_API}/coins/secure/history/using`;
        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };
        const response = await fetch(url, requestOptions);
        const responseJson = await response.json();
        setCoinUsingHistory(responseJson);
        setIsLoading(false);
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
      }
    };
    getUsingHistory().catch((error: any) => {
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
        <Table sx={{ minWidth: 650 }} aria-label="coin Using history">
          <TableHead>
            <TableRow>
              <TableCell component="th">번호</TableCell>
              <TableCell align="center">책 제목</TableCell>
              <TableCell align="center">코인 수</TableCell>
              <TableCell align="center">잔여 코인</TableCell>
              <TableCell align="center">사용 일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {coinUsingHistory.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="center">{row.title}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.balance}</TableCell>
                <TableCell align="center">{row.checkoutDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
