import { useEffect } from 'react';

const Timer = ({ stop, startDate, updateGameTime }) => {
	useEffect(() => {
		if (!stop) {
			const timer = setInterval(() => {
				const newTime = Date.now() - startDate;
				updateGameTime(newTime);
			}, 100);
			return () => {
				clearInterval(timer);
			};
		}
	});
	return null;
};

export default Timer;
