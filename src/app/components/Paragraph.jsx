"use client";

import { useState, memo } from "react";

function Paragraph({ text, onChangeText }) {
	const [isEditing, setIsEditing] = useState(false);
	const [localText, setLocalText] = useState(text);

	function handleBlur() {
		setIsEditing(false);
		onChangeText(localText);
	}
	return (
		<div className="">
			{isEditing ? (
				<input
					value={localText}
					onChange={(e) => setLocalText(e.target.value)}
					onBlur={handleBlur}
					autoFocus
				/>
			) : (
				<p onClick={() => setIsEditing(true)}>{localText}</p>
			)}
		</div>
	);
}

export default memo(Paragraph);
