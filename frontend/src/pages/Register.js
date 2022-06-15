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
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import crud from '../services/crud';
import {toastError, toastSuccess} from '../constantes/toastConfig'

export default function Register() {

  // Validate Form Data
  const methods = useForm({
    mode: 'onTouched',
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await crud.postStuff('user/signup', data);
      toastSuccess(response.message);
      navigate('/login');
    } catch (error) {
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
  }

  let islogged = localStorage.getItem('Token');
  if (islogged){ 
    navigate('/');
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
            Créer un compte
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Prénom"
                  autoFocus
                  {...register('firstName', {
                    required: 'true',
                  })}
                />   
                {errors.firstName?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez remplir ce champ.
                </Typography>}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Nom"
                  name="lastName"
                  autoComplete="family-name"
                  {...register('lastName', {
                    required: 'true',
                  })}
                />
                {errors.lastName?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez remplir ce champ.
                </Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Adresse email"
                  name="email"
                  autoComplete="email"
                  {...register('email', {
                    // eslint-disable-next-line no-useless-escape
                    required: 'true', pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                  })}
                />
                {errors.email?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez remplir ce champ.
                </Typography>}
                {errors.email?.type === 'pattern' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  L'adresse email n'est pas au bon format.
                </Typography>}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Mot de passe"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register('password', {
                    required: 'true',
                  })}
                />
                {errors.password?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez remplir ce champ.
                </Typography>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Créer un compte
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="../login" variant="body2">
                  Vous avez déjà un compte ? Connectez-vous.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}