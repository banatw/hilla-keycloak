import { ViewConfig } from "@vaadin/hilla-file-router/types.js";
import { VerticalLayout } from "@vaadin/react-components";
import { LatLngTuple } from "leaflet";
import { FeatureGroup, MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import { EditControl } from "react-leaflet-draw"
import React from "react";

export const config: ViewConfig = {
    rolesAllowed: ['ADMIN'],
    menu: {
        icon: 'line-awesome/svg/map.svg'
    }
}

export default function MapsView() {
    const position : LatLngTuple = [-6.375867304115482, 106.80459998772378]
    const ref = React.useRef<L.FeatureGroup>(null);

    const handleChange = () => {
        const geo = ref.current?.toGeoJSON();
        console.log(geo);
        // if (geo?.type === 'FeatureCollection') {
        //   setGeojson(geo);
        // }
    };

    
    return(
        <VerticalLayout>
            <MapContainer style={{ width: "100%", height: "100vh" }} center={position} zoom={13} scrollWheelZoom={false}>
                <FeatureGroup>
                    <EditControl
                        position='topright'
                        onEdited={handleChange}
                        onCreated={handleChange}
                        onDeleted={handleChange}
                        draw={{
                            rectangle: false,
                            circle: true,
                            polyline: false,
                            polygon: true,
                            marker: true,
                            circlemarker: false,
                        }}
                        />
                </FeatureGroup>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>,
        </VerticalLayout>
    )
}