import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm } from 'react-hook-form';
import crud from '../services/crud';
import {toastError, toastSuccess} from '../constantes/toastConfig';

export default function Login() {

  const methods = useForm({
    mode: 'onTouched',
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await crud.postStuff('user/login', data);
      localStorage.setItem('User', response.userId);
      localStorage.setItem('Token', response.token);
      checkStorage();
    } catch (error) {
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
  }

  

  function checkStorage() {
    const tokenInStorage = localStorage.getItem('Token');

    if (tokenInStorage === null) {
      toastError('Erreur de connexion.');
    } else {
      window.location.reload();
      toastSuccess('Vous êtes maintenant connecté(e).');
    }
  }

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Connexion
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Adresse email"
              name="email"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'true',
              })}
            />
            {errors.email?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez remplir ce champ.
                </Typography>}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Mot de passe"
              type="password"
              id="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'true',
              })}
            />
            {errors.password?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez remplir ce champ.
                </Typography>}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="../register" variant="body2">
                  {"Vous n'avez pas de compte ? Créez-en un ici."}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}