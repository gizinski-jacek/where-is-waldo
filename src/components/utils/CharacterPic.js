const CharacterPic = ({ data }) => {
	return (
		<img
			src={data.photoURL}
			alt={data.name}
			className={data.found ? 'found' : 'notFound'}
		/>
	);
};

export default CharacterPic;
