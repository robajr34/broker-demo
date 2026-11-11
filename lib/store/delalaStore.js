"use client";

import {
  initialListings,
  initialSales,
  initialInquiries,
  initialBusinessSettings,
} from "@/lib/data/initialData";
import { serializePublicListing, serializeAdminListing } from "@/lib/utils/serializers";

export { serializePublicListing, serializeAdminListing };

const STORAGE_KEYS = {
  LISTINGS: "ethiodelala_listings_v2",
  SALES: "ethiodelala_sales_v2",
  INQUIRIES: "ethiodelala_inquiries_v2",
  SETTINGS: "ethiodelala_settings_v2",
};

// Storage helpers
function loadFromStorage(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) {
      localStorage.setItem(key, JSON.stringify(fallback));
      return fallback;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${key} from localStorage:`, err);
    return fallback;
  }
}

function saveToStorage(key, data) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`Error saving ${key} to localStorage:`, err);
  }
}

export const DelalaStore = {
  // LISTINGS
  getListings(isAdmin = false) {
    const listings = loadFromStorage(STORAGE_KEYS.LISTINGS, initialListings);
    if (isAdmin) {
      return listings.map(serializeAdminListing);
    }
    return listings.map(serializePublicListing);
  },

  getListingById(id, isAdmin = false) {
    const listings = loadFromStorage(STORAGE_KEYS.LISTINGS, initialListings);
    const item = listings.find((l) => l.id === id || l.slug === id);
    if (!item) return null;
    return isAdmin ? serializeAdminListing(item) : serializePublicListing(item);
  },

  createListing(data) {
    const listings = loadFromStorage(STORAGE_KEYS.LISTINGS, initialListings);
    const newId = `delala-${data.category || "item"}-${Date.now()}`;
    const prefixMap = {
      "import-materials": "ED-IMP",
      "factories": "ED-FAC",
      "shops-for-rent": "ED-SHP",
      "houses-for-rent": "ED-HSE",
      "properties": "ED-PRP",
      "vehicles": "ED-VEH",
    };
    const refPrefix = prefixMap[data.category] || "ED-LST";
    const refNo = `${refPrefix}-${Math.floor(100 + Math.random() * 900)}`;

    const newListing = {
      ...data,
      id: newId,
      referenceNo: data.referenceNo || refNo,
      slug:
        (data.title || "listing")
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") + `-${Date.now().toString().slice(-4)}`,
      publicPrice: Number(data.publicPrice) || 0,
      acquisitionPrice: Number(data.acquisitionPrice) || 0,
      privateDiscount: Number(data.privateDiscount) || 0,
      additionalExpenses: Number(data.additionalExpenses) || 0,
      images:
        Array.isArray(data.images) && data.images.length > 0
          ? data.images
          : [
              data.primaryImage ||
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
            ],
      primaryImage:
        data.primaryImage ||
        (data.images && data.images[0]) ||
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      status: data.status || "available",
      isFeatured: Boolean(data.isFeatured),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updated = [newListing, ...listings];
    saveToStorage(STORAGE_KEYS.LISTINGS, updated);
    return serializeAdminListing(newListing);
  },

  updateListing(id, updates) {
    const listings = loadFromStorage(STORAGE_KEYS.LISTINGS, initialListings);
    const index = listings.findIndex((l) => l.id === id);
    if (index === -1) return null;

    const existing = listings[index];
    const updatedItem = {
      ...existing,
      ...updates,
      publicPrice:
        updates.publicPrice !== undefined ? Number(updates.publicPrice) : existing.publicPrice,
      acquisitionPrice:
        updates.acquisitionPrice !== undefined
          ? Number(updates.acquisitionPrice)
          : existing.acquisitionPrice,
      privateDiscount:
        updates.privateDiscount !== undefined
          ? Number(updates.privateDiscount)
          : existing.privateDiscount,
      additionalExpenses:
        updates.additionalExpenses !== undefined
          ? Number(updates.additionalExpenses)
          : existing.additionalExpenses,
      updatedAt: new Date().toISOString(),
    };

    listings[index] = updatedItem;
    saveToStorage(STORAGE_KEYS.LISTINGS, listings);
    return serializeAdminListing(updatedItem);
  },

  deleteListing(id) {
    const listings = loadFromStorage(STORAGE_KEYS.LISTINGS, initialListings);
    const filtered = listings.filter((l) => l.id !== id);
    saveToStorage(STORAGE_KEYS.LISTINGS, filtered);
    return true;
  },

  updateListingStatus(id, newStatus) {
    return this.updateListing(id, { status: newStatus });
  },

  // SALES MANAGEMENT
  getSales() {
    return loadFromStorage(STORAGE_KEYS.SALES, initialSales);
  },

  /**
   * RECORD A SALE:
   * 1. Validates listing exists.
   * 2. Prevents duplicate sales for the same listing.
   * 3. Calculates exact netProfit = actualSellingPrice - acquisitionCost - additionalExpenses.
   * 4. Updates listing status to 'sold'.
   * 5. Saves sale transaction to ledger.
   */
  recordSale({
    listingId,
    actualSellingPrice,
    buyer,
    saleDate = new Date().toISOString().split("T")[0],
    additionalExpenses = 0,
    paymentStatus = "completed",
  }) {
    const listings = loadFromStorage(STORAGE_KEYS.LISTINGS, initialListings);
    const sales = loadFromStorage(STORAGE_KEYS.SALES, initialSales);

    // Prevent duplicate sales
    const alreadySold = sales.some((s) => s.listingId === listingId);
    if (alreadySold) {
      throw new Error("This listing has already been recorded as sold.");
    }

    const listing = listings.find((l) => l.id === listingId);
    if (!listing) {
      throw new Error("Listing not found.");
    }

    const finalPrice = Number(actualSellingPrice) || Number(listing.publicPrice) || 0;
    const acquisition = Number(listing.acquisitionPrice) || 0;
    const extraExp = Number(additionalExpenses) || Number(listing.additionalExpenses) || 0;
    const discount =
      Number(listing.publicPrice) - finalPrice > 0 ? Number(listing.publicPrice) - finalPrice : 0;
    const profit = finalPrice - acquisition - extraExp;

    const newSale = {
      id: `sale-tx-${Date.now()}`,
      listingId: listing.id,
      listingTitle: listing.title,
      listingTitleAm: listing.titleAm || listing.title,
      category: listing.category,
      acquisitionCostSnapshot: acquisition,
      actualSellingPrice: finalPrice,
      discountSnapshot: discount,
      additionalExpenses: extraExp,
      netProfit: profit,
      buyer: buyer || { name: "Direct Client", phone: "+251 900 000 000", email: "" },
      saleDate: saleDate,
      paymentStatus: paymentStatus,
    };

    // Update listing status to SOLD
    const updatedListings = listings.map((l) =>
      l.id === listingId ? { ...l, status: "sold", updatedAt: new Date().toISOString() } : l
    );
    saveToStorage(STORAGE_KEYS.LISTINGS, updatedListings);

    // Save sale transaction
    const updatedSales = [newSale, ...sales];
    saveToStorage(STORAGE_KEYS.SALES, updatedSales);

    return newSale;
  },

  // INQUIRIES
  getInquiries() {
    return loadFromStorage(STORAGE_KEYS.INQUIRIES, initialInquiries);
  },

  createInquiry(inquiryData) {
    const inquiries = loadFromStorage(STORAGE_KEYS.INQUIRIES, initialInquiries);
    const newInquiry = {
      id: `inq-${Date.now()}`,
      listingId: inquiryData.listingId || null,
      listingTitle: inquiryData.listingTitle || "General Inquiry",
      customerName: inquiryData.customerName || "Interested Buyer",
      phone: inquiryData.phone || "",
      email: inquiryData.email || "",
      message: inquiryData.message || "",
      status: "new",
      createdAt: new Date().toISOString(),
    };
    const updated = [newInquiry, ...inquiries];
    saveToStorage(STORAGE_KEYS.INQUIRIES, updated);
    return newInquiry;
  },

  updateInquiryStatus(id, newStatus) {
    const inquiries = loadFromStorage(STORAGE_KEYS.INQUIRIES, initialInquiries);
    const updated = inquiries.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    );
    saveToStorage(STORAGE_KEYS.INQUIRIES, updated);
    return updated;
  },

  // SETTINGS
  getSettings() {
    return loadFromStorage(STORAGE_KEYS.SETTINGS, initialBusinessSettings);
  },

  updateSettings(newSettings) {
    const current = loadFromStorage(STORAGE_KEYS.SETTINGS, initialBusinessSettings);
    const merged = { ...current, ...newSettings };
    saveToStorage(STORAGE_KEYS.SETTINGS, merged);
    return merged;
  },

  // ANALYTICS CALCULATION (Computed strictly from recorded sales transactions!)
  getAnalytics() {
    const sales = this.getSales();
    const listings = loadFromStorage(STORAGE_KEYS.LISTINGS, initialListings);

    const totalListings = listings.length;
    const activeListings = listings.filter(
      (l) => l.status === "available" || l.status === "new" || l.status === "featured"
    ).length;
    const soldListingsCount = sales.length;

    const totalRevenue = sales.reduce((acc, s) => acc + (Number(s.actualSellingPrice) || 0), 0);
    const totalProfit = sales.reduce((acc, s) => acc + (Number(s.netProfit) || 0), 0);

    // Current month vs previous month revenue
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth(); // 0-indexed

    const currentMonthSales = sales.filter((s) => {
      const d = new Date(s.saleDate);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    });

    const monthlyRevenue = currentMonthSales.reduce(
      (acc, s) => acc + (Number(s.actualSellingPrice) || 0),
      0
    );
    const monthlyProfit = currentMonthSales.reduce(
      (acc, s) => acc + (Number(s.netProfit) || 0),
      0
    );

    // Monthly chart data (Jan to Dec of 2026)
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const monthlyChartData = monthNames.map((month, idx) => {
      const monthSales = sales.filter((s) => {
        const d = new Date(s.saleDate);
        return d.getMonth() === idx;
      });
      const rev = monthSales.reduce((acc, s) => acc + (Number(s.actualSellingPrice) || 0), 0);
      const prof = monthSales.reduce((acc, s) => acc + (Number(s.netProfit) || 0), 0);
      return {
        month,
        revenue: rev,
        profit: prof,
        transactions: monthSales.length,
      };
    });

    // Yearly chart data
    const yearlyMap = {};
    sales.forEach((s) => {
      const yr = new Date(s.saleDate).getFullYear() || 2026;
      if (!yearlyMap[yr]) {
        yearlyMap[yr] = { year: `${yr}`, revenue: 0, profit: 0, count: 0 };
      }
      yearlyMap[yr].revenue += Number(s.actualSellingPrice) || 0;
      yearlyMap[yr].profit += Number(s.netProfit) || 0;
      yearlyMap[yr].count += 1;
    });
    const yearlyChartData = Object.values(yearlyMap);

    // Sales by category breakdown
    const categoryMap = {
      "import-materials": 0,
      "factories": 0,
      "shops-for-rent": 0,
      "houses-for-rent": 0,
      properties: 0,
      vehicles: 0,
      house: 0,
      apartment: 0,
      commercial: 0,
      land: 0,
      car: 0,
    };
    sales.forEach((s) => {
      const cat = s.category || "properties";
      if (categoryMap[cat] !== undefined) {
        categoryMap[cat] += Number(s.actualSellingPrice) || 0;
      }
    });

    const categoryChartData = [
      {
        name: "Import Materials",
        value: categoryMap["import-materials"],
        color: "#2563eb",
      },
      {
        name: "Factories",
        value: categoryMap.factories,
        color: "#7c3aed",
      },
      {
        name: "Shops for Rent",
        value: categoryMap["shops-for-rent"] + categoryMap.commercial,
        color: "#059669",
      },
      {
        name: "Houses for Rent",
        value: categoryMap["houses-for-rent"],
        color: "#d97706",
      },
      {
        name: "Properties (Sale)",
        value: categoryMap.properties + categoryMap.house + categoryMap.apartment + categoryMap.land,
        color: "#0891b2",
      },
      {
        name: "Vehicles",
        value: categoryMap.vehicles + categoryMap.car,
        color: "#ea580c",
      },
    ];

    const averageSellingPrice =
      soldListingsCount > 0 ? Math.round(totalRevenue / soldListingsCount) : 0;
    const averageProfitPerSale =
      soldListingsCount > 0 ? Math.round(totalProfit / soldListingsCount) : 0;
    const profitMarginPercent =
      totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0.0";

    return {
      totalListings,
      activeListings,
      soldListingsCount,
      totalRevenue,
      totalProfit,
      monthlyRevenue,
      monthlyProfit,
      averageSellingPrice,
      averageProfitPerSale,
      profitMarginPercent,
      monthlyChartData,
      yearlyChartData,
      categoryChartData,
      recentSales: sales.slice(0, 5),
    };
  },
};
