import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';
import app from './firebase';
// import levelsFile from './components/levels';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import Timer from './components/Timer';

const App = () => {
	const [allLevelsData, setAllLevelsData] = useState([]);
	const [levelData, setLevelData] = useState();
	const [timer, setTimer] = useState(0);
	const [startDate, setStartDate] = useState();
	const [stopTimer, setStopTimer] = useState(false);

	const goToLevel = (id) => {
		setLevelData(allLevelsData.find((level) => level.id === id));
		setTimer(0);
		setStartDate(Date.now());
		setStopTimer(false);
	};

	const fnStopTimer = () => {
		setStopTimer(true);
	};

	const fnSetTimer = (time) => {
		setTimer(time);
	};

	useEffect(() => {
		localStorage.clear();
		(async () => {
			try {
				await getDocs(collection(getFirestore(), 'gameLevels')).then(
					(files) => {
						const array = [];
						files.forEach((file) => {
							array.push(file.data());
						});
						setAllLevelsData(array);
					}
				);
			} catch (error) {
				console.log(
					'Error reading data from Firebase Database: ',
					error
				);
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
						stopTimer={stopTimer}
						startTime={startDate}
						fnSetTimer={fnSetTimer}
					/>
					<Game
						data={levelData}
						time={timer}
						fnStopTimer={fnStopTimer}
					/>
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
