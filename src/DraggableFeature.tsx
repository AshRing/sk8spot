import * as React from "react";
import { Feature } from "react-mapbox-gl";

const DraggableFeature = (props) => {
    return (
        <div id={props.id} key={props.key}>
            <Feature
                onDragEnd={props.onDragEnd}
                coordinates={props.marker.lngLat}
                draggable={true}
            />
        </div>
    );
};

export { DraggableFeature };
