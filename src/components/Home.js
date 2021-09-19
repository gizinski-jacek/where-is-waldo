import { Link } from 'react-router-dom';

const Home = (props) => {
	const { allLevelsData, goToLevel } = props;

	const display = allLevelsData.map((item) => {
		return (
			<div key={item.id} className='preview'>
				<Link to='game' onClick={() => goToLevel(item.id)}>
					<img
						className='levelPreview'
						src={item.pictureURL}
						alt={item.id}
					/>
				</Link>
				<div className='levelInfo'>
					<h3>{item.id}</h3>
					<div className='infoCharacters'>
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

	return (
		<div className='home'>
			<div className='header'>
				<h1>Where's Waldo</h1>
			</div>
			<div className='allLevels'>{display}</div>
		</div>
	);
};

export default Home;
