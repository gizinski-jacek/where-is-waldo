import picture1 from '../assets/wheres-waldo-1.jpg';
import picture2 from '../assets/wheres-waldo-2.jpg';
import picture3 from '../assets/wheres-waldo-3.jpg';
import picture4 from '../assets/wheres-waldo-4.jpg';

import Waldo from '../assets/Waldo.jpg';
import Odlaw from '../assets/Odlaw.jpg';
import Wizard from '../assets/Wizard.jpg';
import Wenda from '../assets/Wenda.jpg';

const levels = [
	{
		id: 'Level 1',
		picture: picture1,
		characters: [
			{ name: 'Waldo', photo: Waldo, found: false },
			{ name: 'Odlaw', photo: Odlaw, found: false },
		],
	},
	{
		id: 'Level 2',
		picture: picture2,
		characters: [
			{ name: 'Waldo', photo: Waldo, found: false },
			{ name: 'Odlaw', photo: Odlaw, found: false },
		],
	},
	{
		id: 'Level 3',
		picture: picture3,
		characters: [
			{ name: 'Waldo', photo: Waldo, found: false },
			{ name: 'Odlaw', photo: Odlaw, found: false },
		],
	},
	{
		id: 'Level 4',
		picture: picture4,
		characters: [
			{ name: 'Waldo', photo: Waldo, found: false },
			{ name: 'Odlaw', photo: Odlaw, found: false },
		],
	},
];

export default levels;
