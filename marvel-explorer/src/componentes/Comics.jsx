import {useState} from 'react';
import * as React from 'react';
import {useEffect} from 'react';
import {ImageList, ImageListItem, Button, Typography, Box, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material';
import NavBar from './NavBar';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function Comics() {
	const [nombreComicsABuscar, setNombreComicsABuscar] = useState('');
	const [commicSeleccionado, setCommicSeleccionado] = useState({});
	const [comics, setComics] = useState([]);
	const [open, setOpen] = useState(false);
	const [totalPaginas, setTotalPaginas] = useState([]);

	useEffect(() => {
		fetchData(1);
	}, []);

	const fetchData = async (number, nombreComic) => {
		number--;
		let urlAPI = `http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=c3e33fa73373fe9fe7539b0ef460a146&hash=a5e19f1edb7daec9b30a72be31ef35d5&offset=${number}&limit=20`;
		if (nombreComic !== undefined && nombreComic !== '') {
			urlAPI += `&titleStartsWith=${nombreComic}`;
		}
		const response = await fetch(urlAPI);
		const data = await response.json();
		setComics(data.data.results);
		setTotalPaginas(parseInt(data.data.total / 20));
	};

	const onBuscarComic = (nombreComic) => {
		setNombreComicsABuscar(nombreComic);
		fetchData(1, nombreComic);
	};
	const handleClose = () => {
		setOpen(false);
	};

	const mostrarModalDeInformacion = (comic) => {
		setCommicSeleccionado(comic);
		setOpen(true);
	};

	return (
		<div>
			{comics.length > 0 ? (
				<div>
					<NavBar onBuscarPersonaje={onBuscarComic} />
					<ImageList variant='woven' cols={3}>
						{comics.map((comic) => (
							<ImageListItem key={comic.id}>
								<img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name} loading='lazy' />
								<Box sx={{bgcolor: 'rgba(0, 0, 0, 0.5)', p: 1, position: 'absolute', bottom: 0, left: 0, right: 0}}>
									<Typography variant='subtitle1' sx={{color: 'white', fontWeight: 'bold'}}>
										{comic.title}
									</Typography>
									<Button variant='contained' onClick={() => mostrarModalDeInformacion(comic)} sx={{mt: 1}}>
										Saber más
									</Button>
								</Box>
							</ImageListItem>
						))}
					</ImageList>
					<Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
						<DialogTitle>{commicSeleccionado.title}</DialogTitle>
						<DialogContent>
							<DialogContentText id='alert-dialog-slide-description'>
								ID: {commicSeleccionado.id}
								<br></br>
								{commicSeleccionado.isbn ? <p>ISBN: {commicSeleccionado.isbn}</p> : <p>No hay número ISBN disponible.</p>}
								{commicSeleccionado.description ? <p>Descripción: {commicSeleccionado.description}</p> : <p>No hay descripción disponible.</p>}
							</DialogContentText>
						</DialogContent>
						<DialogActions>
							<Button onClick={handleClose}>Cerrar</Button>
						</DialogActions>
					</Dialog>
					<Pagination className='paginacion-container' count={totalPaginas} variant='outlined' onChange={(event, number) => fetchData(number, nombreComicsABuscar)} />
				</div>
			) : (
				<Typography variant='h3' className='estiloCargandoComics'>
					Cargando...
				</Typography>
			)}
		</div>
	);
}
