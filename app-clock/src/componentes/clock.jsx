import * as ReactDOM from 'react-dom';
import React from 'react';
import {useState} from 'react';

// class Clock extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {date: new Date()};
// 	}

// 	componentDidMount() {
// 		this.timerID = setInterval(() => this.tick(), 1000);
// 	}

// 	componentWillUnmount() {
// 		clearInterval(this.timerID);
// 	}

// 	tick() {
// 		this.setState({date: new Date()});
// 	}
// 	render() {
// 		return (
// 			<div>
// 				<h1>Hello, world!</h1>
// 				<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
// 			</div>
// 		);
// 	}
// }

function Clock() {
	const [hora, setHora] = useState(new Date());

	// Función para actualizar la hora cada segundo
	const actualizarHora = () => {
		setHora(new Date());
	};

	// Establecer el intervalo para actualizar la hora cada segundo
	// Este efecto se ejecutará cada vez que el componente se renderice
	setInterval(actualizarHora, 1000);

	return (
		<div>
			<h1>Clock</h1>
			<p>{hora.toLocaleTimeString()}</p>
		</div>
	);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Clock />);
export default Clock;
