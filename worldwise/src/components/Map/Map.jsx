import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  TileLayer,
  Popup,
  Marker,
  useMap,
  useMapEvent,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useCity } from "../../context/cityContext";
import { useEffect, useState } from "react";
import { Useurlposition } from "../../hooks/Useurlposition";
function Map() {
  const [mapPosition, setmapPosition] = useState([40, 0]);
  const { cityListData } = useCity();
  const [maplat, maplng] = Useurlposition();

  useEffect(() => {
    if (maplat && maplng) setmapPosition([maplat, maplng]);
  }, [maplat, maplng]);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        // center={[maplat,maplng]}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cityListData.map((city) => {
          return (
            <Marker
              position={[city.position.lat, city.position.lng]}
              key={city.id}
            >
              <Popup>
                <span>{city.cityName}</span>
                <span>{city.emoji}</span>{" "}
              </Popup>
            </Marker>
          );
        })}
        <Changecenter position={mapPosition}></Changecenter>
        <DetectClick></DetectClick>
      </MapContainer>
    </div>
  );
}

function Changecenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function DetectClick() {
  const navigator = useNavigate();
  useMapEvent({
    click: (e) => {
      console.log(e);
      navigator(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}

export default Map;
