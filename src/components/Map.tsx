import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import BottomCard from './BottomCard';

interface Icoords {
  lat: number;
  lng: number;
}

interface Ialert {
  msg: string;
  display: boolean;
}

const Map = (): JSX.Element => {
  const [notification, setNotification] = useState<Ialert>({
    msg: '',
    display: false,
  });
  const [userAddress, setUserAddress] = useState<string>('');

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap`;
    script.defer = true;
    script.async = true;

    document.head.appendChild(script);
    
    let map: any;
    let infoWindow: any;
    let marker: any;

    const getAddress = (marker: any): void => {
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.lat},${marker.lng}&sensor=false&key=AIzaSyBAWQaXNq4Ob3uGJGFgs-LxCSDqu26piRQ`
      )
        .then((response) => response.json())
        .then((data) => setUserAddress(data.results[0].formatted_address))
        .catch((error) => console.log(error));
    };

    const showPosition = (position: any): void => {
      const pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      }

      marker.setPosition(pos)
      infoWindow.setContent('<b>Your location</b>');
      map.setCenter(pos);
      getAddress(pos);
    };

    const showNotification = (newAlertMessage: string): void => {
      setNotification({
        ...alert,
        msg: newAlertMessage,
        display: true,
      });
    };

    function handleLocationError(error: any) {
      console.log(error);
      switch (error.code) {
        case error.PERMISSION_DENIED:
          showNotification('User denied the request for Geolocation.');
          break;
        case error.POSITION_UNAVAILABLE:
          showNotification(
            'Location information is unavailable. Check your network connection or turn on your device location.'
          );
          break;
        case error.TIMEOUT:
          showNotification('The request to get user location timed out.');
          break;
        case error.UNKNOWN_ERROR:
          showNotification('An unknown error occurred.');
          break;
        default:
          showNotification(
            'Opp! Something went wrong, try refreshing your browser'
          );
      }
    }

    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          showPosition,
          handleLocationError
        );
      } else {
        showNotification('Geolocation is not supported by this browser.');
      }
    };

    const mapOptions = {
      center: { lat: 9.082, lng: 8.6753 },
      zoom: 11,
    };

    window.initMap = function () {
      map = new window.google.maps.Map(
        document.getElementById('map'),
        mapOptions
      );
      marker = new window.google.maps.Marker({
        map: map,
      });
      infoWindow = new window.google.maps.InfoWindow();
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      })
      getLocation();
    };
  }, []);

  return (
    <>
      {notification.display && <Notification message={notification.msg} />}
      <div id='map' style={{ height: '100vh', width: '100vw' }}></div>;
      <BottomCard address={userAddress} />
    </>
  );
};

export default Map;
