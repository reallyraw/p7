import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import HomePost from '../components/HomePost'
import Container from '@mui/material/Container';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import {Link} from 'react-router-dom';


export default function Home() {

  return (
    <>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <HomePost />
        </Box>
      </Container>
      <Tooltip title="Add" className="bottom-right-btn" placement="bottom-end">
        <Link to='createPost'>
        <IconButton aria-label="Ajouter un nouveau post">
          <AddCircleIcon sx={{ fontSize: 60 }} color="primary" />
        </IconButton>
        </Link>
      </Tooltip>
    </>
  );
}