"use client";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Input() {
	const [text, setText] = useState("Hello");
	const [value] = useDebounce(text, 1000);
	const [count, setCount] = useState("");
	const [counts] = useDebounce(count, 1000);

	useEffect(() => {
		console.log(value);
	}, [value]);

	return (
		<div>
			<input
				defaultValue={"Hello"}
				onChange={(e) => {
					setText(e.target.value);
				}}
				className="text-black"
			/>
			<input
				type="text"
				onChange={(e) => {
					setCount(e.target.value);
				}}
			/>
			<p>Actual value: {text}</p>
			<p>Debounce value: {value}</p>
			<p>Actual value: {count}</p>
			<p>Debounce value: {counts}</p>
		</div>
	);
}
