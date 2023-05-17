import React, { useEffect, useRef, useState } from 'react';

const google = window.google = window.google ? window.google : {};

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
    // Load the Google Maps JavaScript API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA57_WpqmqJsDU-Fn4XpWlERxmNvxSoXTk&libraries=places`;
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    // Initialize the map
    script.onload = () => {
      const map = new window.google.maps.Map(mapRef.current, {
        center: { lat: 18.2075, lng: -67.1396 }, // Set the initial center of the map
        zoom: 8, // Set the initial zoom level
      });

      // Create the autocomplete instance for the start location input
      const startAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('start-input')
      );

      // Handle place selection for start location
      startAutocomplete.addListener('place_changed', () => {
        const place = startAutocomplete.getPlace();
        if (!place.geometry) {
          console.error('No location data for start place');
          return;
        }
        setStartLocation(place.formatted_address);

        // Clear previous start marker
        if (startMarker) {
          startMarker.setMap(null);
        }

        // Set new start marker on the map
        const marker = new window.google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: 'Start Location',
        });
        setStartMarker(marker);
      });

      // Create the autocomplete instance for the destination location input
      const destinationAutocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('destination-input')
      );

      // Handle place selection for destination location
      destinationAutocomplete.addListener('place_changed', () => {
        const place = destinationAutocomplete.getPlace();
        if (!place.geometry) {
          console.error('No location data for destination place');
          return;
        }
        setDestinationLocation(place.formatted_address);

        // Clear previous destination marker
        if (destinationMarker) {
          destinationMarker.setMap(null);
        }

        // Set new destination marker on the map
        const marker = new window.google.maps.Marker({
          position: place.geometry.location,
          map: map,
          title: 'Destination Location',
        });
        setDestinationMarker(marker);
      });

      // Initialize the directions service and renderer
      const directionsService = new window.google.maps.DirectionsService();
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      setDirectionsService(directionsService);
      setDirectionsRenderer(directionsRenderer);
      directionsRenderer.setMap(map);
    };

    return () => {
      // Clean up the script element when the component is unmounted
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!startLocation && startMarker) {
      // Remove start marker from the map
      startMarker.setMap(null);
      setStartMarker(null);
    }
    }, [startLocation]);
    
    useEffect(() => {
    if (!destinationLocation && destinationMarker) {
    // Remove destination marker from the map
    destinationMarker.setMap(null);
    setDestinationMarker(null);
    }
    }, [destinationLocation]);
    
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
    (response, status) => {
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
    <div>
    <input
    id="start-input"
    type="text"
    placeholder="Start Location"
    value={startLocation}
    onChange={(e) => setStartLocation(e.target.value)}
    style={{ width: '400px' }}
    />
    </div>
    <div>
    <input
    id="destination-input"
    type="text"
    placeholder="Destination Location"
    value={destinationLocation}
    onChange={(e) => setDestinationLocation(e.target.value)}
    style={{ width: '400px' }}
    />
    </div>
    <div>
    <button onClick={handleRouteButtonClick}>Generate Route</button>
    </div>
    <div>
    <span>Travel Time: {travelTime}</span>
    </div>
    <div ref={mapRef} style={{ height: '600px', width: '150%' }} />
    </div>
    );
    };
    
    export default Map;
