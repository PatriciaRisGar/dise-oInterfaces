import {useState} from 'react';
import LlamadaAPI from './LlamadaAPI';
import NavBar from './NavBar';

export default function Personajes() {
	const [buscar, setBuscar] = useState('');
	return (
		<div>
			<NavBar buscar={buscar} onBuscadorChange={setBuscar} />
			<LlamadaAPI buscar={buscar}/>
		</div>
	);
}
