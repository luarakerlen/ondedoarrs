import { locals } from '../../data';
import { Map } from '../../components';

export function Home() {
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Map locals={locals} />
		</div>
	);
}
