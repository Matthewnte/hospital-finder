import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
  },
  paper: {
    margin: '8px',
    padding: '16px',
  },
}));

const Notification = (props: any): JSX.Element => {
  const classes = useStyles();
  return (
    <Grid container justify="center" className={classes.root}>
      <Grid item xs={12} sm={9} md={4}>
        <Paper className={classes.paper}>{props.message}</Paper>
      </Grid>
    </Grid>
  );
}

export default Notification;