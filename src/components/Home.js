import { Link } from 'react-router-dom';
import { useState } from 'react';
import Leaderboard from './Leaderboard';

const Home = (props) => {
	const { allLevelsData, goToLevel } = props;

	const [showLeaderboard, setShowLeaderboard] = useState('none');

	const display = allLevelsData.map((item) => {
		return (
			<div key={item.id} className='levelCard'>
				<Link to='game' onClick={() => goToLevel(item.id)}>
					<img
						className='levelPicture'
						src={item.pictureURL}
						alt={item.id}
					/>
				</Link>
				<div className='levelInfo'>
					<h3>{item.id}</h3>
					<div className='levelCharacters'>
						{item.characters.map((char, index) => {
							return (
								<img
									key={index}
									src={char.photoURL}
									alt={char.name}
								/>
							);
						})}
					</div>
				</div>
			</div>
		);
	});

	const toggleShowLeaderboard = (e) => {
		if (e.target.className === 'modalLeaderboard') {
			setShowLeaderboard('none');
		} else {
			setShowLeaderboard('flex');
		}
	};

	return (
		<div className='home'>
			<div className='header'>
				<h1>Where's Waldo</h1>
				<button
					className='showLeaderboard'
					onClick={toggleShowLeaderboard}
				>
					Leaderboard
				</button>
			</div>
			<div className='allLevels'>{display}</div>
			<div
				className='modalLeaderboard'
				style={{ display: showLeaderboard }}
				onClick={toggleShowLeaderboard}
			>
				{showLeaderboard ? <Leaderboard /> : null}
			</div>
		</div>
	);
};

export default Home;
