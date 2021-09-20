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
	const [leaderboardData, setLeaderboardData] = useState();
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
						// orderBy('timeElapsed', 'desc'),
						// orderBy('gameStart', 'desc'),
						limit(5)
					);
					await getDocs(docQuery).then((docs) => {
						const array = [];
						docs.forEach((doc) => {
							array.push(doc.data());
						});
						console.log(array);
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

	const display = leaderboardData?.map((entry) => {
		return <div className='player'></div>;
	});

	return (
		<div className='leaderboard'>
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
			fsdfasdf
		</div>
	);
};

export default Leaderboard;
