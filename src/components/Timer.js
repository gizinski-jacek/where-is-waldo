import { useEffect } from 'react';

const Timer = (props) => {
	const { stop, startDate, fnSetTime } = props;
	useEffect(() => {
		if (!stop) {
			const timer = setInterval(() => {
				const newTime = Date.now() - startDate;
				fnSetTime(newTime);
			}, 100);
			return () => {
				clearInterval(timer);
			};
		}
	});
	return null;
};

export default Timer;
