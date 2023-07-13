"use client";

import React, { useState, useEffect, useCallback } from "react";
import { SurahType } from "../Home/Index";
import Button from "./Button";
import Link from "next/link";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/app/rtk/hooks";
import { addSurah, removeSurah } from "@/app/rtk/slices/listSlice";

type PropsType = {
	surah: SurahType;
};

const SurahCard = (props: PropsType) => {
	const { number, name, englishName } = props.surah;

	const [isSurahInList, setIsSurahInList] = useState<boolean | null>(null);

	const state = useAppSelector(state => state.listSlice);
	const dispatch = useAppDispatch();

	const handleAddToList = (surah: any) => {
		dispatch(addSurah(surah));
	};

	const handleRemoveFromList = (surah: any) => {
		dispatch(removeSurah(surah));
	};

	const checkIfSurahInTheList = useCallback((): boolean => {
		let isDuplicated = false;

		state.list.map(
			(surah: SurahType) => surah.number == number && (isDuplicated = true)
		);

		return isDuplicated;
	}, [state.list, number]);

	useEffect(() => {
		setIsSurahInList(checkIfSurahInTheList());
	}, [checkIfSurahInTheList]);

	return (
		<div className="w-full py-6 bg-white px-4 rounded-lg drop-shadow-sm">
			<div className="flex justify-between items-center mb-3">
				<span className="w-[35px] h-[35px] f-c bg-[#0ca2eb] bg-opacity-10 rounded-full text-xl font-semibold text-primary-color">
					{number}
				</span>
				<Button
					onclick={() =>
						isSurahInList
							? handleRemoveFromList(props.surah)
							: handleAddToList(props.surah)
					}
					text=""
					icon={
						isSurahInList ? (
							<AiFillHeart size={28} className="text-primary-color" />
						) : (
							<AiOutlineHeart size={28} />
						)
					}
					customStyles="hover:bg-transparent"
				/>
			</div>
			<Link
				href={`read/surah/${number}`}
				className="w-full font-semibold [&>*]:hover:!text-primary-color"
			>
				<h3 className="text-end text-xl text-primary-gray amiri-family">
					{name}
				</h3>
				<h4 className="text-start text-lg text-primary-gray-2">
					{englishName}
				</h4>
			</Link>
		</div>
	);
};

export default SurahCard;
