import React, { useState, useEffect } from 'react';
import Notification from './Notification';
import SearchBar from './SearchBar';
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
  const [radius, setRadius] = useState<number>(10);
  const [hasRender, setHasRender] = useState<boolean>(true);

  var map: any;
  let infoWindow: any;

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
    };

    map.setCenter(pos);

    const userMarker = new window.google.maps.Marker({
      position: pos,
      map: map,
    });
    const userInfoWindow = new window.google.maps.InfoWindow({
      content: '<b>Your location<b>',
    });
    userInfoWindow.open(map, userMarker);

    const request = {
      location: pos,
      radius: radius * 1000,
      types: ['hospital'],
    };

    const service = new window.google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);

    function callback(results: any, status: any) {
      if (status === window.google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
        }
      }
    }

    function createMarker(place: any) {
      const placesMarker = new window.google.maps.Marker({
        position: place.geometry.location,
        map: map,
        icon: {
          url: place.icon,
          scaledSize: new window.google.maps.Size(24, 24),
        },
      });
      placesMarker.addListener('click', function () {
        infoWindow.setContent(`<h3>${place.name}<h3>${place.vicinity}`);
        infoWindow.open(map, placesMarker);
      });
    }

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

  const getUserLocation = () => {
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
    zoom: 12,
  };

  window.initMap = function () {
    map = new window.google.maps.Map(
      document.getElementById('map'),
      mapOptions
    );

    const options = { componentRestrictions: { country: 'ng' } };
    const input = document.getElementById('search-result');

    const autoComplete = new window.google.maps.places.Autocomplete(input, options);

    infoWindow = new window.google.maps.InfoWindow();

    getUserLocation();
  };

  useEffect(() => {
    if (hasRender) {
      setHasRender(false);
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_KEY}&callback=initMap&libraries=places`;
      script.defer = true;
      script.async = true;

      document.head.appendChild(script);
    } else {
      window.initMap();
    }
  }, [radius]);

  return (
    <>
      {notification.display ? (
        <Notification message={notification.msg} />
      ) : (
        <SearchBar />
      )}
      <div id='map' style={{ height: '100vh', width: '100vw' }}></div>;
      <BottomCard
        address={userAddress}
        radius={radius}
        setRadius={(value: number) => setRadius(value)}
      />
    </>
  );
};

export default Map;
