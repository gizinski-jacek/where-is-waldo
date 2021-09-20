import { useEffect } from 'react';

const Timer = (props) => {
	const { stopTimer, startTime, fnSetTimer } = props;
	useEffect(() => {
		if (!stopTimer) {
			const timer = setInterval(() => {
				const newTime = Math.floor((Date.now() - startTime) / 1000);
				fnSetTimer(newTime);
			}, 1000);
			return () => {
				clearInterval(timer);
			};
		}
	});
	return null;
};

export default Timer;
