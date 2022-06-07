import { useState } from 'react';
import Leaderboard from './Leaderboard';
import Button from './Button';
import LevelCard from './utils/LevelCard';

const Home = ({ allLevelsData, goToLevel }) => {
	const [showLeaderboard, setShowLeaderboard] = useState('none');

	const toggleLeaderboard = (e) => {
		if (e.target.className === 'modalLeaderboard') {
			setShowLeaderboard('none');
		} else {
			setShowLeaderboard('flex');
		}
	};

	const mainContent = allLevelsData.map((item) => {
		return <LevelCard key={item.id} data={item} goToLevel={goToLevel} />;
	});

	return (
		<div className='home'>
			<header className='header'>
				<h1>Where's Waldo</h1>
				<Button cta={toggleLeaderboard} text={'Leaderboard'} />
			</header>
			<main className='allLevels'>{mainContent}</main>
			{showLeaderboard ? (
				<Leaderboard show={showLeaderboard} toggle={toggleLeaderboard} />
			) : null}
		</div>
	);
};

export default Home;
