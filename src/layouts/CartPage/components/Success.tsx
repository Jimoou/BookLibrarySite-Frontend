import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SuccessPaymentRequest from "../../../models/SuccessPaymentRequest";
import { SpinnerLoading } from "../../Utils/SpinnerLoading";

export const Success = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState("");
  const isLoading = true;

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const paymentKey = String(searchParams.get("paymentKey"));
  const orderId = String(searchParams.get("orderId"));
  const amount = Number(searchParams.get("amount"));
  const successPaymentRequest = new SuccessPaymentRequest(
    paymentKey,
    orderId,
    amount
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        await confirmPayments();
      } catch (error: any) {}
    };

    if (authState && authState.isAuthenticated) {
      fetchData();
    }
  }, [authState]);

  const confirmPayments = async () => {
    if (authState && authState.isAuthenticated) {
      const url = `${process.env.REACT_APP_API}/payment-histories/secure/confirm`;
      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(successPaymentRequest),
      };
      await fetch(url, requestOptions)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.status === undefined) {
            navigate("/success-complete");
          } else {
            setHttpError(responseJson.status + "결제에 실패했습니다.");
          }
        });
    }
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
                onClick={() =>
                  window.location.replace("https://localhost:3000/cart")
                }
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
    <div className="container mt-5 mb-5">
      <h1>결제중입니다.</h1>
      <h2>{isLoading && <SpinnerLoading />}</h2>
    </div>
  );
};
