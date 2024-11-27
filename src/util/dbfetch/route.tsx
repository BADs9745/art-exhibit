export async function GET() {
	const res = {
		title: "Testing the route",
		content: "Guguguggaga",
	};
	return Response.json(res);
}

// export async function HEAD(request: Request) {}

// export async function POST(request: Request) {}

// export async function PUT(request: Request) {}

// export async function DELETE(request: Request) {}

// export async function PATCH(request: Request) {}
