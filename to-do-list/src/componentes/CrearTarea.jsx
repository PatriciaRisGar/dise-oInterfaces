import React, {useState} from 'react';

export default function CrearTarea({addTarea}) {
	const [userInput, setuserInput] = useState('');

	const handleOnChange = (event) => {
		setuserInput(event.currentTarget.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (userInput.trim() !== '') {
			addTarea(userInput);
			setuserInput('');
		}
	};

	return (
		<div style={{margin: 20}}>
			<form onSubmit={handleSubmit}>
				<input type='text' value={userInput} onChange={handleOnChange}></input>
				<button>Añadir tarea</button>
			</form>
		</div>
	);
}
