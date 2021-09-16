import { Link } from 'react-router-dom';

const Header = (props) => {
	return (
		<div className='header'>
			<h1>Where's Waldo</h1>
			<div className='headerCharacters'>
				{props.characters
					? props.characters.map((char, index) => (
							<img key={index} src={char.photo} alt={char.name} />
					  ))
					: null}
			</div>
			<Link to='/'>
				<button className='homeLink'>Home</button>
			</Link>
		</div>
	);
};

export default Header;
