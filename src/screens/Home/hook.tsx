import { useEffect, useState } from 'react';
import L, { LatLng } from 'leaflet';
import { Marker, Popup, useMap } from 'react-leaflet';

export function useHome() {
	const [position, setPosition] = useState<LatLng | null>(null);

	const greenIcon = new L.Icon({
		iconUrl:
			'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
		shadowUrl:
			'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowSize: [41, 41],
	});

	function LocationMarker() {
		const map = useMap();

		useEffect(() => {
			map.locate().on('locationfound', function (e) {
				setPosition(e.latlng);
				map.flyTo(e.latlng, map.getZoom());
				const radius = e.accuracy;
				const circle = L.circle(e.latlng, radius);
				circle.addTo(map);
			});
		}, [map]);

		return position === null ? null : (
			<Marker position={position} icon={greenIcon}>
				<Popup>Você está aqui!</Popup>
			</Marker>
		);
	}

	return {
		position,
		LocationMarker,
	};
}
