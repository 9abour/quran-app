"use client";

import React, { useState } from "react";
import Input from "./Input";
import { useAppDispatch, useAppSelector } from "@/app/rtk/hooks";
import { addSchedule } from "@/app/rtk/slices/scheduleSlice";
import Alert from "./Alert";
import { AiOutlineWarning } from "react-icons/ai";
import useModalIsOpen from "@/hooks/useModalIsOpen";

const Modal = ({ modalIsOpen, setModalIsOpen }: any) => {
	const [text, setText] = useState("");
	const [date, setDate] = useState("");
	const [time, setTime] = useState("");

	const dispatch = useAppDispatch();
	const scheduleList = useAppSelector(
		state => state.scheduleSlice.scheduleList
	);

	const { isOpen, setIsOpen } = useModalIsOpen();
	let isDuplicated = false;
	scheduleList.map(item => item.text == text && (isDuplicated = true));

	const handleAddSchedule = () => {
		if ((text && date && time) != "" && !isDuplicated) {
			dispatch(addSchedule({ text, date, time, completed: false }));
			[setText, setDate, setTime].map(item => item(""));
			setModalIsOpen(false);
		} else {
			setIsOpen(true);
		}
	};

	return modalIsOpen ? (
		!isOpen ? (
			<div className="relative z-20">
				<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
						<form
							onSubmit={e => {
								e.preventDefault();
								handleAddSchedule();
							}}
							className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
						>
							<div className="px-6 py-4">
								<div className="mb-4">
									<label>Title</label>
									<Input type="text" value={text} onchange={setText} />
								</div>
								<div className="flex justify-between gap-4">
									<div className="w-full">
										<label>Date</label>
										<Input type="date" value={date} onchange={setDate} />
									</div>
									<div className="w-full">
										<label>Time</label>
										<Input type="time" value={time} onchange={setTime} />
									</div>
								</div>
							</div>
							<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
								<button
									type="submit"
									className="inline-flex w-full justify-center rounded-md bg-primary-color px-3 py-2 text-sm font-semibold text-white shadow-sm hover:!opacity-90 sm:ml-3 sm:w-auto"
								>
									Add
								</button>
								<button
									type="button"
									onClick={() => setModalIsOpen(false)}
									className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		) : (
			<Alert
				text={
					isDuplicated ? "This schedule already exists!" : "Invalid inputs!"
				}
				icon={<AiOutlineWarning size={20} />}
				isOpen={isOpen}
				setIsOpen={setIsOpen}
			/>
		)
	) : null;
};

export default Modal;
