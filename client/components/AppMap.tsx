import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  GoogleMap,
  InfoBox,
  LoadScript,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { CardContent } from "@mui/material";
import { Petition } from "../generated/graphql";

const center = {
  lat: -3.745,
  lng: -38.523,
};

let autocomplete: any = null;

export default function AppMap({
  petitions = [],
  height = 400,
}: {
  petitions: Petition[];
  height: number;
}) {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(11);

  useEffect(() => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCenter(pos);
        }
      );
    }
  }, [map]);

  const onLoad = React.useCallback(function callback(map) {
    // @ts-ignore
    //const bounds = new window.google.maps.LatLngBounds(center);
    //map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handlePlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    //debugger;
    console.log(place);
    if (place?.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCenter({ lat, lng });
      setZoom(18);
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: `${height}px` }}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <>
        <Autocomplete
          onLoad={(ac) => (autocomplete = ac)}
          onPlaceChanged={handlePlaceChanged}
        >
          <input
            type="text"
            placeholder="Search for a place"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `260px`,
              height: `40px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: "absolute",
              left: "50%",
              bottom: "10px",
              marginLeft: "-130px",
            }}
          />
        </Autocomplete>
        {petitions.map((petition) => (
          <>
            <Marker
              position={{ lat: petition.latitude, lng: petition.longitude }}
              title={String(petition.title)}
              onClick={() => {}}
            />
          </>
        ))}
      </>
    </GoogleMap>
  );
}
