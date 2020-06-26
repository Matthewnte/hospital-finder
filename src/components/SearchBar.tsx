import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import InputBase from '@material-ui/core/InputBase';
// import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
// import DirectionsIcon from '@material-ui/icons/Directions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  // divider: {
  //   height: 28,
  //   margin: 4,
  // },
}));

export default function CustomizedInputBase() {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12}>
        <Paper component='form' className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder='Search Google Maps'
            inputProps={{ 'aria-label': 'search google maps' }}
          />
          <IconButton
            type='submit'
            className={classes.iconButton}
            aria-label='search'
          >
            <SearchIcon />
          </IconButton>
          {/* <Divider className={classes.divider} orientation='vertical' /> */}
          {/* <IconButton
            color='primary'
            className={classes.iconButton}
            aria-label='directions'
          >
            <DirectionsIcon />
          </IconButton> */}
        </Paper>
      </Grid>
    </Grid>
  );
}
