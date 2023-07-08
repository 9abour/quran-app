"use client";

import { IoIosArrowForward } from "react-icons/io";
import { useAppDispatch, useAppSelector } from "@/app/rtk/hooks";
import Link from "next/link";
import React from "react";
import Button from "../UI/Button";
import { removeSurah } from "@/app/rtk/slices/listSlice";

const Index = () => {
	const list = useAppSelector(state => state.listSlice.list);
	const dispatch = useAppDispatch();

	return (
		<div className="w-[calc(100%-32px)] lg:w-[calc(100vw-360px)] mx-auto">
			<div className="flex flex-wrap justify-center items-center gap-4">
				{list.map(surah => (
					<div
						key={surah.number}
						className="w-[400px] h-[150px] flex bg-slate-200 rounded-md text-white text-lg font-semibold text-start"
					>
						<div className="w-5/12 h-full flex flex-col justify-between rounded-md bg-primary-color p-3">
							<div>
								<h4 className="w-fit text-sm text-slate-200 font-normal bg-primary-color-2 rounded-full px-3 line-clamp-1 mb-3">
									{surah.number}
								</h4>
								<h2>{surah.name}</h2>
							</div>
							<Link
								href={`/read/surah/${surah.number}`}
								className="w-fit items-end text-start text-sm text-slate-200 hover:text-slate-100 font-normal rounded-full line-clamp-1 mb-3 flex transition"
							>
								<span className="line-clamp-1">Read {surah.englishName}</span>
								<IoIosArrowForward size={18} />
							</Link>
						</div>
						<div className="w-7/12 h-full flex flex-col justify-between p-3 text-primary-color">
							<div>
								<h2>{surah.englishName}</h2>
								<h2 className="text-sm text-primary-gray-2 font-medium">
									{surah.englishNameTranslation}
								</h2>
								<h2 className="text-primary-gray-2 font-medium">
									{surah.numberOfAyahs} Ayahs
								</h2>
							</div>
							<Button
								text="Remove"
								customStyles="w-[6rem] bg-red-500 text-white hover:!text-white hover:bg-red-600 mt-3 px-[1rem] ml-auto"
								onclick={() => dispatch(removeSurah(surah))}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Index;
