import { NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import { LinearLoading } from "../Utils/LinearLoading";
import {
  AccountBalance,
  AdminPanelSettings,
  AllInbox,
  EnergySavingsLeaf,
  Home,
  Login,
  Logout,
  PersonAdd,
  Search,
  ShoppingCart,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography,
  Container,
  IconButton,
} from "@mui/material";
import { useState } from "react";

export const Navbar = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const [userCoin, setUserCoin] = useState(0);

  if (!authState) {
    return <LinearLoading />;
  }

  const handleLogout = async () => oktaAuth.signOut();

  const fetchUserCoins = async () => {
    if (authState && authState.isAuthenticated) {
      const url = `${process.env.REACT_APP_API}/coins/secure/count`;
      const requestOptions = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
      };
      const userCoins = await fetch(url, requestOptions);
      if (!userCoins.ok) {
        throw new Error("Something went wrong!");
      }
      const userCoinsJson = await userCoins.json();
      setUserCoin(userCoinsJson);
    }
  };
  fetchUserCoins().catch((error: any) => {
    console.log(error);
  });

  return (
    <AppBar position="static" color="default">
      <Container>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <AccountBalance />
          </IconButton>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            <NavLink className="navbar-brand" to="/">
              스프링 도서관
            </NavLink>
          </Typography>

          <Box display="flex">
            <Button color="inherit">
              <NavLink className="nav-link" to="/">
                <Home />
                &nbsp;홈
              </NavLink>
            </Button>
            <Button color="inherit">
              <NavLink className="nav-link" to="/search">
                <Search />
                &nbsp;책 찾기
              </NavLink>
            </Button>
            {authState.isAuthenticated &&
              authState.accessToken?.claims.userType === "admin" && (
                <Button color="inherit">
                  <NavLink className="nav-link" to="/admin">
                    <AdminPanelSettings />
                    관리자 페이지
                  </NavLink>
                </Button>
              )}

            {authState.isAuthenticated ? (
              <>
                <Button color="inherit">
                  <NavLink className="nav-link" to="/coin">
                    &nbsp;내 코인 : {userCoin} <EnergySavingsLeaf />
                  </NavLink>
                </Button>
                <Button color="inherit">
                  <NavLink className="nav-link" to="/shelf">
                    <AllInbox />
                    &nbsp;내 서랍
                  </NavLink>
                </Button>
              </>
            ) : (
              <Button color="inherit">
                <NavLink className="nav-link" to="/login">
                  <AllInbox />
                  &nbsp;내 서랍
                </NavLink>
              </Button>
            )}

            {authState.isAuthenticated ? (
              <Button color="inherit">
                <NavLink className="nav-link" to="/cart">
                  <ShoppingCart />
                  &nbsp;장바구니
                </NavLink>
              </Button>
            ) : (
              <Button color="inherit">
                <NavLink className="nav-link" to="/login">
                  <ShoppingCart />
                  &nbsp;장바구니
                </NavLink>
              </Button>
            )}

            {!authState.isAuthenticated ? (
              <Button color="inherit">
                <NavLink className="nav-link" to="/login">
                  <Login />
                  &nbsp;로그인
                </NavLink>
              </Button>
            ) : (
              <Button color="inherit" onClick={handleLogout}>
                <Logout />
                &nbsp;로그아웃
              </Button>
            )}

            {!authState.isAuthenticated && (
              <Button color="inherit">
                <NavLink className="nav-link" to="/register">
                  <PersonAdd />
                  &nbsp;회원가입
                </NavLink>
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
