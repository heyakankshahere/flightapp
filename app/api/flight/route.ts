import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const flight_iata = searchParams.get("flight_iata");

    if (!flight_iata) {
        return NextResponse.json({ error: "Missing flight_iata parameter" }, { status: 400 });
    }

    const apiKey = process.env.AVIATIONSTACK_API_KEY;

    if (!apiKey) {
        return NextResponse.json({ error: "Server misconfiguration: Missing API Key" }, { status: 500 });
    }

    try {
        // Aviationstack is HTTP only for free tier, but axios handles it.
        // Ensure the server environment allows outbound HTTP if strictly enforced,
        // but usually it's fine.
        const response = await axios.get("http://api.aviationstack.com/v1/flights", {
            params: {
                access_key: apiKey,
                flight_iata: flight_iata,
            },
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("AviationStack Proxy Error:", error.message);
        return NextResponse.json(
            { error: "Failed to fetch flight data" },
            { status: 500 }
        );
    }
}
