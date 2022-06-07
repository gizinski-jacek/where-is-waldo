import { Link } from 'react-router-dom';
import CharacterPic from './CharacterPic';

const LevelCard = (props) => {
	const { id, pictureURL, characters } = props.data;
	const { goToLevel } = props;

	return (
		<Link to='game' className='levelCard' onClick={() => goToLevel(id)}>
			<img className='levelPicture' src={pictureURL} alt={id} />
			<div className='levelInfo'>
				<h3>{id}</h3>
				<div className='levelCharacters'>
					{characters.map((char, index) => {
						return <CharacterPic key={index} data={char} />;
					})}
				</div>
			</div>
		</Link>
	);
};
export default LevelCard;
