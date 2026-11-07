/**
 * SERIALIZERS (Pure utility functions, safe for both server API routes and client components)
 * 
 * PUBLIC SERIALIZER:
 * Strictly removes all private financial information.
 * Public visitors never receive acquisition cost, broker discounts, internal expenses or net profit.
 */
export function serializePublicListing(listing) {
  if (!listing) return null;
  const {
    acquisitionPrice,
    privateDiscount,
    additionalExpenses,
    netProfit,
    ...publicSafeListing
  } = listing;
  return publicSafeListing;
}

/**
 * ADMIN SERIALIZER:
 * Preserves private financials and adds computed estimated margin preview.
 */
export function serializeAdminListing(listing) {
  if (!listing) return null;
  const estimatedProfit =
    (Number(listing.publicPrice) || 0) -
    (Number(listing.acquisitionPrice) || 0) -
    (Number(listing.privateDiscount) || 0) -
    (Number(listing.additionalExpenses) || 0);

  return {
    ...listing,
    estimatedProfit,
  };
}

