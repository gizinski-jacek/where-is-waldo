import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import app from './firebase';
import Home from './components/Home';
import Game from './components/Game';
import Timer from './components/Timer';

const App = () => {
	const [allLevelsData, setAllLevelsData] = useState([]);
	const [levelData, setLevelData] = useState();
	const [gameTime, setGameTime] = useState(0);
	const [gameStartTime, setGameStartTime] = useState();
	const [stopTimer, setStopTimer] = useState(false);

	const goToLevel = (id) => {
		setLevelData(allLevelsData.find((level) => level.id === id));
		setGameTime(0);
		setGameStartTime(Date.now());
		setStopTimer(false);
	};

	const fnSetStopTimer = () => {
		setStopTimer(true);
	};

	const fnSetGameTime = (time) => {
		setGameTime(time);
	};

	useEffect(() => {
		(async () => {
			try {
				await getDocs(collection(getFirestore(), 'gameLevels')).then((docs) => {
					const array = [];
					docs.forEach((doc) => {
						array.push(doc.data());
					});
					setAllLevelsData(array);
				});
			} catch (error) {
				console.log('Error reading data from Firebase Database: ', error);
			}
		})();
	}, []);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Home allLevelsData={allLevelsData} goToLevel={goToLevel} />
				</Route>
				<Route exact path='/game'>
					<Timer
						stop={stopTimer}
						startDate={gameStartTime}
						fnSetTime={fnSetGameTime}
					/>
					<Game data={levelData} time={gameTime} fnStopTimer={fnSetStopTimer} />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
