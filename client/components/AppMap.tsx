import React, { useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  GoogleMap,
  InfoWindow,
  Marker,
} from "@react-google-maps/api";
import Typography from "@mui/material/Typography";
import {Petition, PetitionDetailFieldsFragment, PetitionFieldsFragment} from "../generated/graphql";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";

export interface Position {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode?: number;
  latitude: number;
  longitude: number;
}

let autocomplete: any = null;

function SearchField() {
  return (
    <input
      type="text"
      placeholder="Search for a place..."
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
  );
}

export default function AppMap({
  petitions = [],
  petition,
  height = 400,
  onChange = () => {},
  hideSearch = false,
  closeZoom = false,
    defaultCenter,
}: {
  petitions?: PetitionFieldsFragment[];
  petition?: PetitionDetailFieldsFragment;
  height?: number;
  onChange?: (p: Position) => void;
  hideSearch?: boolean;
  closeZoom?: boolean;
  defaultCenter?: { lat: number, lng: number}
}) {
  const router = useRouter();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(closeZoom ? 18 : 11);
  const [selected, setSelected] = useState<number>(0);

  const _petitions = useMemo(
    () => (petition ? [petition] : petitions),
    [petition, petitions]
  );

  useEffect(() => {
    if(defaultCenter) {
      setCenter(defaultCenter)
      return;
    }
    // Try HTML5 geolocation.
    if (!petition && navigator.geolocation) {
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
  }, [map, defaultCenter, petition]);

  useEffect(() => {
    petition && setCenter({ lat: petition.latitude, lng: petition.longitude });
  }, [petition]);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const handlePlaceChanged = () => {
    if (!autocomplete) return;
    const place = autocomplete.getPlace();
    if (place?.geometry) {
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setCenter({ lat, lng });
      setZoom(18);
      const position = {
        address: place.address_components.find((ac) =>
          ac.types.includes("route")
        )?.short_name,
        city: place.address_components.find((ac) =>
          ac.types.includes("administrative_area_level_2")
        )?.short_name,
        state: place.address_components.find((ac) =>
          ac.types.includes("administrative_area_level_1")
        )?.short_name,
        country: place.address_components.find((ac) =>
          ac.types.includes("country")
        )?.short_name,
        postalCode: place.address_components
          .find((ac) => ac.types.includes("postal_code"))
          ?.short_name,
        latitude: lat,
        longitude: lng,
      };
      onChange(position);
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
        {!hideSearch && (
          <Autocomplete
            onLoad={(ac) => (autocomplete = ac)}
            onPlaceChanged={handlePlaceChanged}
          >
            <SearchField />
          </Autocomplete>
        )}
        {_petitions.length > 0 && _petitions.map((_petition) => (
          <PetitionMarker
            isSelected={selected === _petition.id}
            petition={_petition}
            onCloseClick={() => setSelected(0)}
            onMarkClick={() => setSelected(_petition.id)}
            onButtonClick={() => router.push(`petitions/${_petition.id}`)}
            key={_petition.id}
          />
        ))}
      </>
    </GoogleMap>
  );
}

function PetitionMarker({
  isSelected,
  petition,
  onMarkClick,
  onCloseClick,
  onButtonClick,
}) {
  if (isSelected)
    return (
      <InfoWindow
        position={{ lat: petition.latitude, lng: petition.longitude }}
        onCloseClick={onCloseClick}
      >
        <Box>
          <Typography variant={"h6"}>{petition.title}</Typography>
          <Typography>{petition.address}</Typography>
          <Button size={"small"} onClick={onButtonClick}>
            Learn More
          </Button>
        </Box>
      </InfoWindow>
    );

  return (
    <Marker
      position={{ lat: petition.latitude, lng: petition.longitude }}
      title={String(petition.title)}
      onClick={onMarkClick}
    />
  );
}
