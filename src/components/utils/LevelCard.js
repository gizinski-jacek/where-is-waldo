import { Link } from 'react-router-dom';

const LevelCard = (props) => {
	const { id, pictureURL, characters } = props.data;
	const { handler } = props;

	return (
		<div className='levelCard'>
			<Link to='game' onClick={() => handler(id)}>
				<img className='levelPicture' src={pictureURL} alt={id} />
			</Link>
			<div className='levelInfo'>
				<h3>{id}</h3>
				<div className='levelCharacters'>
					{characters.map((char, index) => {
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
};
export default LevelCard;
