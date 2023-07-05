"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import SurahCard from "../UI/SurahCard";
import SortButton from "../UI/SortButton";
import Input from "../UI/Input";
import { useAppSelector } from "@/app/rtk/hooks";
import Loading from "../Loading";

export interface SurahType {
	englishName: string;
	englishNameTranslation: string;
	name: string;
	number: number;
	numberOfAyahs: number;
	revelationType: string;
}

const Center = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [sortBtnActive, setSortBtnActive] = useState("Number");
	const [surahsListOriginal, setSurahsListOriginal] = useState<SurahType[]>([]);
	const [surahsListToShow, setSurahsListToShow] = useState<SurahType[]>([]);

	const surahsList = useAppSelector(state => state.listSlice.list);

	const fetchSurahList = async () => {
		const res = await axios.get("https://api.alquran.cloud/v1/surah");
		const { data } = res;
		setSurahsListToShow(data.data);
		setSurahsListOriginal(data.data);
	};

	useEffect(() => {
		fetchSurahList();
	}, []);

	useEffect(() => {
		localStorage.setItem("surahsList", JSON.stringify(surahsList));
	}, [surahsList]);

	useEffect(() => {
		if (sortBtnActive == "Number") {
			setSurahsListToShow(surahsListOriginal);
		} else if (sortBtnActive == "Alphabet") {
			setSurahsListToShow(prevState => {
				let sorted: SurahType[] = Object.assign([], prevState);

				sorted.sort((a, b) => a.englishName.localeCompare(b.englishName));

				return sorted;
			});
		} else {
			setSurahsListToShow(surahsList);
		}
	}, [sortBtnActive]);

	const getSearchValueResults = () => {
		if (searchValue != "") {
			if (!Number.isInteger(Number(searchValue))) {
				setSurahsListToShow(
					surahsListOriginal.filter(surah =>
						surah.englishName.toLowerCase().includes(searchValue.toLowerCase())
					)
				);
			} else {
				setSurahsListToShow(
					surahsListOriginal.filter(surah =>
						surah.number.toString().includes(searchValue)
					)
				);
			}
		} else {
			setSurahsListToShow(surahsListOriginal);
		}
	};

	useEffect(() => {
		getSearchValueResults();
	}, [searchValue]);

	return (
		<div className="w-[calc(100%-32px)] lg:w-[calc(100vw-360px)] h-[calc(100vh-262px)] lg:h-[calc(100vh-70px)] bg-slate-50 m-4 lg:m-0 rounded-md lg:rounded-lg  lg:mt-0 p-4">
			<div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-2 mx-2">
				<div className="flex gap-3 mb-3">
					{["Number", "Alphabet", "In List"].map((sortBtn, index) => (
						<SortButton
							onclick={() => setSortBtnActive(sortBtn)}
							key={index}
							text={sortBtn}
							active={sortBtnActive == sortBtn ? true : false}
						/>
					))}
				</div>
				<div className="w-full sm:w-[250px] md:w-[300px] xl:w-[500px]">
					<Input
						type="text"
						value={searchValue}
						onchange={setSearchValue}
						placeholder="Al-Baqara, 2, etc..."
					/>
				</div>
			</div>
			{surahsListToShow.length ? (
				<div className=" h-[calc(100%-64px)] lg:h-[calc(100vh-162px)] overflow-y-scroll ">
					<div className="h-fit flex flex-wrap justify-start p-3">
						{surahsListToShow.map(surah => (
							<SurahCard key={surah.number} surah={surah} />
						))}
					</div>
				</div>
			) : searchValue != "" ? (
				<h2 className="text-center">
					{" "}
					&quot;{searchValue}&quot; does not match any results!
				</h2>
			) : (
				<Loading />
			)}
		</div>
	);
};

export default Center;
