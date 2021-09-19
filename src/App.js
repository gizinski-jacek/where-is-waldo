import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home';
import Game from './components/Game';
import app from './firebase';
// import levelsFile from './components/levels';
import { getDocs, collection, getFirestore } from 'firebase/firestore';

const App = () => {
	const [allLevelsData, setAllLevelsData] = useState([]);
	const [levelData, setLevelData] = useState();

	const goToLevel = (id) => {
		setLevelData(allLevelsData.find((level) => level.id === id));
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
					<Game data={levelData} />
				</Route>
				<Redirect to='/' />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
