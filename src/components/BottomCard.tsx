import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import Room from '@material-ui/icons/RoomOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    bottom: 0,
  },
  card: {
    margin: '8px',
  },
  formControl: {
    minWidth: '100%',
  },
}));

const BottomCard = (props: any): JSX.Element => {
  const classes = useStyles();

  return (
    <Grid container justify='center' className={classes.root}>
      <Grid item xs={12} sm={9} md={5}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant='subtitle1' component='h4'>
              <Room style={{ paddingTop: '8px' }} />
              {props.address}
            </Typography>
            <Typography variant='caption' color='textSecondary'>
              Geofencing radius: {`${props.radius}km`}
            </Typography>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Enter search radius</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.radius ? props.radius : ''}
                onChange={e => props.setRadius(Number(e.target.value))}
              >
                <MenuItem value={5}>5 km</MenuItem>
                <MenuItem value={10}>10 km</MenuItem>
                <MenuItem value={20}>20 km</MenuItem>
                <MenuItem value={30}>30 km</MenuItem>
                <MenuItem value={40}>40 km</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default BottomCard;
