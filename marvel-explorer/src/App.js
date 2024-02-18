import Personajes from './componentes/Personajes.jsx';
import Container from '@mui/material/Container';
import background from './media/fondo.jpg';

function App() {
	const containerStyle = {
		backgroundImage: `url(${background}) `,
		backgroundSize: '100% 100%', // Ajusta el tamaño de la imagen para cubrir todo el contenedor
		backgroundRepeat: 'no-repeat',
		height: '100vh',
		width: '100%',
	};
	return (
		<div style={containerStyle}>
			<Container fixed>
				<Personajes />
			</Container>
		</div>
	);
}

export default App;
