import * as React from 'react';
import {Box, TextField, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';
import '../App.css';


// Componente que recoge el personaje a buscar y boton con evento onclick lo envia al padre para que realice la busqueda
export default function NavBar({onBuscarPersonaje}) {
	const [valor, setValor] = useState('');
	const handleChange = (event) => {
		setValor(event.target.value);
	};

	return (
		<Box className='nav-container'>
			<TextField id='input-with-sx' onChange={handleChange} label='Buscar' variant='standard' className='estiloTextField' />
			<Button onClick={() => onBuscarPersonaje(valor)} variant='contained'>
				<SearchIcon/>
			</Button>
		</Box>
	);
}
