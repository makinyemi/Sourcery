export async function POST(req) {
	const body = await req.json();
	console.log("Updated Document:", JSON.stringify(body));
	return new Response(
		JSON.stringify({ message: "Updated Document received." }),
		{ status: 200, headers: { "Content-Type": "application/json" } }
	);
}
