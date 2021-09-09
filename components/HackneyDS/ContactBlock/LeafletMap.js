import React, { useEffect } from 'react';
import L from 'leaflet';

const LeafletMap = ({ initialCoords, mapMarkers }) => {

  useEffect(() => {
    const map = L.map('map').setView(initialCoords, 13);
    if(mapMarkers) {
      mapMarkers.forEach(marker => L.marker(marker).addTo(map));
    }
  }, [initialCoords, mapMarkers]);

  return (
    <div className="lbh-contact__map-container">
      <div
        className="lbh-contact__map"
        id="map"
        data-module="lbh-map"
        data-access-token="pk.eyJ1IjoibGJoZWxld2lzIiwiYSI6ImNqeXJkN25uNjA5M3Uzb251bWVyejJ3YW8ifQ.uzO8I54w64U6QkNknW32FA"
        data-marker-lat="51.545386"
        data-marker-lng="-0.057069"
      />
      <div className="lbh-contact__directions">
        <a
          href="https://goo.gl/maps/YHtCx2nqP2o57BZi6"
          className="lbh-link"
          rel="external"
          title="View directions on Google Maps"
        >
          Get directions
        </a>
      </div>
    </div>
  )
};

export default LeafletMap;