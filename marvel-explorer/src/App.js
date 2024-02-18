import Personajes from './componentes/Personajes.jsx';
import Container from '@mui/material/Container';
import './App.css';

function App() {
	return (
		<div className='app-background'>
			<Container fixed className='app-background'>
				<Personajes />
			</Container>
		</div>
	);
}

export default App;
