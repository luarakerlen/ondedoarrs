import { Local } from '../../data/interfaces';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { useUserPosition } from '../../hooks';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';

interface MapProps {
	locals: Local[];
}

export function Map({ locals }: MapProps) {
	const { LocationMarker, position } = useUserPosition();

	return (
		<MapContainer
			center={position === null ? [-20.2821062, -40.3269036] : position}
			zoom={13}
			scrollWheelZoom={true}
			style={{ width: '100%', height: '100%' }}
		>
			<TileLayer
				attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
			/>

			{locals.map(({ lat, lng, name, address }) => {
				return (
					<Marker key={lat} position={{ lat, lng }}>
						<Popup>
							{name}
							<br />
							{address}
						</Popup>
					</Marker>
				);
			})}

			<LocationMarker />
		</MapContainer>
	);
}
