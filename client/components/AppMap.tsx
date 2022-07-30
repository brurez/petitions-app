import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Autocomplete,
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import Typography from "@mui/material/Typography";
import {
  PetitionDetailFieldsFragment,
  PetitionFieldsFragment,
} from "../generated/graphql";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import debounce from "lodash/debounce";

export type CenterType = { lat: number; lng: number };

export interface PositionI
  extends Pick<
    PetitionDetailFieldsFragment,
    | "latitude"
    | "longitude"
    | "address"
    | "state"
    | "postalCode"
    | "country"
    | "city"
  > {}

let autocomplete: any = null;

const libraries: any = ["places"];

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
  onPositionChange = () => {},
  onRadiusChange = () => {},
  onCenterChange = () => {},
  hideSearch = false,
  closeZoom = false,
  defaultCenter,
}: {
  petitions?: PetitionFieldsFragment[];
  petition?: PetitionDetailFieldsFragment;
  height?: number;
  onPositionChange?: (p: PositionI) => void;
  onRadiusChange?: (r: number) => void;
  onCenterChange?: (c: CenterType) => void;
  hideSearch?: boolean;
  closeZoom?: boolean;
  defaultCenter?: CenterType;
}) {
  const router = useRouter();

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState<number>(closeZoom ? 18 : 11);
  const [selected, setSelected] = useState<number>(0);
  const [position, setPosition] = useState<PositionI | null>(null);

  const _petitions = useMemo(
    () => (petition ? [petition] : petitions),
    [petition, petitions]
  );

  const isCenterDifferent = useCallback(
    (_center) =>
      Math.abs(_center.lat - center.lat) > 0.01 ||
      Math.abs(_center.lng - center.lng) > 0.01,
    [center]
  );

  // Calls onChangeSomething callbacks when state changes
  useEffect(() => {
    if (position) onPositionChange(position);
  }, [position]);

  useEffect(() => {
    onCenterChange(center);
  }, [center]);

  useEffect(() => {
    const mapRadiusInKilometers = 40000 / Math.pow(2, zoom);
    onRadiusChange(mapRadiusInKilometers);
  }, [zoom]);

  useEffect(() => {
    if (defaultCenter && isCenterDifferent(defaultCenter)) {
      setCenter(defaultCenter);
      return;
    }
    // Try HTML5 geolocation.
    if (!petition?.city && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const _center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          if (isCenterDifferent(_center)) setCenter(_center);
        }
      );
    }
  }, [defaultCenter, petition]);

  useEffect(() => {
    if (petition?.city)
      setCenter({ lat: petition.latitude, lng: petition.longitude });
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
      const _center = { lat, lng };
      if (isCenterDifferent(_center)) setCenter(_center);
      setZoom(18);
      const _position = {
        address: place.address_components.find((ac) =>
          ac.types.includes("route")
        )?.short_name,
        city: place.address_components.find((ac) =>
          ac.types.includes("administrative_area_level_2")
        )?.long_name,
        state: place.address_components.find((ac) =>
          ac.types.includes("administrative_area_level_1")
        )?.long_name,
        country: place.address_components.find((ac) =>
          ac.types.includes("country")
        )?.long_name,
        postalCode: place.address_components.find((ac) =>
          ac.types.includes("postal_code")
        )?.short_name,
        latitude: lat,
        longitude: lng,
      };
      if (
        _position.longitude !== position?.longitude ||
        _position.latitude !== position?.latitude
      ) {
        setPosition(_position);
      }
    }
  };

  const _handleMapPositionChange = useCallback(() => {
    if (!map) return;
    const mapCenter = map.getCenter();
    if (!mapCenter) return;
    const _center = { lat: mapCenter.lat(), lng: mapCenter.lng() };
    const _zoom = map.getZoom();
    if (isCenterDifferent(_center) && _zoom) {
      setCenter(_center);
      setZoom(_zoom);
    }
  }, [center, map]);

  const handleMapPositionChange = useMemo(
    () => debounce(_handleMapPositionChange, 300),
    [_handleMapPositionChange]
  );

  return (
    <LoadScript
      googleMapsApiKey={String(process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY)}
      libraries={libraries}
      language={"en"}
    >
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: `${height}px` }}
        center={center.lat && center.lng ? center : undefined}
        zoom={zoom}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onBoundsChanged={handleMapPositionChange}
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
          {_petitions.length > 0 &&
            _petitions.map((_petition) => (
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
    </LoadScript>
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
