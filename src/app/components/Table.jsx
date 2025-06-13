import { memo } from "react";
import Paragraph from "./Paragraph";

function Table({ columns, rows, onRowChange }) {
	function handleUpdateCell(newText, col, elIndex, rowIndex) {
		let newRows = [...rows];
		newRows[rowIndex][col].content[elIndex].text = newText;
		onRowChange(newRows);
	}
	return (
		<>
			<h3 className="text-center text-xl">Table </h3>
			<table className="table-fixed w-full border border-gray-300">
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={index} className="border border-gray-300">
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, rowIndex) => (
						<tr key={rowIndex} className="">
							{columns.map((col) => (
								<td
									key={col}
									className="border border-gray-300 px-4 py-2"
								>
									{row[col].content.map((el, elIndex) => (
										<Paragraph
											key={elIndex + el.txt}
											text={el.text}
											onChangeText={(newText) =>
												handleUpdateCell(
													newText,
													col,
													elIndex,
													rowIndex
												)
											}
										/>
									))}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
}

export default memo(Table);
