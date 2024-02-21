import React from 'react';
import Item from './Item';

export default function ListadoTareas({tareas, onClomplete, onDelete}) {
	return (
		<div>
			{tareas.map((tarea) => (
				<Item key={tarea.id} tarea={tarea} onClomplete={onClomplete} onDelete={onDelete}></Item>
			))}
		</div>
	);
}
