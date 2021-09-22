const Button = (props) => {
	const { id, className, func, text } = props;

	return (
		<button
			id={id ? id : null}
			className={className ? className : null}
			onClick={func ? func : null}
		>
			{text}
		</button>
	);
};

export default Button;
