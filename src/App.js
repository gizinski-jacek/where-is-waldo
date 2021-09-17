import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useState } from 'react';
import './App.css';
import { app, db } from './firebase';
import Home from './components/Home';
import Game from './components/Game';
import allLevels from './components/levels';

const App = () => {
	const [levelData, setLevelData] = useState();

	const goToLevel = (e) => {
		const { id } = e.currentTarget;
		setLevelData(allLevels.find((level) => level.id === id));
	};

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Home allLevels={allLevels} goToLevel={goToLevel} />
				</Route>
				<Route exact path='/game'>
					<Game levelData={levelData} />
				</Route>
				<Redirect to='/' />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
