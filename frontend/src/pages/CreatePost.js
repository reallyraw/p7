import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Input from '@mui/material/Input';
import { useForm } from 'react-hook-form';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {toastError, toastSuccess} from '../constantes/toastConfig';
import crud from '../services/crud';
import {useNavigate} from 'react-router-dom';


export default function CreatePost() {


  const methods = useForm({
    mode: 'onTouched',
  });
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;

  let navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      if (data){    
        const fd = new FormData();
        if (data.text) {
          fd.append('text', data.text);
        }
        if (data.image) {
          fd.append("image", data.image[0], data.image[0].name);
        }    
        const response = await crud.postStuff('post', fd);
        toastSuccess(response.message);
        navigate('/');
      }
    } catch (error) {
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
  };
 

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
            <AddCircleOutlineIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{mb: 2}}>
            Créer un nouveau post
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item justifyContent="center">
                <label htmlFor="contained-button-file"                  >
                    <Input accept="image/*"	sx={{ display: 'none' }} id="contained-button-file" multiple type="file" name="image" 
                    {...register('image', {required: 'true'})} />
                    <Button variant="contained" component="span">Téléverser une image</Button>
                </label>
              </Grid>
              {errors.image?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez ajouter une image à votre post.
                </Typography>}
              <Grid item xs={12} justifyContent="center">
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={4}
                className="desc"
                placeholder="Description du post..."
                {...register('text', {
                    required: 'true',
                  })}
                />
                {errors.text?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez ajouter une description à votre post.
                </Typography>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Créer un nouveau post
            </Button>
          </Box>
        </Box>
      </Container>
  );
}