const TableData = (props) => {
	const { playerName, gameTime, gameStart } = props.data;
	const { index } = props;

	return (
		<tr className={`player  no${index + 1}`}>
			<td className='rankColumn'>{'#' + (index + 1)}</td>
			<td className='nameColumn'>{playerName}</td>
			<td className='timeColumn'>
				{new Date(gameTime).toISOString().substring(14, 21)}
			</td>
			<td className='datePlayedColumn'>
				{new Date(gameStart.seconds * 1000).toLocaleString().substring(0, 17)}
			</td>
		</tr>
	);
};

export default TableData;
