import { useEffect, useState } from 'react';

interface CounterProps {
	initialCount: number;
}

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		const mountEvent = new CustomEvent('onCounterMount');
		window.dispatchEvent(mountEvent);

		return () => {
			const unmountEvent = new CustomEvent('onCounterUnmount');
			window.dispatchEvent(unmountEvent);
		};
	}, []);

	useEffect(() => {
		if (count >= 10) {
			return;
		}
		const updateEvent = new CustomEvent('onCounterUpdate', { detail: { count } });
		window.dispatchEvent(updateEvent);
	}, [count]);

	const handleIncrement = () => {
		setCount((prev) => prev + 1);
	};

	useEffect(() => {
		if (count >= 10) {
			setTimeout(() => {
				setCount(0); 
			}, 100);
		}
	}, [count]);

	return (
		<div>
			<h2>Contador: {count}</h2>
			<button onClick={handleIncrement} disabled={count >= 10}>
				Incrementar
			</button>
		</div>
	);
};