const Game = (props) => {
	const {
		level,
		image,
		characters,
		showcontextMenu,
		onImageClick,
		onContextMenuClick,
	} = props;

	const chars = characters.map((char, index) => {
		return (
			<div id={char.name} key={index} onClick={onContextMenuClick}>
				<img src={char.photo} alt={char.name} />
				<h4>{char.name}</h4>
			</div>
		);
	});

	return (
		<div className='game' onClick={onImageClick}>
			<div
				className='contextMenu'
				style={{ display: showcontextMenu ? 'block' : 'none' }}
			>
				{chars}
			</div>
			<img className='gameLevel' src={image} alt={level} />
		</div>
	);
};

export default Game;
