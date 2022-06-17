import React, {useState} from 'react';
import TopBar from './TopBar';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material';
import {CssBaseline} from '@mui/material';
import Head from "next/head";


const theme = createTheme()

function Layout({children}) {
    return (
        <ThemeProvider theme={theme} component="main" maxWidth="xs">
            <Container>
                <CssBaseline/>
                <TopBar/>
                {children}
            </Container>
        </ThemeProvider>
    )
}

export default Layout;