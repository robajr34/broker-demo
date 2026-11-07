import { NextResponse } from "next/server";
import { initialSales } from "@/lib/data/initialData";

export async function GET() {
  return NextResponse.json({ success: true, data: initialSales });
}

