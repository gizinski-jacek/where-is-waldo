import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	getFirestore,
	serverTimestamp,
	doc,
	setDoc,
} from 'firebase/firestore';
import LevelFinished from './LevelFinished';
import Button from './Button';
import CharacterPic from './utils/CharacterPic';

const Game = ({ data, gameTime, stopTimer }) => {
	const history = useHistory();

	const [gameId, setGameId] = useState();
	const [gameOver, setGameOver] = useState(false);
	const [levelData, setLevelData] = useState(data);
	const [characters, setCharacters] = useState(data?.characters);
	const [clickedCoord, setClickedCoord] = useState({});
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [contextMenuCoords, setContextMenuCoords] = useState({});
	const [userWon, setuserWon] = useState(false);
	const [playerName, setPlayerName] = useState('Anonymous');

	useEffect(() => {
		if (levelData) {
			addDoc(collection(getFirestore(), 'usersGames'), {
				levelData,
				gameStart: serverTimestamp(),
			}).then((docRef) => {
				setCharacters(levelData.characters);
				setGameId(docRef.id);
			});
		}
	}, [levelData]);

	useEffect(() => {
		const foundAll = characters?.every((char) => char.found === true);
		if (foundAll) {
			stopTimer();
			setDoc(
				doc(getFirestore(), 'usersGames', gameId),
				{
					gameEnd: serverTimestamp(),
					gameTime: gameTime,
				},
				{ merge: true }
			);
			setGameOver(true);
		}
	}, [characters, stopTimer, gameId, gameTime]);

	useEffect(() => {
		if (gameOver) {
			setuserWon(true);
		}
	}, [gameOver]);

	useEffect(() => {
		if (gameOver && !userWon) {
			setDoc(
				doc(getFirestore(), 'usersGames', gameId),
				{
					playerName: playerName,
				},
				{ merge: true }
			);
		}
	}, [playerName, userWon, gameId, gameOver]);

	const handleChange = (e) => {
		const { value } = e.target;
		setPlayerName(value);
	};

	const submitScore = (e) => {
		e.preventDefault();
		setuserWon(false);
		if (!playerName) {
			setPlayerName('Anonymous');
		}
	};

	const onImageClick = (e) => {
		const { pageX, pageY, offsetX, offsetY } = e.nativeEvent;
		if (e.target.className === 'gameLevelPicture') {
			setClickedCoord({ X: offsetX, Y: offsetY });
		}
		if (!showContextMenu) {
			setContextMenuCoords({ X: pageX + 'px', Y: pageY + 'px' });
		}
		setShowContextMenu((prevState) => !prevState);
	};

	const onContextMenuClick = (id) => {
		const clickedCharacter = levelData.characters.find((char) => {
			return char.name === id;
		});
		const result =
			isCoordWithinRange(clickedCoord.X, clickedCharacter.coords.X) &&
			isCoordWithinRange(clickedCoord.Y, clickedCharacter.coords.Y);
		if (result) {
			const newCharState = characters.map((char) => {
				return char.name === id ? { ...char, found: true } : char;
			});
			setCharacters(newCharState);
		}
	};

	const isCoordWithinRange = (clickedCoord, charCoord) => {
		return charCoord >= clickedCoord - 10 && charCoord <= clickedCoord + 10;
	};

	const headerDisplayCharacters = characters?.map((char, index) => {
		return <CharacterPic key={index} data={char} />;
	});

	const contectMenuCharacters = characters?.map((char, index) => {
		return (
			<div
				key={index}
				className={char.found ? 'found' : 'notFound'}
				onClick={char.found ? null : () => onContextMenuClick(char.name)}
			>
				<CharacterPic key={index} data={char} />
				<h4>{char.name}</h4>
			</div>
		);
	});

	const noDataRedirect = () => {
		history.push('/');
	};

	return (
		<>
			{levelData ? (
				<div className='gamePage'>
					<header className='gameHeader'>
						<h1>Where's Waldo</h1>
						<h3 className='gameTime'>
							{new Date(gameTime).toISOString().substring(14, 21)}
						</h3>
						<div className='headerCharacters'>{headerDisplayCharacters}</div>
						<Link to='/'>
							<Button text={'Home Page'} />
						</Link>
					</header>
					<main className='game' onClick={onImageClick}>
						<img
							className='gameLevelPicture'
							src={levelData.pictureURL}
							alt={levelData.levelId}
						/>
						<div
							className='contextMenu'
							style={{
								display: showContextMenu ? 'block' : 'none',
								top: contextMenuCoords.Y,
								left: contextMenuCoords.X,
							}}
						>
							{contectMenuCharacters}
						</div>
					</main>
				</div>
			) : (
				noDataRedirect()
			)}
			{userWon ? (
				<LevelFinished
					time={gameTime}
					name={playerName}
					handleChange={handleChange}
					submitScore={submitScore}
				/>
			) : null}
		</>
	);
};

export default Game;
