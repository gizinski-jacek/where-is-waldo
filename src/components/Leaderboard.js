import { useEffect, useState } from 'react';
import {
	collection,
	getFirestore,
	getDocs,
	query,
	where,
	orderBy,
	limit,
} from 'firebase/firestore';

const Leaderboard = () => {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [sortByLevel, setSortByLevel] = useState();

	const fnSetSortByLevel = (e) => {
		const { id } = e.target;
		setSortByLevel(id);
	};

	useEffect(() => {
		if (sortByLevel) {
			(async () => {
				try {
					const docQuery = query(
						collection(getFirestore(), 'usersGames'),
						where('levelData.id', '==', sortByLevel),
						orderBy('gameTime', 'asc'),
						orderBy('gameEnd', 'asc'),
						orderBy('gameStart', 'asc'),
						limit(15)
					);
					await getDocs(docQuery).then((docs) => {
						const array = [];
						docs.forEach((doc) => {
							array.push(doc.data());
						});
						setLeaderboardData(array);
					});
				} catch (error) {
					console.log(
						'Error reading data from Firebase Database: ',
						error
					);
				}
			})();
		}
	}, [sortByLevel]);

	const display = leaderboardData?.map((entry, index) => {
		console.log(entry.gameEnd);
		return (
			<tr key={index} className={`player  no${index + 1}`}>
				<td className='rankColumn'>{'#' + (index + 1)}</td>
				<td className='nameColumn'>{entry.playerName}</td>
				<td className='timeColumn'>
					{new Date(entry.gameTime).toISOString().substr(14, 7)}
					{/* Version without milliseconds */}
					{/* {new Date(entry.gameTime).toISOString().substr(14, 5)} */}
				</td>
				<td className='datePlayedColumn'>
					{new Date(entry.gameStart.seconds * 1000)
						.toLocaleString()
						.substr(0, 17)}
				</td>
			</tr>
		);
	});

	return (
		<div className='leaderboard'>
			<div className='leaderboardControls'>
				<button id='Level 1' onClick={fnSetSortByLevel}>
					Level 1
				</button>
				<button id='Level 2' onClick={fnSetSortByLevel}>
					Level 2
				</button>
				<button id='Level 3' onClick={fnSetSortByLevel}>
					Level 3
				</button>
				<button id='Level 4' onClick={fnSetSortByLevel}>
					Level 4
				</button>
			</div>
			<table>
				<tbody>
					<tr>
						<th className='rankColumn'>Place</th>
						<th className='nameColumn'>Name</th>
						<th className='timeColumn'>Time</th>
						<th className='datePlayedColumn'>Date Played</th>
					</tr>
					{display}
				</tbody>
			</table>
		</div>
	);
};

export default Leaderboard;
