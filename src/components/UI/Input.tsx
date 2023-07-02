interface PropsType {
	type: string;
	label: string;
	placeholder?: string;
	value: string;
	onchange: (e: string) => void;
	autoFocus?: boolean;
}

const Input = (props: PropsType) => {
	const { type, label, placeholder, value, onchange, autoFocus } = props;

	return (
		<div className="relative flex flex-col">
			<label className="absolute top-[-12px] mx-2 bg-[#252628] text-[#f9d3b4]">
				{label}
			</label>
			<input
				onChange={e => onchange(e.target.value)}
				type={type}
				placeholder={placeholder}
				autoFocus={autoFocus}
				className="w-full py-2 px-5 border rounded-md text-primary-gray-2 bg-slate-50 placeholder:text-primary-gray-2 outline-none focus:border-primary-gray-2"
				value={value}
			/>
		</div>
	);
};

export default Input;
