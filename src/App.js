import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { getDocs, collection, getFirestore } from 'firebase/firestore';
import app from './firebase';
import Home from './components/Home';
import Game from './components/Game';
import Timer from './components/Timer';
import Footer from './components/Footer';

const App = () => {
	const [allLevelsData, setAllLevelsData] = useState([]);
	const [levelData, setLevelData] = useState();
	const [gameStartTime, setGameStartTime] = useState();
	const [currentGameTime, setCurrentGameTime] = useState(0);
	const [timerStopped, setTimerStopped] = useState(false);

	const goToLevel = (id) => {
		setLevelData(allLevelsData.find((level) => level.id === id));
		setCurrentGameTime(0);
		setGameStartTime(Date.now());
		setTimerStopped(false);
	};

	const stopTimer = () => {
		setTimerStopped(true);
	};

	const updateGameTime = (time) => {
		setCurrentGameTime(time);
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
					<Footer />
				</Route>
				<Route exact path='/game'>
					<Timer
						stop={timerStopped}
						startDate={gameStartTime}
						updateGameTime={updateGameTime}
					/>
					<Game
						data={levelData}
						gameTime={currentGameTime}
						stopTimer={stopTimer}
					/>
					<Footer />
				</Route>
			</Switch>
		</BrowserRouter>
	);
};

export default App;
