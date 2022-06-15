import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { pink } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import CommentList from './CommentList'
import {useState, useEffect} from 'react';
import crud from '../services/crud';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import CardActions from '@mui/material/CardActions';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Delete from '@mui/icons-material/Delete';
import Settings from '@mui/icons-material/Settings';
import {Link, useNavigate} from 'react-router-dom';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Loader from './Loader';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {toastError, toastSuccess} from '../constantes/toastConfig'

require('dayjs/locale/fr');



export default function SinglePost() {
  // dayJS config
  dayjs.locale('fr');
  dayjs.extend(relativeTime);


  
  // get post infos
  const postId = window.location.search;
  const params = new URLSearchParams(postId);
  const idNumber = params.get("id");

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true); // handle errors 
  const [userPosted, setUserPosted] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(()=>{
    const fetchPost = async () => {
      try {
        const data = await crud.findStuff(`post/${idNumber}`);
        const userinfo = await crud.findStuff(`user/${data[0].post_id_author}`);
        const like = await crud.postStuff(`like`);
        setTimeout(() => {
          setIsLiked(like);
          setPost(data[0]);
          setLoading(false);
          setUserPosted(userinfo[0]);
        }, 500);

      }catch(error){
        const errorMessage = error.response.data.error;
        toastError(errorMessage);
        navigate('/');
      }
    }
  fetchPost();
  // eslint-disable-next-line no-use-before-define
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  // handle Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  // handle Like  
  let userLogged = localStorage.getItem('User');

  const handleLike = async (post, user) => {
      try {
        const postlike = await crud.postStuff(`like/post/${post}`, user);
        toastSuccess(postlike.message);
        const like = await crud.postStuff(`like`);
        setIsLiked(like);
      }catch(error){
        const errorMessage = error.response.data.error;
        toastError(errorMessage);
      }
  }

  // handle delete post 

  let navigate = useNavigate();

  const deletePost = async (post) => {
    try {
      const data = await crud.deleteStuff(`post/${post}`, null);
      toastSuccess(data.message);
      navigate('/');
    }catch(error){
      const errorMessage = error.response.data.error;
      toastError(errorMessage);
    }
  }


  return (<>
    {loading ? (
      <Loader />
    ) : (
        <Card key={post.post_id} sx={{ width: 9/10 }}>
        <CardHeader
          avatar={
            <Avatar src={`${userPosted.user_pp}`}/>
          }
          action={Number(userLogged) === post.post_id_author && (
            <IconButton aria-label="Plus d'options"
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}>
              <MoreVertIcon />
            </IconButton>)
          }
          title={`${userPosted.user_firstname} ${userPosted.user_name}`}
          subheader={dayjs(post.post_date_created).fromNow()}
        />
        <React.Fragment>
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
          <Link to={`../updatePost?id=${post.post_id}`}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Modifier le post
          </Link>
          </MenuItem>
          <MenuItem onClick={() => deletePost(`${post.post_id}`)}>
            <ListItemIcon>
              <Delete fontSize="small" />
            </ListItemIcon>
            Supprimer
          </MenuItem>
        </Menu>
      </React.Fragment>
        <CardMedia
          component="img"
          sx={{maxHeight: 500}}
          image={`${post.post_image}`} 
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
          {post.post_description}
          </Typography>
        </CardContent>
        <CardActions sx={{m: 2}}>
        <IconButton aria-label="like" onClick={() => handleLike(`${post.post_id}`, `${userLogged}`)}>
              <FavoriteIcon 
              sx={isLiked.includes(post.post_id) && ({ color: pink[500]})}
              />
        </IconButton>
        </CardActions>
        <Divider />
        <CommentList />
      </Card>
      )}
  </>
  )
  
}