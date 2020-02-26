import * as React from "react";
// import InteractiveMap, { Marker } from "react-map-gl";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import skateboarder from "./_assets/skateboarder.png";

const mapBoxToken =
    "pk.eyJ1IjoiYXNocm5nbHIiLCJhIjoiY2s2Y3J3dmxrMWZmcDNwbnp1dW8zb2t5cCJ9.4LcbsFrSfqhQHIshTewEuw";
const Map = ReactMapboxGl({
    accessToken: mapBoxToken,
});

const App = () => {
    const [markers, setMarkers] = React.useState([{id: "abc123", coords:
        [-104.95468543330873, 39.768934798582336]}]
    );
    const [currentMarker, setCurrentMarker] = React.useState<[number, number]>(undefined);
    const [currentPopupMarker, setCurrentPopupMarker] = React.useState<[number, number]>(undefined);
    const [center, setCenter] = React.useState<number[] | any>([
        -104.95468543330873,
        39.768934798582336,
    ]);
    const [shownFeatures, setShownFeatures] = React.useState(markers.map((marker) => marker.coords));
    const mapRef = React.useRef(undefined);

    React.useEffect(() => {
        const showPosition = ({coords}) => {
            setCenter([coords.longitude, coords.latitude]);
        };
        navigator.geolocation.getCurrentPosition(showPosition);
    }, []);

    React.useEffect(() => {
        const markerCoords = markers.map((marker) => marker.coords);
        setShownFeatures(currentMarker ? markerCoords.concat([currentMarker]) : markerCoords);
    }, [currentMarker]);

    const handleClick = (e) => {
        console.log(e.style.map.transform._center);
        setCurrentPopupMarker(undefined);
    };

    const placeMarker = () => {
        const center = mapRef.current.state.map.transform._center;
        const lngLat: [number, number] = [center.lng, center.lat];
        setCurrentMarker(lngLat);
    };

    const setMarker = () => {
        setMarkers([...markers, {id: Math.random().toString(), coords: currentMarker}]);
        setCurrentMarker(undefined);
    };

    const onDragEnd = (e) => {
        const lngLat: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        setCurrentMarker(lngLat);
    };

    const onFeatureClick = (e) => {
        const lngLat: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        setCurrentPopupMarker(lngLat);
        console.log(markers.map((marker) => marker.coords).find((marker) => marker === lngLat));
    };
    const image = new Image(30, 30);
    image.src = skateboarder;
    const images = ["skateboarder", image];

    return (
        <div>
            <h1>MapBox</h1>
            <Map
                ref={mapRef}
                style="mapbox://styles/ashrnglr/ck6sfee7u5weq1inlioqfwnaz"
                onClick={handleClick}
                center={center}
                zoom={[17]}
                onDrag={(e) => console.log("drag", e)}
                containerStyle={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    cursor: "default",
                }}
            >
                <Layer type="symbol" id="marker" layout={{ "icon-image": "skateboarder", "icon-allow-overlap": true }} images={images}>
                    {shownFeatures.map((feature, i) => {
                        return (
                            <Feature
                                onClick={onFeatureClick}
                                key={i}
                                coordinates={feature}
                                onDragEnd={onDragEnd}
                                draggable={feature === currentMarker}
                            />
                        );
                    })}
                </Layer>
                {currentPopupMarker && (
                    <Popup coordinates={currentPopupMarker}>
                        <p>Longitude: {currentPopupMarker[0]}</p>
                        <p>Latitude: {currentPopupMarker[1]}</p>
                    </Popup>
                )}
            </Map>
            <div style={{ position: "absolute", bottom: "50px", left: "20px" }}>
                {!currentMarker && <button onClick={placeMarker}>Add Marker</button>}
                {currentMarker && (
                    <button onClick={setMarker}>
                        Set Marker
                    </button>
                )}
            </div>
        </div>
    );
};

export default App;
