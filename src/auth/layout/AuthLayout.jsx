import { Grid, Typography } from '@mui/material';
import backgroundImage from '../../../public/assets/pexels-photo-1323550.jpeg';


export const AuthLayout = ({ children, title = '' }) => {
  // Se encarga del estilo de login y registerPage
  return (

    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        padding: 4
      }}
    >

      <Grid item
        className='box-shadow'
        xs={3}
        sx={{
          width: { sm: 450 },
          backgroundColor: 'white',
          padding: 3,
          borderRadius: 2
        }}>

        <Typography variant='h5' sx={{ mb: 1 }}>{title}</Typography>

        {children}

      </Grid>

    </Grid>

  )
}