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
import Button from './Button';
import TableData from './utils/TableData';

const Leaderboard = ({ show, toggle }) => {
	const [leaderboardData, setLeaderboardData] = useState([]);
	const [sortByLevel, setSortByLevel] = useState('Level 1');

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
					console.log('Error reading data from Firebase Database: ', error);
				}
			})();
		}
	}, [sortByLevel]);

	const tableContent = leaderboardData?.map((entry, index) => {
		return <TableData key={index} data={entry} index={index} />;
	});

	return (
		<div
			className='modalLeaderboard'
			style={{ display: show }}
			onClick={toggle}
		>
			<div className='leaderboard'>
				<div className='leaderboardControls'>
					<Button
						id='Level 1'
						func={fnSetSortByLevel}
						text={'Level 1'}
						isActive={sortByLevel === 'Level 1'}
					/>
					<Button
						id='Level 2'
						func={fnSetSortByLevel}
						text={'Level 2'}
						isActive={sortByLevel === 'Level 2'}
					/>
					<Button
						id='Level 3'
						func={fnSetSortByLevel}
						text={'Level 3'}
						isActive={sortByLevel === 'Level 3'}
					/>
					<Button
						id='Level 4'
						func={fnSetSortByLevel}
						text={'Level 4'}
						isActive={sortByLevel === 'Level 4'}
					/>
				</div>
				<table>
					<tbody>
						<tr>
							<th className='rankColumn'>Place</th>
							<th className='nameColumn'>Name</th>
							<th className='timeColumn'>Time</th>
							<th className='datePlayedColumn'>Date Played</th>
						</tr>
						{tableContent}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default Leaderboard;
