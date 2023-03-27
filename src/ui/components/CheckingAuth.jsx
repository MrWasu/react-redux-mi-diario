import { CircularProgress, Grid } from '@mui/material';
import backgroundImage from '../../../public/assets/pexels-photo-1323550.jpeg'

// muestra el simbolo circular al estar la auth.state en checking
export const CheckingAuth = () => {
  return (
    <Grid
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

      <Grid containerdirection='row' justifyContent='center'>
        <CircularProgress color='warning' />
      </Grid>

    </Grid>
  )
}