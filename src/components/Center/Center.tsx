"use client";

import { AiFillHeart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "../UI/Button";
import Link from "next/link";

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

	const fetchSurahList = async () => {
		const res = await axios.get("https://api.alquran.cloud/v1/surah");
		const { data } = res;
		setSurahList(data.data);
	};

	useEffect(() => {
		fetchSurahList();
	}, []);

	return (
		<div className="w-[calc(100%-32px)] lg:w-[calc(100vw-360px)] h-[calc(100vh-262px)] lg:h-[calc(100vh-134px)] bg-slate-50 m-4 rounded-md lg:rounded-[3rem] mt-6 lg:mt-0 p-4">
			{surahList && (
				<div className="flex flex-wrap justify-center gap-4 h-full lg:h-[calc(100vh-262px)] overflow-y-scroll mt-[5rem]">
					{surahList.map(surah => (
						<div
							key={surah.number}
							className="w-[300px] bg-white p-4 rounded-lg"
						>
							<div className="flex justify-between items-center mb-3">
								<span className="w-[35px] h-[35px] f-c bg-[#0ca2eb] bg-opacity-10 rounded-full text-xl font-semibold text-primary-color">
									{surah.number}
								</span>
								<Button
									text=""
									icon={<AiOutlineHeart size={28} />}
									customStyles="hover:bg-transparent"
								/>
							</div>

							<Link
								href={`read/surah/${surah.number}`}
								className="w-full font-semibold"
							>
								<h3 className="text-end text-xl text-primary-gray">
									{surah.name}
								</h3>
								<h4 className="text-start text-lg text-primary-gray-2">
									{surah.englishName}
								</h4>
							</Link>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Center;
