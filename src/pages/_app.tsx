import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from '@mui/material'
import { theme } from "../lib/theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
        <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default MyApp;
