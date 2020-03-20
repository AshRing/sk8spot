import * as React from "react";
import ReactMapboxGl, { Layer, Feature, Popup } from "react-mapbox-gl";
import skateboarder from "./_assets/skateboarder.png";
import { Add } from "./Components/Add";

const mapBoxToken =
    "pk.eyJ1IjoiYXNocm5nbHIiLCJhIjoiY2s2Y3J3dmxrMWZmcDNwbnp1dW8zb2t5cCJ9.4LcbsFrSfqhQHIshTewEuw";
const Map = ReactMapboxGl({
    accessToken: mapBoxToken,
});

const App = () => {
    const [markers, setMarkers] = React.useState([
        {
            id: "abc123",
            coords: [-104.95468543330873, 39.768934798582336],
            name: "random",
            description: "",
        },
    ]);
    const [currentMarker, setCurrentMarker] = React.useState<[number, number]>(undefined);
    const [currentPopupMarker, setCurrentPopupMarker] = React.useState(undefined);
    const [center, setCenter] = React.useState<number[] | any>([
        -104.95468543330873,
        39.768934798582336,
    ]);
    const [shownFeatures, setShownFeatures] = React.useState(markers);
    const [addOpen, setAddOpen] = React.useState<boolean>(false);
    const mapRef = React.useRef(undefined);

    React.useEffect(() => {
        const showPosition = ({ coords }) => {
            setCenter([coords.longitude, coords.latitude]);
        };
        navigator.geolocation.getCurrentPosition(showPosition);
    }, []);

    React.useEffect(() => {
        const markerArr = markers;
        setShownFeatures(
            currentMarker
                ? markerArr.concat([
                      { id: "addMarker", coords: currentMarker, name: "", description: "" },
                  ])
                : markerArr,
        );
    }, [currentMarker]);

    const handleClick = () => {
        setCurrentPopupMarker(undefined);
    };

    const placeMarker = () => {
        const center = mapRef.current.state.map.transform._center;
        const lngLat: [number, number] = [center.lng, center.lat];
        setCurrentMarker(lngLat);
        setAddOpen(true);
    };

    const setMarker = (e, name, description) => {
        e.preventDefault();
        setMarkers([
            ...markers,
            { id: Math.random().toString(), coords: currentMarker, name, description },
        ]);
        setCurrentMarker(undefined);
        setAddOpen(false);
    };

    const cancelPlaceMarker = () => {
        setCurrentMarker(undefined);
        setAddOpen(false);
    };

    const onDragEnd = (e) => {
        const lngLat: [number, number] = [e.lngLat.lng, e.lngLat.lat];
        setCurrentMarker(lngLat);
    };

    const onFeatureClick = (id: string) => {
        const targetFeature = markers.find((feature) => feature.id === id);
        console.log(targetFeature);
        setCurrentPopupMarker(targetFeature);
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
                <Layer
                    type="symbol"
                    id="marker"
                    layout={{ "icon-image": "skateboarder", "icon-allow-overlap": true }}
                    images={images}
                >
                    {shownFeatures.map((feature, i) => {
                        return (
                            <Feature
                                onClick={() => onFeatureClick(feature.id)}
                                key={i}
                                coordinates={feature.coords}
                                onDragEnd={onDragEnd}
                                draggable={feature.coords === currentMarker}
                            />
                        );
                    })}
                </Layer>
                {currentPopupMarker && (
                    <Popup coordinates={currentPopupMarker.coords}>
                        <p>name: {currentPopupMarker.name ? currentPopupMarker.name : currentPopupMarker.id}</p>
                        <p>description: {currentPopupMarker.description}</p>
                    </Popup>
                )}
            </Map>
            <div className="actions">
                {addOpen && <Add addSpot={(e, name, description) => setMarker(e, name, description)} cancelPlaceMarker={cancelPlaceMarker} />}
                <div className="actions__initiateAdd">
                    {!currentMarker && <button className="btn__primary" onClick={placeMarker}>Add Marker</button>}
                </div>
            </div>
        </div>
    );
};

export default App;
