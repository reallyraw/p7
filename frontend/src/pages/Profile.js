import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import crud from '../services/crud';
import {toastError, toastSuccess} from '../constantes/toastConfig'

export default function Profile() {
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
      const fd = new FormData();
      fd.append("image", data.image[0], data.image[0].name);
      const response = await crud.updateStuff('user/profile', fd);
      toastSuccess(response.message);
    } catch (error) {
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
  }

  return (
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
            Modification de la photo de profil
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
          <Grid container spacing={2}>
              <Grid item justifyContent="center">
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" 	sx={{ display: 'none' }} id="contained-button-file" multiple type="file" name="image" 
                    {...register('image', {required: 'true'})} />
                    <Button variant="contained" component="span">Téléverser une image</Button>
                </label>
              </Grid>
              {errors.image?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez ajouter une image à votre post.
                </Typography>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Envoyer
            </Button>
          </Box>
        </Box>
      </Container>
  );
}