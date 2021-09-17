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
			{
				name: 'Waldo',
				photo: Waldo,
				coords: { X: 1125, Y: 95 },
				found: false,
			},
			{
				name: 'Odlaw',
				photo: Odlaw,
				coords: { X: 70, Y: 770 },
				found: false,
			},
		],
	},
	{
		id: 'Level 2',
		picture: picture2,
		characters: [
			{
				name: 'Waldo',
				photo: Waldo,
				coords: { X: 670, Y: 220 },
				found: false,
			},
			{
				name: 'Wenda',
				photo: Wenda,
				coords: { X: 315, Y: 335 },
				found: false,
			},
			{
				name: 'Wizard',
				photo: Wizard,
				coords: { X: 970, Y: 175 },
				found: false,
			},
		],
	},
	{
		id: 'Level 3',
		picture: picture3,
		characters: [
			{
				name: 'Waldo',
				photo: Waldo,
				coords: { X: 695, Y: 355 },
				found: false,
			},
			{
				name: 'Wenda',
				photo: Wenda,
				coords: { X: 1005, Y: 400 },
				found: false,
			},
		],
	},
	{
		id: 'Level 4',
		picture: picture4,
		characters: [
			{
				name: 'Wenda',
				photo: Wenda,
				coords: { X: 1060, Y: 765 },
				found: false,
			},
		],
	},
];

export default levels;
