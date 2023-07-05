import Link from "next/link";
import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";

interface Props {
	linkName: string;
	link: string;
	icon?: ReactNode;
}

const NavLink = (props: Props) => {
	const { linkName, link, icon } = props;

	const currentPathname = usePathname();

	return (
		<Link
			className={`text-primary-gray-2 capitalize f-c gap-1 hover:bg-slate-100 hover:!text-primary-color px-3 py-2 rounded-md transition ${
				(link == currentPathname.slice(1) || link == currentPathname) &&
				"bg-slate-100 !text-primary-color"
			}`}
			href={link}
		>
			{icon}
			<span className={`text-lg font-semibold min-h-full`}>{linkName}</span>
		</Link>
	);
};

export default NavLink;
