import { NextResponse } from "next/server"

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)
    const flight = searchParams.get("flight")

    if (!flight) {
        return NextResponse.json(
            { error: "Flight number is required" },
            { status: 400 }
        )
    }

    const API_KEY = process.env.AVIATIONSTACK_API_KEY

    const url = `http://api.aviationstack.com/v1/flights?access_key=${API_KEY}&flight_iata=${flight}`

    try {
        const res = await fetch(url, { cache: "no-store" })
        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch flight data" },
            { status: 500 }
        )
    }
}
