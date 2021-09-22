import { useState } from 'react';
import Leaderboard from './Leaderboard';
import Button from './Button';
import LevelCard from './utils/LevelCard';

const Home = (props) => {
	const { allLevelsData, goToLevel } = props;

	const [showLeaderboard, setShowLeaderboard] = useState('none');

	const toggleShowLeaderboard = (e) => {
		if (e.target.className === 'modalLeaderboard') {
			setShowLeaderboard('none');
		} else {
			setShowLeaderboard('flex');
		}
	};

	const mainContent = allLevelsData.map((item) => {
		return <LevelCard key={item.id} data={item} handler={goToLevel} />;
	});

	return (
		<div className='home'>
			<header className='header'>
				<h1>Where's Waldo</h1>
				<Button func={toggleShowLeaderboard} text={'Leaderboard'} />
			</header>
			<main className='allLevels'>{mainContent}</main>
			{showLeaderboard ? (
				<Leaderboard
					show={showLeaderboard}
					toggle={toggleShowLeaderboard}
				/>
			) : null}
		</div>
	);
};

export default Home;
