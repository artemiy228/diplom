import React, { useEffect } from "react";
import { Backdrop } from "@mui/material";
import { __BROWSER__ } from "../../constants/env";
import CircularProgress from '@mui/material/CircularProgress';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from "next/router";
import { useAuth } from "../../lib/db";

export const Auth: React.FC = ({ children }) => {
  const auth = useAuth()
  const [user, loading, error] = useAuthState(auth);
  const router = useRouter()


  useEffect(() => {
    if (!loading && !user && !error) {
      router.push('/auth')
    }
  }, [loading, user, error])


  if (loading) {
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return <>{children}</>
};

