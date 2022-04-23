const Button = (props) => {
	const { id, func, text, isActive } = props;

	return (
		<button
			id={id ? id : null}
			className={isActive ? 'isActive' : null}
			onClick={func ? func : null}
		>
			{text}
		</button>
	);
};

export default Button;
