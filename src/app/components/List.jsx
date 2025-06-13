import { memo } from "react";
import Paragraph from "./Paragraph";

function List({ elements, onElementChange }) {
	function handleElementChange(newText, index) {
		let newElement = [
			...elements.map((element, i) =>
				index === i ? { ...element, text: newText } : element
			)
		];

		onElementChange(newElement);
	}
	return (
		<>
			<h3 className="text-center text-xl">List</h3>
			<ul className="list-disc px-10 py-5 mx-2 bg-gray-300 rounded-lg">
				{elements.map((paragraph, index) => (
					<li key={index}>
						<Paragraph
							text={paragraph.text}
							onChangeText={(newText) =>
								handleElementChange(newText, index)
							}
						/>
					</li>
				))}
			</ul>
		</>
	);
}

export default memo(List);
