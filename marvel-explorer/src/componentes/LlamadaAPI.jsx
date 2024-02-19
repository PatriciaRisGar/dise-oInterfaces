import React, {useState, useEffect} from 'react';
import {ImageList, ImageListItem, Button, Typography, Box, Pagination} from '@mui/material';
import '../App.css';

function LlamadaAPI({buscar, characterInfo, open}) {
	const [characters, setCharacters] = useState([]);
	const [totalPaginas, setTotalPaginas] = useState([]);

	useEffect(() => {
		if (buscar === '') {
			fetchData(null, 1);
		} else {
			const findCharacterByName = async () => {
				const response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=c3e33fa73373fe9fe7539b0ef460a146&hash=a5e19f1edb7daec9b30a72be31ef35d5&nameStartsWith=${buscar}`);
				const data = await response.json();
				setCharacters(data.data.results);
			};
			findCharacterByName();
		}
	}, [buscar]);

	const fetchData = async (event, number) => {
		number--;
		const response = await fetch(`http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=c3e33fa73373fe9fe7539b0ef460a146&hash=a5e19f1edb7daec9b30a72be31ef35d5&offset=${number}&limit=20`);
		const data = await response.json();
		setCharacters(data.data.results);
		setTotalPaginas(parseInt(data.data.total / 20));
	};

	const handleClickOpen = (character) => {
		characterInfo(character);
		open(true);
	};
	if (buscar === '') {
		return (
			<div>
				{characters.length > 0 ? (
					<div>
						<ImageList variant='woven' cols={3}>
							{characters.map((character) => (
								<ImageListItem key={character.id}>
									<img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} loading='lazy' />
									<Box sx={{bgcolor: 'rgba(0, 0, 0, 0.5)', p: 1, position: 'absolute', bottom: 0, left: 0, right: 0}}>
										<Typography variant='subtitle1' sx={{color: 'white', fontWeight: 'bold'}}>
											{character.name}
										</Typography>
										<Button variant='contained' onClick={() => handleClickOpen(character)} sx={{mt: 1}}>
											Saber más
										</Button>
									</Box>
								</ImageListItem>
							))}
						</ImageList>
						<Pagination className='paginacion-container' count={totalPaginas} variant='outlined' onChange={(event, number) => fetchData(event, number)} />
					</div>
				) : (
					<Typography variant='h3'>Cargando...</Typography>
				)}
			</div>
		);
	}
	return (
		<div>
			<h3>Personajes encontrados</h3>
			<ul>
				{characters.map((character) =>
					character.name.toLowerCase().includes(buscar.toLowerCase()) ? (
						<li key={character.id} className="character-item">
							<h2 className='white-text'>{character.name}</h2>
							<p className='white-text'>{character.description}</p>
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
