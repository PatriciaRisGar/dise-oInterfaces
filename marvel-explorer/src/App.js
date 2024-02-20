import Personajes from './componentes/Personajes.jsx';
import Container from '@mui/material/Container';
import './App.css';
import Comics from './componentes/Comics.jsx';
import React from 'react';
import {Button} from '@mui/material';


// eventos onClicks que muesta un componente u otro en función de lo clicado.

function App() {
	const [cambiarComicsYPersonajes, setCambiarComicsYPersonajes] = React.useState('mostrarPersonajes');
	
	return (
		<div className='app-background'>
			<Container fixed className='app-background'>
				<Button variant='contained' onClick={() => setCambiarComicsYPersonajes("mostrarPersonajes")}>Mostrar Personajes</Button>
				<Button variant='contained' onClick={() => setCambiarComicsYPersonajes("mostrarComics")}>Mostrar Comics</Button>
				{cambiarComicsYPersonajes === "mostrarPersonajes"?(
					<Personajes/>
				):<Comics/>}
			</Container>
		</div>
	);
}

export default App;
