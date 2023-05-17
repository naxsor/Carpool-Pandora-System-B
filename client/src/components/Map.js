import React, { useEffect, useRef, useState } from 'react';

const Map = () => {
  const mapRef = useRef(null);
  const [startLocation, setStartLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [startMarker, setStartMarker] = useState(null);
  const [destinationMarker, setDestinationMarker] = useState(null);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [travelTime, setTravelTime] = useState('');

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA57_WpqmqJsDU-Fn4XpWlERxmNvxSoXTk&libraries=places`;
        script.async = true;
        script.defer = true;
        script.addEventListener('load', initializeMap);
        document.body.appendChild(script);
      } else {
        initializeMap();
      }
    };

    const initializeMap = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 18.2075, lng: -67.1396 },
        zoom: 8,
      });

      const startAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('start-input')
      );

      startAutocomplete.addListener('place_changed', () => {
        const place = startAutocomplete.getPlace();
        if (!place.geometry) {
          console.error('No location data for start place');
          return;
        }
        setStartLocation(place.formatted_address);

        if (startMarker) {
          startMarker.setMap(null);
        }

        const marker = new window.google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: 'Start Location',
        });
        setStartMarker(marker);
      });

      const destinationAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('destination-input')
      );

      destinationAutocomplete.addListener('place_changed', () => {
        const place = destinationAutocomplete.getPlace();
        if (!place.geometry) {
          console.error('No location data for destination place');
          return;
        }
        setDestinationLocation(place.formatted_address);

        if (destinationMarker) {
          destinationMarker.setMap(null);
        }

        const marker = new window.google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: 'Destination Location',
        });
        setDestinationMarker(marker);
      });

      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer({ map: map });
      setDirectionsService(directionsService);
      setDirectionsRenderer(directionsRenderer);
    };

    loadGoogleMapsScript();

    return () => {
      const googleMapScript = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]');
      if (googleMapScript) {
        googleMapScript.removeEventListener('load', initializeMap);
        googleMapScript.parentNode.removeChild(googleMapScript);
      }
    };
  }, []);

  const handleRouteButtonClick = () => {
    if (!startLocation || !destinationLocation) {
      console.error('Please enter start and destination locations');
      return;
    }

    directionsService.route(
      {
        origin: startLocation,
        destination: destinationLocation,
        travelMode: 'DRIVING',
      },
      (response,

status) => {
if (status === 'OK') {
directionsRenderer.setDirections(response);
const route = response.routes[0];
if (route && route.legs && route.legs.length > 0) {
const leg = route.legs[0];
const durationText = leg.duration ? leg.duration.text : '';
setTravelTime(durationText);
}
} else {
console.error('Directions request failed due to ' + status);
}
}
);
};

return (
<div>
<div style={{ marginBottom: '16px' }}>
<input
id="start-input"
type="text"
placeholder="Start Location"
value={startLocation}
onChange={(e) => setStartLocation(e.target.value)}
style={{ width: '400px' }}
/>
</div>
<div style={{ marginBottom: '16px' }}>
<input
id="destination-input"
type="text"
placeholder="Destination Location"
value={destinationLocation}
onChange={(e) => setDestinationLocation(e.target.value)}
style={{ width: '400px' }}
/>
</div>
<div style={{ marginBottom: '16px' }}>
<button onClick={handleRouteButtonClick}>Generate Route</button>
</div>
<div style={{ marginBottom: '16px' }}>
<span>Travel Time: {travelTime}</span>
</div>
<div ref={mapRef} style={{ height: '600px', width: '150%' }} />
</div>
);
};

export default Map;