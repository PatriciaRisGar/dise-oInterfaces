import {useState} from 'react';
import data from './data.json';
import './App.css';
import ListadoTareas from './componentes/ListadoTareas';
import CrearTarea from './componentes/CrearTarea';

function App() {
	const [tareas, settareas] = useState(data);

	const onClomplete = (id) => {
		settareas(
			tareas.map((tarea) => {
				return tarea.id === Number(id) ? {...tarea, completed: !tarea.completed} : {...tarea};
			})
		);
	};

	const onDelete = (id) => {
		settareas([...tareas].filter((tarea) => tarea.id !== Number(id)));
	};

	const addTarea = (nuevaTarea) => {
		let newItem = {id: +new Date(), todo: nuevaTarea, completed: false, userId: null};
		settareas([...tareas, newItem]);
	};

	return (
		<div className='App'>
			<header className='App-header'>
				<CrearTarea addTarea={addTarea} />
				<ListadoTareas tareas={tareas} onClomplete={onClomplete} onDelete={onDelete} />
			</header>
		</div>
	);
}

export default App;
