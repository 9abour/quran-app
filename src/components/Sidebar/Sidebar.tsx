"use client";

import { IoIosArrowDroprightCircle } from "react-icons/io";
import { IoIosArrowDropleftCircle } from "react-icons/io";
import { BsArrowRightShort, BsCheckAll } from "react-icons/bs";
import { BiCheckbox, BiTimeFive } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { useAppDispatch, useAppSelector } from "@/app/rtk/hooks";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { updateSurahsList } from "@/app/rtk/slices/listSlice";
import axios from "axios";
import { SurahType } from "../Home/Index";
import useModalIsOpen from "@/hooks/useModalIsOpen";
import Modal from "../UI/Modal";
import { setScheduleFromLS } from "@/app/rtk/slices/scheduleSlice";

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

const Sidebar = () => {
	const [searchListValue, setSearchListValue] = useState("");
	const [ayahOfTheDay, setAyahOfTheDay] = useState<AyahOfTheDayType | null>(
		null
	);

	const list = useAppSelector(state => state.listSlice.list);
	const [listToShow, setListToShow] = useState<SurahType[]>(list && list);
	const [scheduleNumber, setScheduleNumber] = useState(0);

	const pathname = usePathname();

	const surahNumber = Number(
		pathname.split("/")[pathname.split("/").length - 1]
	);

	const dispatch = useAppDispatch();
	const scheduleList = useAppSelector(
		state => state.scheduleSlice.scheduleList
	);

	const [currentSchedule, setCurrentSchedule] = useState(
		scheduleList[scheduleNumber]
	);

	useEffect(() => {
		setCurrentSchedule(scheduleList[scheduleNumber]);
	}, [scheduleList, scheduleNumber]);

	const { isOpen, setIsOpen } = useModalIsOpen();

	useEffect(() => {
		// Get surahs list form local storage and insert it to redux state
		const surahsListFromLS = localStorage.getItem("surahsList");

		if (surahsListFromLS != null) {
			dispatch(updateSurahsList(JSON.parse(surahsListFromLS)));
		}

		setAyahOfTheDayFunc();
		dispatch(setScheduleFromLS());
	}, []);

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
		const today = new Date().getUTCDate();

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

	useEffect(() => {
		const searchResults = list.filter(surah =>
			surah.englishName.toLowerCase().includes(searchListValue.toLowerCase())
		);
		setListToShow(searchResults);
	}, [searchListValue]);

	useEffect(() => {
		if (list) {
			setListToShow(list);
		}
	}, [list]);

	const scheduleContent = currentSchedule ? (
		<div className="lg:block mb-3 lg:mb-0">
			<div
				className={`${
					currentSchedule.completed
						? "bg-green-100 border-2 !border-green-400"
						: "bg-slate-50"
				} rounded-md p-4 border-2 border-transparent`}
			>
				<div className="flex justify-between items-center">
					<h4 className="px-2 bg-primary-color w-fit rounded-md text-white !py-0">
						{currentSchedule.date}
					</h4>
					<span className="w-[35px] h-[35px] f-c bg-[#0ca2eb] bg-opacity-10 rounded-full text-xl font-semibold text-primary-color">
						{scheduleNumber + 1}
					</span>
				</div>
				<h3
					className={`font-semibold text-primary-gray pt-4 pb-6 w-full line-clamp-2 ${
						currentSchedule.completed && "line-through"
					}`}
				>
					{currentSchedule.text}
				</h3>
				<hr />
				<div className="min-h-[30px] flex justify-between items-center mt-3">
					<span className="f-c !justify-start gap-2 text-primary-gray-2 font-semibold">
						<BiTimeFive size={25} />
						<p>{currentSchedule.time}</p>
					</span>
					{currentSchedule.completed && (
						<BsCheckAll className="text-primary-color" size={30} />
					)}
				</div>
			</div>
			<div className="f-c mt-2">
				<Button
					text=""
					icon={<IoIosArrowDropleftCircle size={25} />}
					onclick={() => {
						if (scheduleNumber > 0) {
							setScheduleNumber(prev => prev - 1);
						}
					}}
				/>
				<Button
					text="Add Schedule"
					customStyles="bg-primary-color !text-white mx-auto border shadow-sm"
					onclick={() => {
						setIsOpen(true);
					}}
				/>
				<Button
					text=""
					icon={<IoIosArrowDroprightCircle size={25} />}
					onclick={() => {
						if (scheduleNumber < scheduleList.length - 1) {
							setScheduleNumber(prev => prev + 1);
						}
					}}
				/>
			</div>
		</div>
	) : (
		<>
			<h3 className="text-center">There is no schedule, click to add one.</h3>
			<Button
				text="Add Schedule"
				customStyles="bg-primary-color !text-white mt-2 mx-auto border shadow-sm"
				onclick={() => {
					setIsOpen(true);
				}}
			/>
		</>
	);

	const listContent = list.length ? (
		<div className="h-[calc(100%-61px)] rounded-md hidden lg:block">
			<Input
				type="text"
				value={searchListValue}
				onchange={setSearchListValue}
				placeholder="Search..."
			/>
			<div className="h-[280px] px-3 overflow-y-scroll bg-slate-50 rounded-md mt-3">
				{listToShow.map(surah => (
					<Link
						href={`/read/surah/${surah.number}`}
						key={surah.number}
						className={`flex justify-between items-center text-primary-gray-2 p-2 cursor-pointer hover:!text-primary-color ${
							surahNumber == surah.number && "!text-primary-color"
						} rounded-md transition`}
					>
						<h3 className="font-semibold">{surah.englishName}</h3>
						<BsArrowRightShort size={25} />
					</Link>
				))}
			</div>
		</div>
	) : (
		<h3 className="text-center">There is no items.</h3>
	);

	return (
		<>
			<Modal modalIsOpen={isOpen} setModalIsOpen={setIsOpen} />
			<div className="w-full lg:w-[350px] bg-white py-4 px-4 lg:pl-4">
				<div className="flex-col lg:flex-col gap-2 lg:[&>div:not(:last-child)]:pb-3">
					<Card
						title="Schedule"
						button={
							<Link href="/schedule">
								<Button
									text="see all"
									customStyles="!bg-transparent hover:!bg-transparent !text-primary-gray hover:!text-primary"
								/>
							</Link>
						}
						content={scheduleContent}
					/>
					<hr />
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
					<hr />
					{ayahOfTheDay?.status == "OK" && (
						<div className="w-full flex flex-col justify-between mx-0 mt-3 p-4 bg-primary-color rounded-md">
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
								<Link
									href={`/read/surah/${ayahOfTheDay?.data.surah.number}`}
									className="inline-flex items-center [&:hover>svg]:ml-1"
								>
									Read Now <BsArrowRightShort size={20} />
								</Link>
							</div>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Sidebar;
