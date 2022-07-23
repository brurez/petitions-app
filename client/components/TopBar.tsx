import React from "react";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import useCurrentUser from "../hooks/useCurrentUser";
import Link from "next/link";
import { Stack } from "@mui/material";

export default function TopBar() {
  const { currentUser, isLoggedIn, logOut } = useCurrentUser();

  return (
    <AppBar position="static" color="default">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Link href="/">
            <Typography
              variant="h6"
              noWrap
              component="h1"
              sx={{
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Petition App
            </Typography>
          </Link>

          <Box>
            {isLoggedIn ? (
              <Stack direction="row">
                  <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
                <Typography variant={"body2"} >
                  Hi {currentUser && currentUser.firstName} |
                </Typography>
                  </Box>
                <Button onClick={logOut}>Log Out</Button>
              </Stack>
            ) : (
              <>
                <Link href="/signup">
                  <Button color="primary" variant="contained" sx={{ mr: 1 }}>
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button color="inherit">Log In</Button>
                </Link>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
