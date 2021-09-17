import { Link } from 'react-router-dom';

const Home = (props) => {
	const { allLevels, goToLevel } = props;

	const display = allLevels.map((item) => {
		return (
			<div key={item.id} className='preview'>
				<Link to='game' id={item.id} onClick={goToLevel}>
					<img
						className='levelPreview'
						src={item.picture}
						alt={item.id}
					/>
					<div className='levelInfo'>
						<h3>{item.id}</h3>
						<div className='infoCharacters'>
							{item.characters.map((char, index) => {
								return (
									<img
										key={index}
										src={char.photo}
										alt={char.name}
									/>
								);
							})}
						</div>
					</div>
				</Link>
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
