import { Link, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	getFirestore,
	serverTimestamp,
	// getDoc,
	doc,
	setDoc,
} from 'firebase/firestore';

const Game = (props) => {
	const history = useHistory();
	const { data, time, fnStopTimer } = props;

	const [gameId, setGameId] = useState();
	const [gameOver, setGameOver] = useState(false);
	const [levelData, setLevelData] = useState(data);
	const [characters, setCharacters] = useState(data?.characters);
	const [clickedCoord, setClickedCoord] = useState();
	const [showContextMenu, setShowContextMenu] = useState(false);

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
	}, []);

	useEffect(() => {
		const foundAll = characters?.every((char) => char.found === true);
		if (foundAll) {
			setDoc(
				doc(getFirestore(), 'usersGames', gameId),
				{
					gameEnd: serverTimestamp(),
				},
				{ merge: true }
			);
			setGameOver(true);
		}
	}, [characters]);

	useEffect(() => {
		if (gameOver) {
			fnStopTimer();
			console.log('GameOver. Your time: ' + time + ' seconds');
		}
	}, [gameOver]);

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

	const onContextMenuClick = (id) => {
		const clickedCharacter = levelData.characters.find((char) => {
			return char.name === id;
		});
		const result =
			isCoordWithinRange(clickedCoord.X, clickedCharacter.coords.X) &&
			isCoordWithinRange(clickedCoord.Y, clickedCharacter.coords.Y);
		if (result) {
			const newCharState = levelData.characters.map((char) => {
				return char.name === id ? { ...char, found: true } : char;
			});
			setCharacters(newCharState);
		}
	};

	const isCoordWithinRange = (clickedCoord, charCoord) => {
		return charCoord >= clickedCoord - 10 && charCoord <= clickedCoord + 10;
	};

	const headerDisplayCharacters = characters?.map((char, index) => {
		return (
			<img
				key={index}
				src={char.photoURL}
				alt={char.name}
				className={char.found ? 'found' : 'notFound'}
			/>
		);
	});

	const contectMenuCharacters = characters?.map((char, index) => {
		return (
			<div
				key={index}
				className={char.found ? 'found' : 'notFound'}
				onClick={() => onContextMenuClick(char.name)}
			>
				<img src={char.photoURL} alt={char.name} />
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
					<div className='gameHeader'>
						<h1>Where's Waldo</h1>
						<h3 className='gameTime'>
							{new Date(time * 1000).toISOString().substr(11, 8)}
						</h3>
						<div className='headerCharacters'>
							{headerDisplayCharacters}
						</div>
						<Link to='/'>
							<button className='homeLink'>Home Page</button>
						</Link>
					</div>
					<div className='game' onClick={onImageClick}>
						<div
							className='contextMenu'
							style={{
								display: showContextMenu ? 'block' : 'none',
							}}
						>
							{contectMenuCharacters}
						</div>
						<img
							className='gameLevel'
							src={levelData.pictureURL}
							alt={levelData.levelId}
						/>
					</div>
				</div>
			) : (
				noDataRedirect()
			)}
		</>
	);
};

export default Game;
