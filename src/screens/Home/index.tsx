import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useHome } from './hook';

import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import 'leaflet-defaulticon-compatibility';
import { locals } from '../../data/locals';

export function Home() {
	const { LocationMarker, position } = useHome();

	return (
		<div style={{ width: '100vw', height: '100vh' }}>
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
		</div>
	);
}
