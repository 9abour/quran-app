"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import SurahCard from "../UI/SurahCard";
import SortButton from "../UI/SortButton";
import Input from "../UI/Input";

export interface SurahType {
	englishName: string;
	englishNameTranslation: string;
	name: string;
	number: number;
	numberOfAyahs: number;
	revelationType: string;
}

const Center = () => {
	const [surahList, setSurahList] = useState<SurahType[]>([]);
	const [searchValue, setSearchValue] = useState("");
	const [sortBtnActive, setSortBtnActive] = useState("Number");

	const fetchSurahList = async () => {
		const res = await axios.get("https://api.alquran.cloud/v1/surah");
		const { data } = res;
		setSurahList(data.data);
	};

	useEffect(() => {
		fetchSurahList();
	}, []);

	return (
		<div className="w-[calc(100%-32px)] lg:w-[calc(100vw-360px)] h-[calc(100vh-262px)] lg:h-[calc(100vh-134px)] bg-slate-50 m-4 lg:m-0 rounded-md lg:rounded-lg mt-6 lg:mt-0 p-4">
			<div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-2 mx-2">
				<div className="flex gap-3">
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
			{surahList && (
				<div className="flex flex-wrap justify-start h-[calc(100%-64px)] lg:h-[calc(100vh-215px)] overflow-y-scroll ">
					{surahList.map(surah => (
						<SurahCard key={surah.number} surah={surah} />
					))}
				</div>
			)}
		</div>
	);
};

export default Center;
