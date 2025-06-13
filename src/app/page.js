"use client";

import Paragraph from "./components/Paragraph";
import List from "./components/List";
import { useState, useEffect, useCallback } from "react";
import Table from "./components/Table";
import EmptyDocument from "./components/EmptyDocument";

export default function Home() {
	const [document, setDocument] = useState({});

	useEffect(() => {
		fetch("/document.json")
			.then((res) => res.json())
			.then((data) => setDocument(data))
			.catch((err) => console.error(err));
	}, []);

	async function logToBackend(doc) {
		try {
			await fetch("/api/log", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(doc)
			});
		} catch (err) {
			console.error("Error logging document to backend: ", err);
		}
	}

	function updateSection(index, newSection) {
		setDocument((prevDoc) => {
			let newDoc = {
				...prevDoc,
				sections: [
					...prevDoc.sections.map((section, i) =>
						i === index ? newSection : section
					)
				]
			};
			logToBackend(newDoc);
			return newDoc;
		});
	}

	return (
		<div className="relative grid min-h-screen grid-cols-[1fr_2.5rem_auto_2.5rem_1fr] grid-rows-[1fr_1px_auto_1px_1fr] ">
			<div className="col-start-3 row-start-3 flex max-w-lg flex-col bg-gray-100 p-2 ">
				<div className="rounded-xl bg-white p-10 text-sm/7 text-gray-700">
					<h1 className="text-center text-3xl my-3">
						{document && document.title}
					</h1>
					{document.sections ? (
						document.sections.map((section, index) => {
							switch (section.kind) {
								case "paragraph":
									return (
										<Paragraph
											key={index}
											text={section.text}
											onChangeText={(newText) =>
												handleUpdateSection(index, {
													...section,
													text: newText
												})
											}
										/>
									);

								case "list":
									return (
										<List
											key={index}
											elements={section.elements}
											onElementChange={(newElement) =>
												handleUpdateSection(index, {
													...section,
													elements: newElement
												})
											}
										/>
									);

								case "table":
									return (
										<Table
											key={index}
											columns={section.columns}
											rows={section.rows}
											onRowChange={(newRows) =>
												handleUpdateSection(index, {
													...section,
													rows: newRows
												})
											}
										/>
									);

								default:
									return null;
							}
						})
					) : (
						<EmptyDocument />
					)}
				</div>
			</div>
		</div>
	);
}
