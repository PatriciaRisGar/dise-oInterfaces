import * as ReactDOM from 'react-dom';
import React, {useState} from 'react';

function Counter() {
	const [count, setCount] = useState(0);
	function alerts(count) {
		if (count == 0) {
			alert('Contador a cero');
		} else if (count % 2 != 0) {
			alert('Numero impar');
		} else {
			alert('Numero par');
		}
	}

	return (
		<div>
			<p>{count}</p>
			<button onClick={() => setCount((count) => count + 1)}> + </button>
			<button onClick={() => setCount((count) => count - 1)}> - </button>
			{alerts(count)}
		</div>
	);
}

export default Counter;
