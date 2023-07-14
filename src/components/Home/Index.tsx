"use client";

import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import SurahCard from "../UI/SurahCard";
import SortButton from "../UI/SortButton";
import Input from "../UI/Input";
import { useAppSelector } from "@/app/rtk/hooks";
import Loading from "../UI/Loading";

export interface AyahType {
	audio: string;
	audioSecondary: string[];
	hizbQuarter: number;
	juz: number;
	manzil: number;
	number: number;
	numberInSurah: number;
	page: number;
	ruku: number;
	sajda: boolean;
	text: string;
}
export interface SurahType {
	ayahs?: AyahType[];
	englishName: string;
	englishNameTranslation: string;
	name: string;
	number: number;
	numberOfAyahs: number;
	revelationType: string;
}

const Home = () => {
	const [searchValue, setSearchValue] = useState<string>("");
	const [sortBtnActive, setSortBtnActive] = useState("Number");
	const [surahsListOriginal, setSurahsListOriginal] = useState<SurahType[]>([]);
	const [surahsListToShow, setSurahsListToShow] = useState<SurahType[]>([]);
	const [searchResults, setSearchResults] = useState<SurahType[]>([]);
	const [isLoading, setIsLoading] = useState(true);

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

	const handleSelectedSortOption = useCallback(() => {
		if (sortBtnActive == "Number") {
			setSurahsListToShow(surahsListOriginal);
		} else if (sortBtnActive == "Alphabet") {
			setSurahsListToShow(() => {
				let sorted: SurahType[] = Object.assign([], surahsListOriginal);

				sorted.sort((a, b) => a.englishName.localeCompare(b.englishName));

				return sorted;
			});
		} else {
			setSurahsListToShow(surahsList);
		}

		setTimeout(() => {
			if (surahsListToShow.length) {
				setIsLoading(false);
			} else {
				setIsLoading(true);
			}
		}, 1000);
	}, [sortBtnActive]);

	useEffect(() => {
		handleSelectedSortOption();
	}, [handleSelectedSortOption]);

	useEffect(() => {
		if (!Number.isInteger(Number(searchValue))) {
			setSearchResults(
				surahsListToShow.filter(surah =>
					surah.englishName.toLowerCase().includes(searchValue.toLowerCase())
				)
			);
		} else {
			setSearchResults(
				surahsListToShow.filter(surah =>
					surah.number.toString().includes(searchValue)
				)
			);
		}
	}, [searchValue]);

	const returnList = (): SurahType[] => {
		if (searchValue == "") return surahsListToShow;
		else return searchResults;
	};

	return (
		<div className="w-full h-full bg-slate-50 lg:m-0 rounded-md lg:rounded-lg lg:mt-0 px-4">
			<div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center mr-3">
				<div className="flex gap-3 my-3">
					{["Number", "Alphabet", "In List"].map((sortBtn, index) => (
						<SortButton
							onclick={() => setSortBtnActive(sortBtn)}
							key={index}
							text={sortBtn}
							active={sortBtnActive == sortBtn ? true : false}
						/>
					))}
				</div>
				<div className="w-full sm:w-[250px] md:w-[300px] xl:w-[500px] mt-3 sm:mt-0">
					<Input
						type="text"
						value={searchValue}
						onchange={setSearchValue}
						placeholder="Al-Baqara, 2, etc..."
					/>
				</div>
			</div>
			{surahsListToShow.length ? (
				<div className="h-[calc(100%-109px)] lg:h-[calc(100vh-162px)] overflow-y-scroll">
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 justify-between gap-3 pr-3 [&:last-child]:mb-3">
						{returnList().map(surah => (
							<SurahCard key={surah.number} surah={surah} />
						))}
					</div>
				</div>
			) : searchValue != "" ? (
				<h2 className="text-center">
					{" "}
					&quot;{searchValue}&quot; does not match any results!
				</h2>
			) : isLoading ? (
				<Loading />
			) : (
				<h2 className="text-center py-6">No items!</h2>
			)}
		</div>
	);
};

export default Home;
