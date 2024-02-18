import * as React from 'react';
import {Box, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default function NavBar({buscar, onBuscadorChange}) {
	return (
		<Box sx={{'& > :not(style)': {m: 1}}}>
			<Box sx={{display: 'flex', alignItems: 'flex-end'}}>
				<SearchIcon sx={{color: 'action.active', mt: 6, mr: 1.5, ml: 100}} />
				<TextField id='input-with-sx' value={buscar} onChange={(event) => onBuscadorChange(event.target.value)} label='Buscar personaje' variant='standard' />
			</Box>
		</Box>
	);
}
