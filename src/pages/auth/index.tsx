import React, { useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { NextPage } from 'next';
import NextLink from 'next/link'
import { useFormik } from 'formik';
import { updateProfile } from 'firebase/auth';
import * as Yup from 'yup'
import { useRouter } from 'next/dist/client/router';
import { useAuth } from '../../lib/db';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { CircularProgress } from '@mui/material';

const SignUp: NextPage = () => {
  const router = useRouter()
  const auth = useAuth()
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error
  ] = useCreateUserWithEmailAndPassword(auth)

  const { handleSubmit, values, handleChange, errors } = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3).required(),
      email: Yup.string().email().required(),
      password: Yup.string().required()
    }),
    async onSubmit(values) {
      await createUserWithEmailAndPassword(values.email, values.password)
    }
  })

  useEffect(() => {
    if (user) {
      updateProfile(user.user, { displayName: values.username })
      router.push('/')
    }
  }, [user])

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
            Регистрация
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  value={values.username}
                  onChange={handleChange}
                  id="username"
                  color="primary"
            variant="filled"
                  label="Ваше имя"
                  error={!!errors.username}
                  helperText={errors.username ? "Неверное имя пользователя" : ''}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Почта"
                  name="email"
                  color="primary"
            variant="filled"
                  value={values.email}
                  onChange={handleChange}
                  error={!!errors.email}
                  helperText={errors.email ? "Неверный электронный адрес" : ''}
                  autoComplete="email"
                />
              </Grid>
              <Grid item sx={{ mb: 1 }} xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  label="Пароль"
                  type="password"
                  id="password"
                  color="primary"
            variant="filled"
                  error={!!errors.password}
                  helperText={errors.password ? "Неверный пароль" : ""}
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <NextLink href="/auth/login">
                <Link style={{ cursor: 'pointer' }} color="#ffffff">
                    Уже есть аккаунт?
                </Link>
            </NextLink>
            {!!error && (
              <Typography color="red">
                Такой аккаунт уже существует
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1 }}
              size="large"
              startIcon={loading && <CircularProgress size="20px" color="inherit" />}
              >
              {loading ? "" : "Зарегистрироваться"}
            </Button>
            <Link sx={{ mt: 3 }} href="/auth/providers">
              <Typography align='center'>
                  Использовать другие методы авторизации
              </Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
  );
}

export default SignUp