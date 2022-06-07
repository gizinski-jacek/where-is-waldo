const CharacterPic = ({ photoURL, name, found }) => {
	return (
		<img src={photoURL} alt={name} className={found ? 'found' : 'notFound'} />
	);
};

export default CharacterPic;
