const LevelFinished = (props) => {
	const { time, name, handleChange, submitScore } = props;

	const handleFocus = (event) => event.target.select();

	return (
		<div className='modalUserWin'>
			<span>
				<p>You found them all!</p>
				<p>You time was: </p>
				<p style={{ color: 'rgb(0, 200, 0)' }}>
					{new Date(time).toISOString().substr(14, 7)}
					{/* Version without milliseconds */}
					{/* {new Date(time * 1000).toISOString().substr(14, 5)} */}
				</p>
				<p>What is your name?</p>
				<input
					id='usernameInput'
					type='text'
					maxLength='12'
					value={name}
					onChange={handleChange}
					onFocus={handleFocus}
					autoFocus
				/>
				<button onClick={submitScore}>Submit Score</button>
			</span>
		</div>
	);
};

export default LevelFinished;
