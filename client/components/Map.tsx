import React from "react";
import {
  GoogleMap,
  InfoBox,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

export default function Map({ petitions }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyARUiX-IeeyFYhrnaV_lz0H7bT-nYWr32Q",
  });

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    // @ts-ignore
    //const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  console.log(petitions)

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {petitions.map((petition) => (
        <>
          <Marker
            position={{ lat: petition.latitude, lng: petition.longitude }}
            title={petition.title}
            onClick={() => {}}
          />

        </>
      ))}
    </GoogleMap>
  ) : (
    <></>
  );
}
