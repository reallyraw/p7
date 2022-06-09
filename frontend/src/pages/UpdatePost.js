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

    
  const postId = window.location.search; // Récupère l'id
  const params = new URLSearchParams(postId);
  const idNumber = params.get("id");

  
  let navigate = useNavigate();

  
  const [post, setPost] = React.useState([]); 

  React.useEffect(()=>{
    const fetchPost = async () => {
      try {
        const data = await crud.findStuff(`post/${idNumber}`);
        setPost(data[0]);

      }catch(error){       
        const errorMessage = error.response.data.error;
        toastError(errorMessage);
        navigate('/');
      }
    }
  fetchPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


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
      fd.append('text', data.text);
      fd.append("image", data.image[0], data.image[0].name);
      const response = await crud.updateStuff(`post/${idNumber}`, fd);
      toastSuccess(response.message);
      navigate('/');
    } catch (error) {
      const errorMessage = error.response.data.error;
      toastError(errorMessage);     
      navigate('/');
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
            Modification du post
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
                <img src={`${post.post_image}`} alt="" className="postimage"/>
              <Grid item justifyContent="center">
                <label htmlFor="contained-button-file">
                    <Input accept="image/*" 	sx={{ display: 'none' }} id="contained-button-file" multiple type="file" name="image" 
                    {...register('image', {required: 'true'})} />
                    <Button variant="contained" component="span">Modifier l'image du post</Button>
                </label>
              </Grid>
              <Grid item xs={12} justifyContent="center">
              <Typography align='center' variant="body2" sx={{mb:2}}>
                  Description actuelle du post : {post.post_description}
                </Typography>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                fullWidth
                rows={4}
                className="desc"
                placeholder="Nouvelle description du post"
                {...register('text', {
                    required: 'true',
                  })}
                />
              </Grid>
              {errors.text?.type === 'required' && 
                <Typography variant="overline" display="block" gutterBottom color='primary'>
                  Veuillez ajouter une description à votre post.
                </Typography>}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
                Modifier le post
            </Button>
          </Box>
        </Box>
      </Container>
  );
}