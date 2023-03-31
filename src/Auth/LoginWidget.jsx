import { Navigate } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { LinearLoading } from "../layouts/Utils/LinearLoading";
import OktaSignInWidget from "./OktaSignInWidget";

export const LoginWidget = ({ config }) => {
  const { oktaAuth, authState } = useOktaAuth();
  const onSuccess = (tokens) => {
    oktaAuth.handleLoginRedirect(tokens);
  };

  const onError = (err) => {
    console.log("Sign in error: ", err);
  };

  if (!authState) {
    return <LinearLoading />;
  }

  return authState.isAuthenticated ? (
    <Navigate replace to="/" />
  ) : (
    <OktaSignInWidget config={config} onSuccess={onSuccess} onError={onError} />
  );
};

export default LoginWidget;
