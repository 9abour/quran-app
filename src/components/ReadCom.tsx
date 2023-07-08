import { IoIosArrowForward } from "react-icons/io";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { AyahType, SurahType } from "./Center/Center";
import Image from "next/image";
import quranImage from "../../public/Quran.png";
import bismillahImage from "../../public/bismillah.png";
import ayahIcon from "../../public/ayah-icon.svg";
import Button from "./UI/Button";
import Link from "next/link";

const ReadCom = () => {
	const pathname = usePathname();
	let surahNumber = Number(pathname.split("/")[pathname.split("/").length - 1]);

	const [surah, setSurah] = useState<SurahType | null>(null);
	const [currentAyah, setCurrentAyah] = useState<AyahType | null>(null);
	const [currentAyahNumber, setCurrentAyahNumber] = useState(1);

	const fetchSurah = useCallback(async () => {
		try {
			const resp = await axios.get(
				`https://api.alquran.cloud/v1/surah/${surahNumber}/ar.alafasy`
			);
			const { data } = resp;
			setSurah(data.data);
			setCurrentAyah(data.data.ayahs[0]);
			setCurrentAyahNumber(data.data.ayahs[0].number);
		} catch {
			console.log(Error);
		}
	}, [surahNumber]);

	useEffect(() => {
		fetchSurah();
	}, [fetchSurah]);

	return (
		<div className="container mx-auto px-4 lg:py-14">
			{surah && (
				<>
					<div className="flex justify-between items-center bg-gradient-to-l from-primary-color-5 to-primary-color max-w-[70rem] w-full h-40 rounded-tl-lg rounded-tr-lg mx-auto text-white p-4">
						<div className="p-3">
							<h2 className="text-2xl font-semibold">
								{surah?.name} - {surah?.englishName}
							</h2>
							<p className="text-xl mb-2">{surah?.englishNameTranslation}</p>
							<p className="text-lg !text-gray-200">
								{surah?.numberOfAyahs} Ayahs
							</p>
						</div>
						<div>
							<Image
								src={quranImage}
								alt="quranImage"
								quality={100}
								width={300}
								height={300}
								className="hidden md:block mb-8"
							/>
						</div>
					</div>
					<div className="max-w-[70rem] mx-auto h-[100vh-100px] bg-slate-50 rounded-bl-lg rounded-br-lg mb-4">
						<div className="flex justify-between items-center p-4 text-primary-gray">
							<h3 className="text-xl font-semibold w-full">
								{surah.englishName}
							</h3>
							<div className="text-center w-full">
								<h5 className="text-lg font-semibold">{surah.name}</h5>
								<h5>{surah.englishNameTranslation}</h5>
							</div>
							<h3 className="text-xl font-semibold w-full text-end">
								Ayah {currentAyahNumber}
							</h3>
						</div>
						<div className="w-full mt-8">
							<Image
								src={bismillahImage}
								alt="bismillahImage"
								quality={100}
								width={150}
								height={150}
								className="mx-auto"
							/>
						</div>
						<div
							className="min-h-[20rem] max-h-[35rem] text-2xl text-center font-semibold text-primary-gray mt-8 overflow-y-scroll bg-gradient-to-t from-primary-color-6 pb-[4rem]"
							dir="rtl"
						>
							{surah.ayahs?.map((ayah: AyahType) => (
								<Fragment key={ayah.number}>
									<h1
										className={`inline-block h-[50px] ${
											currentAyahNumber == ayah.number && "text-primary-color"
										} hover:text-primary-color cursor-pointer`}
										onClick={() => {
											setCurrentAyahNumber(ayah.number);
											setCurrentAyah(ayah);
										}}
									>
										{ayah.text}
									</h1>
									<div className="relative w-[50px] h-[50px] inline-block">
										<span className="absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-sm font-bold">
											{ayah.number}
										</span>
										<Image
											src={ayahIcon}
											alt="ayahIcon"
											width={50}
											height={50}
										/>
									</div>
								</Fragment>
							))}
						</div>
						<div className="relative border-t-2 p-4 block md:flex justify-between items-center bg-gradient-to-r from-primary-color-5 to-primary-color">
							<div className="absolute w-full h-[4em] left-0 top-[-66px] bg-gradient-to-t from-primary-gray z-10" />
							<div className="flex items-center gap-2 w-6/12">
								<Link
									href={
										surahNumber <= 1 ? "/" : `/read/surah/${surahNumber - 1}`
									}
								>
									<Button
										text="Prev"
										icon={<IoIosArrowBack />}
										customStyles="bg-white !text-primary-color border px-8 py-2 text-xl"
									/>
								</Link>
								<Link
									href={
										surahNumber >= 114 ? "/" : `/read/surah/${surahNumber + 1}`
									}
								>
									<Button
										text="Next"
										icon={<IoIosArrowForward />}
										customStyles="bg-white !text-primary-color border px-8 py-2 text-xl flex-row-reverse"
									/>
								</Link>
							</div>
							<div className="w-full h-[45px] md:w-6/12">
								<audio
									className="w-full h-full"
									src={`${currentAyah?.audio}`}
									controls
								/>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default ReadCom;
