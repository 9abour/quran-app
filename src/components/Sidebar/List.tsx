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
import axios from "axios";
import { SurahType } from "../Center/Center";

interface AyahOfTheDayType {
	code: number;
	data: {
		audio: string;
		audioSecondary: string[];
		edition: {
			direction: null;
			englishName: string;
			format: string;
			identifier: string;
			language: string;
			name: string;
			type: string;
		};
		hizbQuarter: number;
		juz: number;
		manzil: number;
		number: number;
		numberInSurah: number;
		page: number;
		ruku: number;
		sajda: boolean;
		surah: SurahType;
		text: string;
	};
	status: string;
}

const List = () => {
	const [searchList, setSearchList] = useState("");
	const [ayahOfTheDay, setAyahOfTheDay] = useState<AyahOfTheDayType | null>(
		null
	);

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

		setAyahOfTheDayFunc();
	}, []);

	const today = new Date().getUTCDate();

	const randomAyahNumber = Math.floor(Math.random() * 6235);

	async function fetchAyah() {
		try {
			const res = await axios.get(
				`https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/ar.alafasy`
			);
			const { data } = res;
			localStorage.setItem("ayahOfTheDay", JSON.stringify(data));
		} catch {
			console.log(Error);
		}
	}

	const setAyahOfTheDayFunc = () => {
		const dayFromLS = localStorage.getItem("theDay");
		const ayahOfTheDayFromLS = localStorage.getItem("ayahOfTheDay");

		if (dayFromLS == null) {
			localStorage.setItem("theDay", today.toString());
		} else {
			if (today != Number(dayFromLS)) {
				localStorage.setItem("theDay", today.toString());
				fetchAyah();
			}
		}

		if (ayahOfTheDayFromLS != null) {
			setAyahOfTheDay(JSON.parse(ayahOfTheDayFromLS));
		}
	};

	const scheduleContent = (
		<div className="h-full hidden lg:block">
			<div className="bg-slate-50 rounded-md p-4">
				<Button
					text="9 FEB 21"
					customStyles="bg-primary-color hover:!bg-primary-color !text-white hover:!text-white !py-0 cursor-auto"
				/>
				<h3 className="font-semibold text-primary-gray pt-4 pb-6 w-full line-clamp-2">
					Read Al-Quran Juz 1 - Juz 2
				</h3>
				<hr />
				<span className="f-c !justify-start gap-2 text-primary-gray-2 font-semibold mt-3">
					<BiTimeFive size={25} />
					<p>07:00 AM</p>
				</span>
			</div>
			<Button
				text="Add Schedule"
				customStyles="bg-primary-color !text-white my-2 mx-auto border shadow-sm"
			/>
		</div>
	);

	const listContent = (
		<div className="h-full rounded-md p-4 bg-slate-50 hidden lg:block">
			<Input
				type="text"
				value={searchList}
				onchange={setSearchList}
				placeholder="Search..."
			/>
			<div className="px-3 mt-3 h-[calc(100%-41.33px)] overflow-y-scroll bg-slate-50 rounded-md">
				{list.map(item => (
					<Link
						href={`/read/surah/${item.number}`}
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
		<div className="flex lg:flex-col gap-2 lg:[&>div:not(:last-child)]:border-b-2">
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
					<Link href={`/list`}>
						<Button
							text="see all"
							customStyles="!bg-transparent hover:!bg-transparent !text-primary-gray hover:!text-primary"
						/>
					</Link>
				}
				content={listContent}
			/>
			{ayahOfTheDay?.status == "OK" && (
				<div className="h-[300px] flex flex-col justify-between mx-12 p-4 mt-16 bg-primary-color rounded-md">
					<div>
						<h3 className="text-sm text-center text-white text-opacity-50 font-semibold uppercase">
							Ayah of the day
						</h3>
						<p className="line-clamp-[8] mt-4 text-center text-primary-gray-3">
							{ayahOfTheDay?.data.text}
						</p>
					</div>
					<div className="w-full block text-sm text-primary-gray-3">
						<hr className="my-3" />
						<Link href={`/read/surah`}>Read Now</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default List;
