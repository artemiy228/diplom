import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { Box, Typography, TextField, Button, Grid, Link, CircularProgress } from '@mui/material'
import { useFormik } from 'formik'
import NextLink from 'next/link'
import * as Yup from 'yup'
import { useRouter } from 'next/dist/client/router'
import { useAuth } from '../../lib/db'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth'

const LoginPage: NextPage = () => {
    const router = useRouter()
    const auth = useAuth()
    const [
      signInWithEmailAndPassword, 
      user,
      loading,
      error
    ] = useSignInWithEmailAndPassword(auth)

    const { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        }),
        async onSubmit(values) {
            await signInWithEmailAndPassword(values.email, values.password)
        }
    })

    useEffect(() => {
      if (user?.user.uid) {
        router.push('/')
      }
    }, [user, loading, error])

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
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" color="white" variant="h3">
            Авторизация
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              value={values.email}
              onChange={handleChange}
              label="Почта"
              name="email"
              variant="filled"
              color="primary"
              error={!!errors.email}
              helperText={errors.email ? "Введите коректный электронный адрес" : ''}
              autoComplete="email"
              inputProps={{
                style: {
                  color: 'white',
                },
              }}
              InputLabelProps={{
                style: { color: '#fff'}, 
             }}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Пароль"
            color="primary"
            variant="filled"
              type="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              autoComplete="current-password"
              error={!!errors.password}
              inputProps={{
                style: {
                  color: 'white'
                }
              }}
              InputLabelProps={{
                style: { color: '#fff'}, 
             }}
              helperText={errors.password ? "Введите коректный пароль" : ""}
            />
            
            <NextLink href="/auth">
                <Link style={{ cursor: 'pointer' }} color="#ffffff">
                    Нет аккаунта?
                </Link>
            </NextLink>
            {!!error && (
              <Typography color="red">
                Неверная почта или пароль!
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"

              sx={{ mt: 1 }}
              startIcon={loading && <CircularProgress size="20px" color="inherit" />}
            >
              {loading ? "" : "Войти"}
            </Button>
            <Link sx={{ mt: 2 }} href="/auth/providers">
              <Typography align='center'>
                  Использовать другие методы авторизации
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    )
}

export default LoginPage