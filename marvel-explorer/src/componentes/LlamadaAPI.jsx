import React, {useState, useEffect} from 'react';
import {ImageList, ImageListItem, Button, Typography, Box} from '@mui/material';

function LlamadaAPI({buscar, characterInfo, open}) {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch('http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=c3e33fa73373fe9fe7539b0ef460a146&hash=a5e19f1edb7daec9b30a72be31ef35d5');
			const data = await response.json();
			setCharacters(data.data.results);
		};
		fetchData();
	}, []);

	const handleClickOpen = (character) => {
		characterInfo(character);
		open(true);
	};
	if (buscar === '') {
		return (
			<div>
				{characters.length > 0 ? (
					<div>
						<Typography variant='h4' sx={{mb: 10}}>Todos los personajes</Typography>
						<ImageList variant='woven' cols={3}>
							{characters.map((character) => (
								<ImageListItem key={character.id}>
									<img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} loading='lazy' />
									<Box sx={{bgcolor: 'rgba(0, 0, 0, 0.5)', p: 1, position: 'absolute', bottom: 0, left: 0, right: 0}}>
										<Typography variant='subtitle1' sx={{color: 'white', fontWeight: 'bold'}}>
											{character.name}
										</Typography>
										<Button variant='outlined' onClick={() => handleClickOpen(character)} sx={{mt: 1}}>
											Saber más
										</Button>
									</Box>
								</ImageListItem>
							))}
						</ImageList>
					</div>
				) : (
					<Typography variant='h4'>Cargando...</Typography>
				)}
			</div>
		);
	}
	console.log(buscar);
	return (
		<div>
			<h1>Personajes encontrados</h1>
			<ul>
				{characters.map((character) =>
					character.name.toLowerCase().includes(buscar.toLowerCase()) ? (
						<li key={character.id}>
							<h2>{character.name}</h2>
							<p>{character.description}</p>
							<ImageList variant='masonry' cols={3} gap={8}>
								<ImageListItem>
									<img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} loading='lazy' />
								</ImageListItem>
							</ImageList>
						</li>
					) : null
				)}
			</ul>
		</div>
	);
}

export default LlamadaAPI;
