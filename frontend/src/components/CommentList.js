import React, {useState, useEffect} from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import crud from '../services/crud'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';
import {toastError, toastSuccess} from '../constantes/toastConfig'


import dayjs from 'dayjs';

require('dayjs/locale/fr');

export default function CommentList() {

  // fetch comments

  const postId = window.location.search; // Récupère l'id
  const params = new URLSearchParams(postId);
  const idNumber = params.get("id");
  

  const [comments, setComments] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false); // check if Admin


  useEffect(()=>{
    const fetchComments = async () => {
      try {
        const data = await crud.findStuff(`comment/${idNumber}`);
        setComments(data);       
        const admin = await crud.postStuff('user/admin');       
        setIsAdmin(admin);
      }catch(error){
        console.log(error);
      }
    }
  fetchComments();
  }, [idNumber])

  const userId = localStorage.getItem('User');


  // handle postcomment 

  const methods = useForm({
    mode: 'onTouched',
  });
  const {
    handleSubmit,
    register,
  } = methods;

  const onSubmit = async (data) => {
    try {
      const response = await crud.postStuff(`comment/${idNumber}`, data);
      toastSuccess(response.message);
      const refreshComments = await crud.findStuff(`comment/${idNumber}`);
      setComments(refreshComments);
    } catch (error) {
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
  }

  // handle delete comments

  const deleteComment = async (comment) => {
    try {
      const data = await crud.deleteStuff(`comment/${idNumber}/${comment}`, null);
      toastSuccess(data.message);
      const refreshComments = await crud.findStuff(`comment/${idNumber}`);
      setComments(refreshComments);
    }catch(error){
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
  }


  return (
    <>
    {comments.map((comment) => (<List key={comment.comment_id}>
      <ListItem alignItems="flex-start" sx={{mr: 2}}
        secondaryAction={(Number(userId) === comment.comment_author || isAdmin) && (
            <IconButton edge="end" aria-label="delete" sx={{mr: 1}} onClick={() => deleteComment(`${comment.comment_id}`)}>
                      <DeleteIcon />
            </IconButton>
    )}>
        <ListItemAvatar>
          <Avatar sx={{mt:2}} src={`${comment.user_pp}`} alt={`Photo de profil de ${comment.user_firstname} ${comment.user_name}`}/>
        </ListItemAvatar>
        <List>
            <ListItemText primary={`${comment.user_firstname} ${comment.user_name}`} secondary={dayjs(comment.comment_date).fromNow()} />
            <ListItemText primary={`${comment.comment_text}`} />
        </List>
      </ListItem>
      <Divider variant="inset" component="li" />
    </List>
    ))}
    <Stack className="comment-section" 
              component="form" 
              onSubmit={handleSubmit(onSubmit)} 
              noValidate alignItems="center" 
              direction="row" spacing={2} 
              sx={{margin: 2}}>
              <TextField sx={{ flexGrow: 1}}
                margin="normal"
                required
                name="comment"
                label="Votre commentaire..."
                type="text"
                id="comment"
                {...register('comment', {
                  required: 'true',
                })}
              />
              <Button
                sx={{height: 50, mt: 1, pr: 1.5, pl: 2}}
                type="submit"
                endIcon={<SendIcon />}
                variant="contained"
              >
                Envoyer
              </Button>
            </Stack>
    </>
  );
}