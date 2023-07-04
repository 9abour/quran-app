interface PropsType {
	type: string;
	placeholder?: string;
	value: string;
	onchange: (e: string) => void;
	autoFocus?: boolean;
}

const Input = (props: PropsType) => {
	const { type, placeholder, value, onchange, autoFocus } = props;

	return (
		<input
			onChange={e => onchange(e.target.value)}
			type={type}
			placeholder={placeholder}
			autoFocus={autoFocus}
			className="w-full py-2 px-5 border rounded-md text-primary-gray-2 bg-white placeholder:text-primary-gray-2 outline-none focus:border-primary-gray-2"
			value={value}
		/>
	);
};

export default Input;
