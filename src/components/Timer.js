import { useEffect } from 'react';

const Timer = (props) => {
	const { stop, startDate, fnSetTime } = props;
	useEffect(() => {
		if (!stop) {
			const timer = setInterval(() => {
				const newTime = Math.floor((Date.now() - startDate) / 1000);
				fnSetTime(newTime);
			}, 1000);
			return () => {
				clearInterval(timer);
			};
		}
	});
	return null;
};

export default Timer;
