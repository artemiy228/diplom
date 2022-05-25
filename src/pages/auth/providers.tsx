import { Grid } from "@mui/material"
import { NextPage } from "next"
import { GithubAuthProvider, GoogleAuthProvider, TwitterAuthProvider, FacebookAuthProvider } from 'firebase/auth'
import { useAuth } from "../../lib/db";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import 'firebase/compat/auth';

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()
const twitterProvider = new TwitterAuthProvider()
const facebookProvider = new FacebookAuthProvider()


const uiConfig = {
    signInFlow: 'popup',
    signInSuccessUrl: '/',
    signInOptions: [
        googleProvider.providerId,
        githubProvider.providerId,
        // twitterProvider.providerId,
        // facebookProvider.providerId
    ],
  };

const AuthProviders: NextPage = () => {
    const auth = useAuth()

    return (
        <Grid container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
    >
    <Grid item
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
        
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />

        </Grid></Grid>
    )
}

export default AuthProviders