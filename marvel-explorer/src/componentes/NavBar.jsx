import * as React from 'react';
import {Box, TextField, Button} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react';
import '../App.css';

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
