import { Link } from 'react-router-dom';
import { useState } from 'react';

const Game = (props) => {
	const { levelData } = props;

	const [characters, setCharacters] = useState(levelData.characters);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [clickedCoord, setClickedCoord] = useState();

	const onImageClick = (e) => {
		const { pageX, pageY, offsetX, offsetY } = e.nativeEvent;
		if (e.target.className === 'gameLevel') {
			setClickedCoord({ X: offsetX, Y: offsetY });
		}
		if (!showContextMenu) {
			document.querySelector('.contextMenu').style.top = pageY + 'px';
			document.querySelector('.contextMenu').style.left = pageX + 'px';
		}
		setShowContextMenu((prevState) => !prevState);
	};

	const onContextMenuClick = (e) => {
		const { id } = e.currentTarget;
		const clickedCharacter = characters.find((char) => {
			return char.name === id;
		});
		const result =
			isCoordWithinRange(clickedCoord.X, clickedCharacter.coords.X) &&
			isCoordWithinRange(clickedCoord.Y, clickedCharacter.coords.Y);
		if (result) {
			const newState = characters.map((char) => {
				return char.name === id ? { ...char, found: true } : char;
			});
			setCharacters(newState);
		}
	};

	const isCoordWithinRange = (clickedCoord, charCoord) => {
		return charCoord >= clickedCoord - 10 && charCoord <= clickedCoord + 10;
	};

	const contectMenuCharacters = levelData.characters.map((char, index) => {
		return (
			<div id={char.name} key={index} onClick={onContextMenuClick}>
				<img src={char.photo} alt={char.name} />
				<h4>{char.name}</h4>
			</div>
		);
	});

	return (
		<div className='gamePage'>
			<div className='gameHeader'>
				<h1>Where's Waldo</h1>
				<div className='headerCharacters'>
					{characters
						? characters.map((char, index) => (
								<img
									key={index}
									src={char.photo}
									alt={char.name}
									className={
										char.found ? 'found' : 'notFound'
									}
								/>
						  ))
						: null}
				</div>
				<Link to='/'>
					<button className='homeLink'>Home Page</button>
				</Link>
			</div>
			<div className='game' onClick={onImageClick}>
				<div
					className='contextMenu'
					style={{ display: showContextMenu ? 'block' : 'none' }}
				>
					{contectMenuCharacters}
				</div>
				<img
					className='gameLevel'
					src={levelData.picture}
					alt={levelData.levelId}
				/>
			</div>
		</div>
	);
};

export default Game;
