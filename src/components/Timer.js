import { useEffect } from 'react';
import Game from './Game';

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

//
// Version without milliseconds.
// Needs changes in component Game.js at line (150).
//
// const Timer = (props) => {
// 	const { stop, startDate, fnSetTime } = props;
// 	useEffect(() => {
// 		if (!stop) {
// 			const timer = setInterval(() => {
// 				const newTime = Math.floor(Date.now() - startDate) / 1000;
// 				fnSetTime(newTime);
// 			}, 1000);
// 			return () => {
// 				clearInterval(timer);
// 			};
// 		}
// 	});
// 	return null;
// };
//

export default Timer;
