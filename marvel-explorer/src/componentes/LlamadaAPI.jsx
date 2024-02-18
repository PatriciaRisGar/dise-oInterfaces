//El hash es calculado con md5 (timestamp + key privada + key publica)
// http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=c3e33fa73373fe9fe7539b0ef460a146&hash=a5e19f1edb7daec9b30a72be31ef35d5

import React, {useState, useEffect} from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

import Button from '@mui/material/Button';

function LlamadaAPI({buscar, characterInfo, open}) {
	const [characters, setCharacters] = useState([]);

	useEffect(() => {
		const datos = async () => {
			const response = await fetch('http://gateway.marvel.com/v1/public/characters?ts=1000&apikey=c3e33fa73373fe9fe7539b0ef460a146&hash=a5e19f1edb7daec9b30a72be31ef35d5');
			const data = await response.json();
			setCharacters(data.data.results);
		};
		datos();
	}, []);

	// AlertDialogSlide

	const handleClickOpen = (character) => {
		console.log(character);
		characterInfo(character);
		open(true);
	};

	if (buscar === '') {
		return (
			<div>
				<h1>Todos los personajes</h1>
				<ul>
					{characters.map((character) => (
						<li key={character.id}>
							<h2>{character.name}</h2>
							<ImageList variant='masonry' cols={3} gap={8}>
								<ImageListItem>
									<img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} loading='lazy' />
								</ImageListItem>
							</ImageList>
							<Button variant='outlined' onClick={(event) => handleClickOpen(character)}>
								Saber mas
							</Button>
						</li>
					))}
				</ul>
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
