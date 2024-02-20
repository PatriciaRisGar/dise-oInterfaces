import {useState} from 'react';
import * as React from 'react';
import {useEffect} from 'react';
import {ImageList, ImageListItem, Button, Typography, Box, Pagination, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Slide} from '@mui/material';
import NavBar from './NavBar';

//transicion para la modal
const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

//Comics lo hice despues de personajes y he querido intentar hacer mas legible el codigo. De forma que en este componente, con un mismo fetch hago la solicitud de todos los comics o aquellos que  coincidan con la busqueda
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
		number--; // resto para que no comience desde 0
		let urlAPI = `http://gateway.marvel.com/v1/public/comics?ts=1000&apikey=c3e33fa73373fe9fe7539b0ef460a146&hash=a5e19f1edb7daec9b30a72be31ef35d5&offset=${number}&limit=20`; // API completa
		if (nombreComic !== undefined && nombreComic !== '') {
			urlAPI += `&titleStartsWith=${nombreComic}`; // a la API completa le añado la busqueda del personaje si el textField esta relleno
		}
		const response = await fetch(urlAPI);
		const data = await response.json();
		setComics(data.data.results);
		setTotalPaginas(parseInt(data.data.total / 20)); // traiga de 20 en 20 los siguientes personajes
	};

	// cambia el valor para buscar el comic
	const onBuscarComic = (nombreComic) => {
		setNombreComicsABuscar(nombreComic);
		fetchData(1, nombreComic);
	};

	//ciera modal
	const handleClose = () => {
		setOpen(false);
	};

	//abre modal con info personaje
	const mostrarModalDeInformacion = (comic) => {
		setCommicSeleccionado(comic);
		setOpen(true);
	};

	return (
		<div>
			{comics.length > 0 ? (
				<div>
					<NavBar onBuscarPersonaje={onBuscarComic} />
					<ImageList sx={{width: 1150}} cols={3}>
						{comics.map((comic) => (
							<ImageListItem key={comic.id} sx={{height: 300}}>
								<img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.name} loading='lazy' />
								<Box sx={{bgcolor: 'rgba(0, 0, 0, 0.8)', p: 1, position: 'absolute', bottom: 0, left: 0, right: 0}}>
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
