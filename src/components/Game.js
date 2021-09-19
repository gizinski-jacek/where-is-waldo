import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
	addDoc,
	collection,
	getFirestore,
	serverTimestamp,
	getDoc,
	doc,
	setDoc,
} from 'firebase/firestore';

const Game = (props) => {
	const [gameId, setGameId] = useState();
	const [levelData, setLevelData] = useState(props.data);
	const [characters, setCharacters] = useState(props.data?.characters);
	const [showContextMenu, setShowContextMenu] = useState(false);
	const [clickedCoord, setClickedCoord] = useState();

	useEffect(() => {
		if (levelData) {
			addDoc(collection(getFirestore(), 'usersGames'), {
				levelData,
				gameStart: serverTimestamp(),
			}).then((docRef) => {
				setCharacters(levelData.characters);
				setGameId(docRef.id);
				localStorage.setItem('currentLevel', levelData.id);
			});
		}
	}, [levelData]);

	useEffect(() => {
		if (!levelData) {
			const currentLevel = localStorage.getItem('currentLevel');
			(async () => {
				try {
					await getDoc(
						doc(getFirestore(), 'gameLevels', currentLevel)
					).then((file) => {
						setLevelData(file.data());
					});
				} catch (error) {
					console.log(
						'Error reading data from Firebase Database: ',
						error
					);
				}
			})();
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
			console.log('Game Over');
		}
	}, [characters, gameId]);

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

	return (
		<div className='gamePage'>
			<div className='gameHeader'>
				<h1>Where's Waldo</h1>
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
					style={{ display: showContextMenu ? 'block' : 'none' }}
				>
					{contectMenuCharacters}
				</div>
				<img
					className='gameLevel'
					src={levelData?.pictureURL}
					alt={levelData?.levelId}
				/>
			</div>
		</div>
	);
};

export default Game;
