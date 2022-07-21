import React, { useState } from "react";
import TopBar from "./TopBar";
import Container from "@mui/material/Container";
import {createTheme, ThemeProvider, useMediaQuery} from "@mui/material";
import { CssBaseline } from "@mui/material";
import Head from "next/head";

const theme = createTheme();

function Layout({ children }: { children: React.ReactNode }) {
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: "#edf0f4", px: matches ? 0 : 1 }}>
        <CssBaseline />
        <TopBar />
        {children}
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
