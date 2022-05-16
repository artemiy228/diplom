import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Session } from "next-auth";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";

type Props = AppProps & { session: Session };

function MyApp({ Component, pageProps, session }: Props) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Toaster position="top-right" />
    </AuthProvider>
  );
}

export default MyApp;
