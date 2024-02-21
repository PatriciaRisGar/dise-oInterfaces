import React from 'react';

export default function Item({tarea, onClomplete, onDelete}) {
	return (
		<div>
			<input type='checkbox' checked={tarea.completed} onChange={() => onClomplete(tarea.id)}></input>
			{tarea.todo}
			<button onClick={() => onDelete(tarea.id)}>X</button>
		</div>
	);
}
