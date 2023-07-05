"use client";

import { BsArrowRightShort } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useAppDispatch, useAppSelector } from "@/app/rtk/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { updateSurahsList } from "@/app/rtk/slices/listSlice";

const List = () => {
	const [searchList, setSearchList] = useState("");

	const list = useAppSelector(state => state.listSlice.list);

	const pathname = usePathname();

	const surahNumber = Number(
		pathname.split("/")[pathname.split("/").length - 1]
	);

	const dispatch = useAppDispatch();

	useEffect(() => {
		// Get surahs list form local storage and insert it to redux state
		const surahsListFromLS = localStorage.getItem("surahsList");

		if (surahsListFromLS != null) {
			dispatch(updateSurahsList(JSON.parse(surahsListFromLS)));
		}
	}, []);

	const scheduleContent = (
		<div className="bg-slate-50 rounded-md p-4 h-full">
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
				<Button
					text="Add Schedule"
					customStyles="bg-primary-color !text-white mt-8 mx-auto border shadow-sm"
				/>
			</>
		</div>
	);

	const listContent = (
		<div className="rounded-md p-4 bg-slate-50 h-full">
			<Input
				type="text"
				value={searchList}
				onchange={setSearchList}
				placeholder="Search..."
			/>
			<div className="px-3 mt-3 h-[calc(100%-41.33px)] overflow-y-scroll bg-slate-50 rounded-md">
				{list.map(item => (
					<Link
						href={`read/surah/${item.number}`}
						key={item.number}
						className={`flex justify-between items-center text-primary-gray-2 p-2 cursor-pointer hover:!text-primary-color ${
							surahNumber == item.number && "!text-primary-color"
						} rounded-md transition`}
					>
						<h3 className="font-semibold">{item.englishName}</h3>
						<BsArrowRightShort size={25} />
					</Link>
				))}
			</div>
		</div>
	);

	return (
		<div className="h-full flex lg:flex-col gap-2">
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
