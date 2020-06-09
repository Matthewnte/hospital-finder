import React, { useEffect } from 'react';

const Map = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src =
      'https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap';
    script.defer = true;
    script.async = true;

    window.initMap = function () {
      new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div id='map' style={{ height: '100vh', width: '100vw' }}>
      Mapp goes hete
    </div>
  );
};

export default Map;
