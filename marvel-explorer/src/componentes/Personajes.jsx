import {useState} from 'react';
import LlamadaAPI from './LlamadaAPI';
import NavBar from './NavBar';
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {Button} from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export default function Personajes() {
	const [buscar, setBuscar] = useState('');
	const [open, setOpen] = React.useState(false);
	const [characterInfo, setCharacterInfo] = useState([]);

	const handleClose = () => {
		setOpen(false);
	};
	console.log(characterInfo);

	return (
		<div>
			<NavBar buscar={buscar} onBuscadorChange={setBuscar} />
			<LlamadaAPI buscar={buscar} characterInfo={setCharacterInfo} open={setOpen} />
			<Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-describedby='alert-dialog-slide-description'>
				<DialogTitle>{characterInfo.name}</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-slide-description'>
						<p>ID: {characterInfo.id}</p>
						<p>Descripción: {characterInfo.description}</p>
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cerrar</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
