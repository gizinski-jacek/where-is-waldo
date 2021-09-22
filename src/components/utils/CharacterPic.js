const CharacterPic = (props) => {
	const { photoURL, name, found } = props.data;

	return (
		<img
			src={photoURL}
			alt={name}
			className={found ? 'found' : 'notFound'}
		/>
	);
};

export default CharacterPic;
