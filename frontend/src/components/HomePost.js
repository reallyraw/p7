import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {useState, useEffect} from 'react';
import crud from '../services/crud';
import CommentIcon from '@mui/icons-material/Comment';
import Box from '@mui/material/Box';
import {Link} from 'react-router-dom';
import Loader from './Loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {toastError, toastSuccess} from '../constantes/toastConfig'

require('dayjs/locale/fr');


export default function HomePost() {
  // dayJS config
  dayjs.locale('fr');
  dayjs.extend(relativeTime);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const fetchPosts = async () => {
      try {
        const data = await crud.findStuff(`post`);
        setTimeout(() => {         
          setPosts(data);
          setLoading(false);
        }, 500);

      }catch(error){
        console.log(error);
      }
    }
  fetchPosts();
  }, [])


  // handleLikes

  let userLogged = localStorage.getItem('User');

  const handleLike = async (post, user) => {
    try {
      const postlike = await crud.postStuff(`like/post/${post}`, user);
      toastSuccess(postlike.message);
    }catch(error){
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
}

  return (
    <>
    {loading ? (
      <Loader />
    ) : (
      posts.map((post) => (
        <Card key={post.post_id} sx={{ minWidth: 9/10, mb: 6 }}>
      <CardHeader
        avatar={
          <Avatar src={`${post.user_pp}`}/>
        }
        title={`${post.user_firstname} ${post.user_name}`}
        subheader={dayjs(post.post_date_created).fromNow()}
      />
      <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
      </Box>
    </React.Fragment>
      <Link to={`../post?id=${post.post_id}`} >
      <CardMedia
        component="img"
        height="194"
        image={`${post.post_image}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
         {post.post_description}
        </Typography>
      </CardContent>
      </Link>
      <CardActions sx={{m: 2}}>
      <IconButton aria-label="commentaires">
            <CommentIcon />
      </IconButton>
      <IconButton onClick={() => handleLike(`${post.post_id}`, `${userLogged}`)} aria-label="like">
            <FavoriteIcon />
      </IconButton>
      </CardActions>
    </Card>
      ))
    )}
    </>
  );
}