import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
// import Room from '@material-ui/icons/RoomOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 0,
  },
  card: {
    margin: '8px',
  },
}));

const BottomCard = (props: any): JSX.Element => {
  const classes = useStyles();
  const [geofencingRadius] = useState<number>(50);
  const [address, setAddress] = useState<string>('');

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12} sm={9} md={5}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='subtitle1' component='h4'>
              {/* <Room style={{ paddingTop: '8px' }} /> */}
              {props.address}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              Geofencing radius: {`${geofencingRadius}m`}
            </Typography>
            <Typography variant='body2'>
              <TextField
                value={address}
                onChange={e => setAddress(e.target.value)}
                placeholder='Where would you like to find a hospital?'
              />
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BottomCard;
