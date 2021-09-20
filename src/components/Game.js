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
	const [gameStartTime, setGameStartTime] = useState();
	const [gameTime, setGameTime] = useState(0);
	const [gameOver, setGameOver] = useState(false);
	const [levelData, setLevelData] = useState(props.data);
	const [characters, setCharacters] = useState(props.data?.characters);
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
				setGameStartTime(Date.now());
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
		if (gameOver) {
			console.log('GameOver. Your time: ' + gameTime + ' seconds');
		}
	}, [gameOver]);

	useEffect(() => {
		if (!gameOver) {
			const timer = setInterval(() => {
				const newTime = Number(
					Math.floor((Date.now() - gameStartTime) / 1000)
				);
				setGameTime(newTime);
			}, 1000);
			return () => {
				clearInterval(timer);
			};
		}
	});

	useEffect(() => {
		const foundAll = characters?.every((char) => char.found === true);
		if (foundAll && !gameOver) {
			setDoc(
				doc(getFirestore(), 'usersGames', gameId),
				{
					gameEnd: serverTimestamp(),
				},
				{ merge: true }
			);
			setGameOver(true);
			setTimeout(() => {
				(async () => {
					try {
						await getDoc(
							doc(getFirestore(), 'usersGames', gameId)
						).then((file) => {
							setGameTime(
								Math.floor(
									file.data().gameEnd - file.data().gameStart
								)
							);
						});
					} catch (error) {
						console.log(
							'Error reading data from Firebase Database: ',
							error
						);
					}
				})();
			}, 200);
		}
	}, [characters]);

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
				<h3 className='gameTime'>{gameTime}</h3>
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
