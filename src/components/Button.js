const Button = ({ id, cta, text, isActive }) => {
	return (
		<button
			id={id ? id : null}
			className={isActive ? 'isActive' : null}
			onClick={cta ? cta : null}
		>
			{text}
		</button>
	);
};

export default Button;
