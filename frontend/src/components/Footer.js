import * as React from 'react';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography'

function Footer() {
  return (
    <section id="footer">
        <Divider sx={{m: 2}}/>
        <Typography>
            Groupomania 2022
        </Typography>
    </section>
  );
}

export default Footer;