"use client";

import { BsArrowRightShort } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import React, { useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

const List = () => {
	const [searchList, setSearchList] = useState("");

	const scheduleContent = (
		<div className="bg-slate-50 rounded-md p-4 h-[200px]">
			<>
				<Button
					text="9 FEB 21"
					customStyles="bg-primary-color hover:!bg-primary-color !text-white hover:!text-white py-1 cursor-auto"
				/>
				<h3 className="font-semibold text-primary-gray pt-4 pb-6 w-full line-clamp-2">
					Read Al-Quran Juz 1 - Juz 2
				</h3>
				<hr />
				<span className="f-c !justify-start gap-2 text-primary-gray-2 font-semibold mt-3">
					<BiTimeFive size={25} />
					<p>07:00 AM</p>
				</span>
			</>
		</div>
	);

	const listContent = (
		<div className="rounded-md p-4 h-[200px]">
			<Input
				type="text"
				label=""
				value={searchList}
				onchange={setSearchList}
				placeholder="Search..."
			/>
			<div className="px-3 mt-3 h-[130px] lg:h-[30rem] overflow-y-scroll bg-slate-50 rounded-md">
				{Array.from(Array(20)).map(item => (
					<div
						key={item}
						className="flex justify-between items-center text-primary-gray-2 p-2 cursor-pointer hover:bg-slate-50 rounded-md transition"
					>
						<h3 className="font-semibold">Item</h3>
						<BsArrowRightShort size={25} />
					</div>
				))}
			</div>
		</div>
	);

	return (
		<div className="flex lg:flex-col gap-2">
			<Card
				title="Schedule"
				button={
					<Button
						text="see all"
						customStyles="!bg-transparent hover:!bg-transparent !text-primary-gray hover:!text-primary"
					/>
				}
				content={scheduleContent}
			/>

			<Card
				title="List"
				button={
					<Button
						text="see all"
						customStyles="!bg-transparent hover:!bg-transparent !text-primary-gray hover:!text-primary"
					/>
				}
				content={listContent}
			/>
		</div>
	);
};

export default List;
