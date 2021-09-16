import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css';
import { app, db } from './firebase';
import Header from './components/Header';
import Home from './components/Home';
import Game from './components/Game';
import allLevels from './components/levels';

const App = () => {
	const [levelId, setLevelId] = useState();
	const [picture, setPicture] = useState();
	const [characters, setCharacters] = useState();
	const [coords, setCoords] = useState();
	const [showContextMenu, setShowContextMenu] = useState(false);

	const goToLevel = (e) => {
		const { id } = e.currentTarget;
		setLevelId(id);

		const level = allLevels.find((level) => level.id === id);
		setPicture(level.picture);
		setCharacters(level.characters);
	};

	const onImageClick = (e) => {
		const { pageX, pageY } = e;
		if (e.target.className === 'gameLevel') {
			const { pageX, pageY } = e;
			setCoords({ pageX, pageY });
		}
		if (!showContextMenu) {
			document.querySelector('.contextMenu').style.top = pageY + 'px';
			document.querySelector('.contextMenu').style.left = pageX + 'px';
		}
		setShowContextMenu((prevState) => !prevState);
	};

	const onContextMenuClick = (e) => {
		const { id } = e.currentTarget;
		const newState = characters.map((char) => {
			return char.name === id ? { ...char, found: true } : char;
		});
		setCharacters(newState);
	};

	return (
		<BrowserRouter>
			<Header characters={characters} />
			<Switch>
				<Route exact path='/'>
					<Home allLevels={allLevels} goToLevel={goToLevel} />
				</Route>
				<Route exact path='/game'>
					<Game
						level={levelId}
						image={picture}
						characters={characters}
						showcontextMenu={showContextMenu}
						onImageClick={onImageClick}
						onContextMenuClick={onContextMenuClick}
					/>
				</Route>
				<Redirect to='/' />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
