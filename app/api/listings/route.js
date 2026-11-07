import { NextResponse } from "next/server";
import { initialListings } from "@/lib/data/initialData";
import { serializePublicListing, serializeAdminListing } from "@/lib/utils/serializers";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const isAdmin = searchParams.get("admin") === "true";

  // For public visitors: strictly strip private financials
  if (!isAdmin) {
    const publicListings = initialListings
      .filter((l) => l.status !== "draft" && l.status !== "archived")
      .map(serializePublicListing);
    return NextResponse.json({ success: true, data: publicListings });
  }

  // Admin access
  const adminListings = initialListings.map(serializeAdminListing);
  return NextResponse.json({ success: true, data: adminListings });
}
