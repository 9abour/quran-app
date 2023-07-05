import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const ReadCom = () => {
	const pathname = usePathname();
	const surahNumber = pathname.split("/")[pathname.split("/").length - 1];

	console.log();
	const [surah, setSurah] = useState(null);

	const fetchSurah = useCallback(async () => {
		try {
			const resp = await axios.get(
				`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`
			);
			const { data } = resp;
			setSurah(data);
		} catch {
			console.log(Error);
		}
	}, [surahNumber]);

	useEffect(() => {
		fetchSurah();
	}, [fetchSurah]);
	return <div></div>;
};

export default ReadCom;
