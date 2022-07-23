import React, { useState } from "react";
import TopBar from "./TopBar";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";
import { CssBaseline } from "@mui/material";
import { useIsMobile } from "../hooks/useIsMobile";
import Box from "@mui/material/Box";

const theme = createTheme();

function Layout({ children }: { children: React.ReactNode }) {
  const { isMobile } = useIsMobile();
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ backgroundColor: "#edf0f4", px: isMobile ? 0 : 1, pb: 2 }}>
        <CssBaseline />
        <TopBar />
        <Box mx={isMobile ? 0.5 : 0}>{children}</Box>
      </Container>
    </ThemeProvider>
  );
}

export default Layout;
