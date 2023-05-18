import React, {useEffect, useRef, useState} from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import {Card} from "react-bootstrap";
import CustomAlert from "./Alerts";

function RideDisplayForm(id) {
    const previousData = window.location.state;


    //Map.js
    const mapRef = useRef(null);
    const [user, setUser] = useState('');
    const [startCity, setStartCity] = useState('');
    const [memberID, setMemberID] = useState('');
    const [startLocation, setStartLocation] = useState(previousData?.startLocation || "");
    const [destinationLocation, setDestinationLocation] = useState(previousData?.destinationLocation || "");
    const [startMarker, setStartMarker] = useState(null);
    const [destinationMarker, setDestinationMarker] = useState(null);
    const [directionsService, setDirectionsService] = useState(null);
    const [directionsRenderer, setDirectionsRenderer] = useState(null);
    const [travelTime, setTravelTime] = useState(previousData?.travelTime || "");
    const [luggageSize, setLuggageSize] = useState(previousData?.luggageSize || "");
    const [seatsAvailable, setSeatsAvailable] = useState(previousData?.seatsAvailable || "");
    const [departureDate, setDepartureDate] = useState(previousData?.departureDate || "");
    const [show, setshow] = useState(false);
    const [variant, setvariant] = useState("danger");
    const [message, setMessage] = useState("Mensaje")

    let children = {message:message, show:show, variant:variant}

    function validDate() {
        var dateString = departureDate;
        var inputDate = new Date(dateString)
        var today = new Date()
        if( today > inputDate){
            throw Object.assign(
                new Error(),
                {code: 403 }
            )

                ;
        }
    }

    useEffect(() => {
        if(startMarker === null){
            const rideget= ['/rides/', id.children].join('')
            axios.get(rideget).then(response => {
                setMemberID(response.data.member_id)
                setSeatsAvailable(response.data.seats_available)
                setStartLocation(response.data.start_location)
            })
            const userget= ['/users/', memberID].join('')

            axios.get(userget).then(response => {
                setUser(response.data)
            })

            const cityget= ['/cities/', startLocation].join('')

            axios.get(cityget).then(response=>{
                setStartCity(response.data)
            })
        }
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
                center: {lat: 18.2075, lng: -67.1396},
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
            const directionsRenderer = new window.google.maps.DirectionsRenderer({map: map});
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
    });

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const a = startLocation.split(',').shift()
        const b = destinationLocation.split(',').shift()
        setStartLocation(a)
        setDestinationLocation(b)

        console.log(
            startLocation,
            destinationLocation,
            startMarker,
            destinationMarker,
            directionsService,
            directionsRenderer,
            travelTime,
            luggageSize,
            seatsAvailable,
            departureDate
        )

        try{
            validDate()
        }
        catch(err){
            setvariant("danger")
            setMessage("Departure date must be in the future.")
            setshow(true)
            return console.log(err)
        }

        axios.post('/rides/new', {
            start_location: startLocation,
            destination_location: destinationLocation,
            travel_start: departureDate,
            seats_available: seatsAvailable,
            luggage_size: luggageSize
        }).then((response) => {
            console.log(response.status, response.data);
            if(response.status === 200){
                setvariant("success")
                setshow(true)
                setMessage("Your route has been created.")
                document.getElementById("create-button").style.visibility = 'hidden'
            }
        }).catch(error => {
            console.log(error)
            // state
            //     ? await axios.put(`/rides/${state.id}`, {
            //         travel_start: departureDate,
            //         seats_available: seatsAvailable,
            //         luggage_size: luggageSize
            //     })
            //     : await axios.post('/rides/new', {
            //         travel_start: departureDate,
            //         seats_available: seatsAvailable,
            //         luggage_size: luggageSize
            //     }).then((response) => {
            //         console.log(response.status, response.data);
            //         if(response.status === 200){
            //             setvariant("success")
            //             setshow(true)
            //             setMessage("Your ride has been created.")
            //             document.getElementById("create-button").style.visibility = 'hidden'
            //         }
            //     }).catch(error => {
            //         console.log(error)
            //     });
        })
    }

    return (
        <Container fluid>
            <h1>Request a Route !</h1>
            <text className="text-muted">Here you can request a route from one of your peers.</text>
            <CustomAlert>{children}</CustomAlert>
            <hr className="hr hr-blurry"/>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Row>
                        <Col md="4">
                            <Row className="mb-4">
                                <Form.Label>User Information</Form.Label>
                                <Col>
                                    <img className="rounded-circle article-img"
                                         alt=''
                                         src="https://acas-website-bucket.s3.amazonaws.com/default.jpg"/>
                                </Col>
                                <Col xs={10}>
                                    <Form.Text>{user.firstname} {user.lastname}</Form.Text>
                                    <br/>
                                    <Form.Text className="text-muted">Rating: 5</Form.Text>
                                    <br/>
                                    <Form.Text className="text-muted">December 02, 2021</Form.Text>
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Form.Label>Route Information</Form.Label>
                                <Col>
                                    <Form.Text>Starting City: {startCity.name}, {startCity.state}</Form.Text>
                                    <br/>
                                    <Form.Text className="text-muted">Rating: 5</Form.Text>
                                    <br/>
                                    <Form.Text className="text-muted">December 02, 2021</Form.Text>
                                </Col>
                            </Row>
                            <Row className="mb-4 flex-lg-row">
                                <Col>
                                    <Form.Label>Start Location</Form.Label>
                                    <Form.Control
                                        id="start-input"
                                        type="text"
                                        placeholder="Start Location"
                                        value={memberID}
                                        onChange={(e) => setStartLocation(e.target.value)}
                                        readOnly
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Destination Location</Form.Label>
                                    <Form.Control
                                        id="destination-input"
                                        type="text"
                                        placeholder="Destination Location"
                                        value={destinationLocation}
                                        onChange={(e) => setDestinationLocation(e.target.value)}
                                        readOnly
                                        />
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                    <Form.Label>Departure date</Form.Label>
                                    <Form.Control
                                        type="datetime-local"
                                        name="travel_start"
                                        value={departureDate}
                                        onChange={(e) => setDepartureDate(e.target.value)}
                                        required
                                        readOnly
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>
                                        Seats available
                                    </Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="seats_available"
                                        value={seatsAvailable}
                                        onChange={(e) => setSeatsAvailable(e.target.value)}
                                        required
                                        readOnly
                                    />
                                </Col>
                            </Row>
                            <Row className="mb-4">
                                <Col>
                                    <Form.Label>
                                        Luggage size available
                                    </Form.Label>
                                    <Form.Control
                                        name="luggage_size"
                                        value={luggageSize}
                                        onChange={(e) => setLuggageSize(e.target.value)}
                                        required
                                        readOnly
                                    />
                                </Col>
                                <Col>
                                    <Form.Label>Estimated Time: </Form.Label>
                                    <Form.Control value={travelTime} disabled></Form.Control>
                                </Col>
                            </Row>
                            <Row className="mt-4 flex-row">
                                <Col>
                                    <Button type="submit" className="button btn-lg d-block">Request
                                        Route</Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col md="8">
                            <Card ref={mapRef} style={{height: '100%', width: '100%'}}/>
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        </Container>
    )
}

export default RideDisplayForm
