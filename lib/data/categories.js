// Central category and subcategory definitions for EthioDelala Brokerage
// Exactly four top-level categories, each with official subcategories in EN and AM

export const CATEGORIES = [
  {
    id: "import-materials",
    nameEn: "Import Materials",
    nameAm: "ከውጭ የሚገቡ እቃዎች",
    slug: "import-materials",
    descriptionEn:
      "Vetted imported construction materials, industrial machinery, electronics, spare parts, and merchandise sourced directly through licensed intermediary brokers.",
    descriptionAm:
      "ከውጭ ሀገር የሚገቡ ጥራት ያላቸው የግንባታ እቃዎች፣ የኢንዱስትሪ ማሽኖች፣ ኤሌክትሮኒክስ፣ መለዋወጫዎችና የንግድ እቃዎች በደላላ በኩል የቀረቡ።",
    icon: "PackageCheck",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "construction-materials",
        nameEn: "Construction Materials",
        nameAm: "የግንባታ ዕቃዎች",
        descriptionEn: "Reinforcement rebar, structural steel beams, cement, ceramic tiles, sanitary fixtures",
        descriptionAm: "የብረት ዘንግ፣ ሲሚንቶ፣ ሴራሚክ፣ የቧንቧ እና የኤሌክትሪክ የግንባታ እቃዎች",
      },
      {
        id: "electronics",
        nameEn: "Electronics",
        nameAm: "ኤሌክትሮኒክስ",
        descriptionEn: "Commercial displays, solar power systems, enterprise servers, communication hardware",
        descriptionAm: "የፀሐይ ብርሃን ኃይል መሣሪያዎች፣ ሰርቨሮች፣ የንግድ ኤሌክትሮኒክስ እቃዎች",
      },
      {
        id: "industrial-machinery",
        nameEn: "Industrial Machinery",
        nameAm: "የኢንዱስትሪ ማሽኖች",
        descriptionEn: "Injection molding machines, CNC milling, metal lathes, industrial boilers & generators",
        descriptionAm: "የፋብሪካ ማምረቻ ማሽኖች፣ የብረት መቁረጫዎች፣ ጀነሬተሮችና ቦይለሮች",
      },
      {
        id: "vehicles-spare-parts",
        nameEn: "Vehicles and Spare Parts",
        nameAm: "ተሽከርካሪዎችና መለዋወጫዎች",
        descriptionEn: "Commercial trucks, Sino dump trucks, heavy equipment parts, automotive tires & batteries",
        descriptionAm: "የከባድ ጭነት መኪኖች፣ ሲኖ ትራኮች፣ ጎማዎችና የተሽከርካሪ መለዋወጫዎች",
      },
      {
        id: "food-products",
        nameEn: "Food Products",
        nameAm: "የምግብ ምርቶች",
        descriptionEn: "Imported refined edible oil, wheat flour, cane sugar, dairy milk powder in bulk containers",
        descriptionAm: "የምግብ ዘይት፣ ስንዴ ዱቄት፣ ስኳር፣ የዱቄት ወተት በጅምላ ኮንቴይነር",
      },
      {
        id: "agricultural-equipment",
        nameEn: "Agricultural Equipment",
        nameAm: "የግብርና መሳሪያዎች",
        descriptionEn: "Farm tractors, combine harvesters, pivot drip irrigation systems, grain silos",
        descriptionAm: "ትራክተሮች፣ የሰብል አጫጅ ማሽኖች፣ የመስኖ ቱቦዎችና የሰብል ማከማቻዎች",
      },
      {
        id: "clothing-textiles",
        nameEn: "Clothing and Textiles",
        nameAm: "ልብስና ጨርቃጨርቅ",
        descriptionEn: "Raw polyester & cotton yarn, garment rolls, finished apparel bales, synthetic leather",
        descriptionAm: "የጨርቅ ጥቅሎች፣ ክሮች፣ የፋብሪካ አልባሳት እና ሰው ሰራሽ ቆዳ",
      },
      {
        id: "general-merchandise",
        nameEn: "General Merchandise",
        nameAm: "የተለያዩ የንግድ ዕቃዎች",
        descriptionEn: "Commercial packaging materials, hardware tools, household goods, stationeries",
        descriptionAm: "የማሸጊያ እቃዎች፣ የሃርድዌር መገልገያዎችና የቤት ውስጥ የንግድ እቃዎች",
      },
    ],
  },
  {
    id: "factories",
    nameEn: "Factories",
    nameAm: "ፋብሪካዎች",
    slug: "factories",
    descriptionEn:
      "Operational manufacturing facilities, industrial sheds, and agro-processing plants for outright sale, long-term lease, or equity partnership.",
    descriptionAm:
      "ለሽያጭ፣ ለኪራይ ወይም ለሽርክና ኢንቨስትመንት የቀረቡ ስራ ላይ ያሉ የማምረቻ ፋብሪካዎች፣ የኢንዱስትሪ ሼዶችና ማቀነባበሪያዎች።",
    icon: "Factory",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    listingTypes: [
      { id: "sale", nameEn: "Factories for Sale", nameAm: "ለሽያጭ የሚቀርቡ ፋብሪካዎች" },
      { id: "rent", nameEn: "Factories for Rent", nameAm: "ለኪራይ የሚቀርቡ ፋብሪካዎች" },
      { id: "partnership", nameEn: "Factory Partnerships", nameAm: "የፋብሪካ ሽርክና እድሎች" },
    ],
    subcategories: [
      {
        id: "food-beverage-factories",
        nameEn: "Food and Beverage Factories",
        nameAm: "የምግብና መጠጥ ፋብሪካዎች",
        descriptionEn: "Bottled water plants, bakeries, edible oil refineries, pasta & biscuit processing",
        descriptionAm: "የታሸገ ውሃ፣ ዘይት ማጣሪያ፣ ዱቄትና ዳቦ፣ ብስኩትና ፓስታ ፋብሪካዎች",
      },
      {
        id: "textile-garment-factories",
        nameEn: "Textile and Garment Factories",
        nameAm: "የጨርቃጨርቅና ልብስ ፋብሪካዎች",
        descriptionEn: "Spinning mills, industrial sewing lines, fabric dyeing & knitting operations",
        descriptionAm: "የፈትል፣ የልብስ ስፌት እና የጨርቅ ማቅለሚያ የማምረቻ መስመሮች",
      },
      {
        id: "furniture-factories",
        nameEn: "Furniture Factories",
        nameAm: "የቤት ዕቃ ፋብሪካዎች",
        descriptionEn: "Automated woodworking mills, metal office furniture, modular sofa production lines",
        descriptionAm: "የእንጨትና የብረት የቤትና የቢሮ ዕቃዎች ማምረቻ ፋብሪካዎች",
      },
      {
        id: "plastic-factories",
        nameEn: "Plastic Factories",
        nameAm: "የፕላስቲክ ፋብሪካዎች",
        descriptionEn: "Plastic injection, blow-molding for bottles, PVC conduit pipes, polythene packaging",
        descriptionAm: "የፕላስቲክ ጠርሙስ፣ የውሃ ቱቦ እና የማሸጊያ ፌስታል ማምረቻዎች",
      },
      {
        id: "metal-steel-factories",
        nameEn: "Metal and Steel Factories",
        nameAm: "የብረትና ብረታ ብረት ፋብሪካዎች",
        descriptionEn: "Sheet metal profiling, steel tube rolling, corrugated roofing nail & wire mills",
        descriptionAm: "የቆርቆሮ፣ የብረት ቱቦዎች፣ ሚስማርና ሽቦ ማምረቻ ፋብሪካዎች",
      },
      {
        id: "cement-concrete-factories",
        nameEn: "Cement and Concrete Factories",
        nameAm: "የሲሚንቶና ኮንክሪት ፋብሪካዎች",
        descriptionEn: "Ready-mix batching plants, hollow block & pavement cobblestone manufacturing",
        descriptionAm: "የሬዲሚክስ ኮንክሪት፣ የብሎኬትና የኮብልስቶን ማምረቻ ጣቢያዎች",
      },
      {
        id: "paper-packaging-factories",
        nameEn: "Paper and Packaging Factories",
        nameAm: "የወረቀትና ማሸጊያ ፋብሪካዎች",
        descriptionEn: "Corrugated carton box factories, paper bag lines, egg tray recycling plants",
        descriptionAm: "የካርቶን ማሸጊያ ሳጥኖች፣ የወረቀት ከረጢትና ማሸጊያ ማምረቻዎች",
      },
      {
        id: "agricultural-processing-factories",
        nameEn: "Agricultural Processing Factories",
        nameAm: "የግብርና ምርት ማቀነባበሪያ ፋብሪካዎች",
        descriptionEn: "Coffee hulling and cleaning stations, sesame washing plants, grain cleaning & pulses export",
        descriptionAm: "የቡና መፈልፈያና ማዘጋጃ፣ የሰሊጥ ማጠቢያ እና የጥራጥሬ ማቀነባበሪያ ፋብሪካዎች",
      },
    ],
  },
  {
    id: "shops-for-rent",
    nameEn: "Shops for Rent",
    nameAm: "ለኪራይ የሚቀርቡ ሱቆች",
    slug: "shops-for-rent",
    descriptionEn:
      "Prime retail shops, shopping mall units, high-footprint commercial showrooms, offices, and storage warehouses in strategic business centers.",
    descriptionAm:
      "በተመረጡ የንግድ ማዕከላትና አውራ ጎዳናዎች ላይ የሚገኙ የችርቻሮ ሱቆች፣ የገበያ ማዕከላት፣ ቢሮዎችና ሰፋፊ መጋዘኖች።",
    icon: "Store",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "retail-shops",
        nameEn: "Retail Shops",
        nameAm: "የችርቻሮ ሱቆች",
        descriptionEn: "Street-level retail spaces, boutique storefronts, pharmacy & grocery shop spaces",
        descriptionAm: "የመንገድ ዳር ሱቆች፣ የቡቲክ መደብሮች፣ የመድሃኒትና የሸቀጣሸቀጥ ቦታዎች",
      },
      {
        id: "commercial-spaces",
        nameEn: "Commercial Spaces",
        nameAm: "የንግድ ቦታዎች",
        descriptionEn: "Open-floor commercial halls, bank branches, cafe/restaurant spaces, clinics",
        descriptionAm: "ሰፋፊ ክፍት የንግድ አዳራሾች፣ ለባንክ፣ ለካፌና ሬስቶራንት አመቺ ቦታዎች",
      },
      {
        id: "shopping-center-shops",
        nameEn: "Shopping Center Shops",
        nameAm: "የገበያ ማዕከል ሱቆች",
        descriptionEn: "Mall kiosks and units in prime plazas (Bole Medhanialem, Edna, Merkato Plazas)",
        descriptionAm: "በዋና ዋና ሞሎችና የገበያ አዳራሾች ውስጥ የሚገኙ ሱቆች",
      },
      {
        id: "office-spaces",
        nameEn: "Office Spaces",
        nameAm: "የቢሮ ቦታዎች",
        descriptionEn: "Corporate executive suites, IT call-center floors, law firm & consultant offices",
        descriptionAm: "ዘመናዊ የድርጅት ቢሮዎች፣ የጥሪ ማዕከላትና የህግ አማካሪ ክፍሎች",
      },
      {
        id: "warehouse-spaces",
        nameEn: "Warehouse Spaces",
        nameAm: "የመጋዘን ቦታዎች",
        descriptionEn: "High-ceiling logistics warehouses, compound storage sheds with truck turning radii",
        descriptionAm: "ከፍተኛ ጣሪያ ያላቸው የዕቃ ማከማቻ መጋዘኖች ለጭነት መኪናዎች አመቺ የሆኑ",
      },
    ],
  },
  {
    id: "houses-for-rent",
    nameEn: "Houses for Rent",
    nameAm: "ለኪራይ የሚቀርቡ ቤቶች",
    slug: "houses-for-rent",
    descriptionEn:
      "Verified residential family homes, modern luxury apartments, standalone compound villas, furnished residences, and single rooms across peaceful neighborhoods.",
    descriptionAm:
      "በተመረጡ ሰላማዊ ሰፈሮች ውስጥ ለኪራይ የሚቀርቡ ዘመናዊ ቪላዎች፣ አፓርታማዎች፣ የተሟሉ መኖሪያዎችና ነጠላ ክፍሎች።",
    icon: "Home",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "residential-houses",
        nameEn: "Residential Houses",
        nameAm: "መኖሪያ ቤቶች",
        descriptionEn: "Traditional and modern residential family compounds, service quarters included",
        descriptionAm: "ለቤተሰብ አመቺ የሆኑ መደበኛ የመኖሪያ ቤቶች ከሰርቪስ ክፍሎች ጋር",
      },
      {
        id: "apartments",
        nameEn: "Apartments",
        nameAm: "አፓርታማዎች",
        descriptionEn: "1, 2, 3, and 4-bedroom condominium & private real estate apartments with elevator",
        descriptionAm: "ባለ 1፣ 2፣ 3 እና 4 መኝታ ዘመናዊ አፓርታማዎች ከሊፍትና ከመኪና ማቆሚያ ጋር",
      },
      {
        id: "villas",
        nameEn: "Villas",
        nameAm: "ቪላ ቤቶች",
        descriptionEn: "Standalone luxury villas with private gardens, security checkpoints, and backup power",
        descriptionAm: "ሰፊ ግቢና አትክልት ያላቸው ቅንጡ ቪላዎች፣ የጀነሬተርና የውሃ ታንከር የተሟላላቸው",
      },
      {
        id: "furnished-houses",
        nameEn: "Furnished Houses",
        nameAm: "የተሟሉ የቤት ዕቃዎች ያሏቸው ቤቶች",
        descriptionEn: "Turnkey residences fully fitted with European furniture, appliances, Wi-Fi, and linen",
        descriptionAm: "ዕቃ የተሟላላቸው ዘመናዊ ቤቶች ለዲፕሎማቶችና ለውጭ ሀገር ዜጎች እጅግ አመቺ",
      },
      {
        id: "single-rooms",
        nameEn: "Single Rooms",
        nameAm: "ነጠላ ክፍሎች",
        descriptionEn: "Secure private single rooms and studio suites with shared or private bathrooms",
        descriptionAm: "ለግል ወይም ለተማሪዎች አመቺ የሆኑ ንጹህና አስተማማኝ ነጠላ ክፍሎች",
      },
    ],
  },
  {
    id: "properties",
    nameEn: "Properties",
    nameAm: "ንብረቶች",
    slug: "properties",
    descriptionEn:
      "Verified standalone residential villas, modern apartments, prime investment land, and commercial buildings for sale with full title deed (Carta) in Ethiopia.",
    descriptionAm:
      "ህጋዊ የይዞታ ማረጋገጫ ካርታ ያላቸው ለሽያጭ የቀረቡ የመኖሪያ ቪላዎች፣ ዘመናዊ አፓርታማዎች፣ የመዋዕለ ንዋይ መሬቶችና የንግድ ህንፃዎች።",
    icon: "Building2",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "villas-for-sale",
        nameEn: "Villas for Sale",
        nameAm: "የሚሸጡ ቪላዎች",
        descriptionEn: "Luxury standalone G+2 and G+3 residential villas in Bole, CMC, and Old Airport",
        descriptionAm: "በቦሌ፣ በሲኤምሲ እና በኦልድ ኤርፖርት ለሽያጭ የቀረቡ ቅንጡ ቪላዎች",
      },
      {
        id: "apartments-for-sale",
        nameEn: "Apartments for Sale",
        nameAm: "የሚሸጡ አፓርታማዎች",
        descriptionEn: "Finished luxury real estate and condominium apartments with title deed ready",
        descriptionAm: "የይዞታ ካርታ የተጠናቀቀላቸው ዘመናዊ የሪል እስቴት አፓርታማዎች",
      },
      {
        id: "land-and-plots",
        nameEn: "Land and Plots",
        nameAm: "መሬትና ይዞታዎች",
        descriptionEn: "Residential building plots, commercial land, and tourism parcels in Addis & Bishoftu",
        descriptionAm: "በአዲስ አበባና በቢሾፍቱ ለመኖሪያ፣ ለንግድና ለሆቴል የሚሆኑ ይዞታዎች",
      },
      {
        id: "commercial-buildings",
        nameEn: "Commercial Buildings",
        nameAm: "የንግድ ህንፃዎች",
        descriptionEn: "Multi-story mixed-use commercial plazas, bank branch buildings, and hotels for sale",
        descriptionAm: "ባለ ብዙ ወለል የንግድ ህንፃዎች፣ ሆቴሎችና የባንክ ማዕከላት",
      },
      {
        id: "real-estate-developments",
        nameEn: "Real Estate Developments",
        nameAm: "የሪል እስቴት ፕሮጀክቶች",
        descriptionEn: "Off-plan and under-construction developer projects with installment plans",
        descriptionAm: "በግንባታ ላይ ያሉና በክፍያ የሚተላለፉ የሪል እስቴት ቤቶች",
      },
    ],
  },
  {
    id: "vehicles",
    nameEn: "Vehicles",
    nameAm: "ተሽከርካሪዎች",
    slug: "vehicles",
    descriptionEn:
      "Inspected and verified automobiles, luxury SUVs, commercial Sino dump trucks, passenger vans, and new electric vehicles (EVs) with authentic title libre.",
    descriptionAm:
      "ህጋዊ ሊብሬ ያላቸውና በቴክኒክ የተመረመሩ ዘመናዊ መኪኖች፣ 4x4 ኤስዩቪዎች፣ የከባድ ጭነት መኪኖች እና የኤሌክትሪክ ተሽከርካሪዎች።",
    icon: "Car",
    image:
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "suvs-and-4wd",
        nameEn: "SUVs & 4WD",
        nameAm: "ኤስዩቪ እና 4WD ተሽከርካሪዎች",
        descriptionEn: "Toyota Land Cruiser, Prado, Hyundai Tucson, RAV4, and robust 4WD vehicles",
        descriptionAm: "ቶዮታ ላንድ ክሩዘር፣ ፕራዶ፣ ራቭ4 እና ሂዩንዳይ ቱክሰን 4x4 መኪኖች",
      },
      {
        id: "sedans-compact",
        nameEn: "Sedans & Compact Cars",
        nameAm: "የከተማና የቤተሰብ መኪኖች",
        descriptionEn: "Fuel-efficient city cars, Toyota Corolla, Yaris, Suzuki Dzire, and family sedans",
        descriptionAm: "ነዳጅ ቆጣቢ ቶዮታ ኮሮላ፣ ያሪስ፣ ሱዙኪ ዲዛይር የከተማ መኪኖች",
      },
      {
        id: "commercial-trucks",
        nameEn: "Commercial Trucks",
        nameAm: "የከባድ ጭነት መኪኖች",
        descriptionEn: "Sinotruk HOWO 371 dump trucks, Isuzu FSR/NPR freight trucks, and heavy haulers",
        descriptionAm: "ሲኖትራክ ሆዎ፣ አይሱዙ ኤፍኤስአር እና ሌሎች የጭነት ተሽከርካሪዎች",
      },
      {
        id: "vans-minibuses",
        nameEn: "Vans & Minibuses",
        nameAm: "ቫኖችና ሚኒባሶች",
        descriptionEn: "Toyota HiAce 15-seater vans, modern corporate transport shuttles",
        descriptionAm: "ቶዮታ ሃይኤስ ባለ 15 ወንበር ሚኒባሶችና የድርጅት ሰራተኞች ማመላለሻዎች",
      },
      {
        id: "electric-vehicles",
        nameEn: "Electric Vehicles (EVs)",
        nameAm: "የኤሌክትሪክ መኪኖች",
        descriptionEn: "Zero-emission new energy electric cars: BYD Song Plus, ID.4, and Neta V",
        descriptionAm: "ዘመናዊ የኤሌክትሪክ ተሽከርካሪዎች፡ ቢዋይዲ ሶንግ፣ አይዲ 4 እና ኔታ",
      },
      {
        id: "heavy-machinery-vehicles",
        nameEn: "Construction Equipment",
        nameAm: "የኮንስትራክሽን ማሽነሪዎች",
        descriptionEn: "Excavators, wheel loaders, motor graders, and mobile cranes",
        descriptionAm: "ኤክስካቫተሮች፣ ሎደሮች፣ ግሬደሮችና ተንቀሳቃሽ ክሬኖች",
      },
    ],
  },
];

// Helper to find category by id (with alias normalization)
export function getCategoryById(id) {
  if (!id) return null;
  const normalizedId =
    id === "property"
      ? "properties"
      : id === "car" || id === "cars" || id === "vehicle"
      ? "vehicles"
      : id;

  return CATEGORIES.find((cat) => cat.id === normalizedId) || null;
}

// Helper to get subcategories for a given category
export function getSubcategoriesForCategory(categoryId) {
  const cat = getCategoryById(categoryId);
  return cat ? cat.subcategories : [];
}

// Helper to find subcategory by id within a category or across all categories
export function getSubcategoryById(categoryId, subcategoryId) {
  if (!subcategoryId) return null;
  if (categoryId) {
    const cat = getCategoryById(categoryId);
    if (cat) {
      return cat.subcategories.find((s) => s.id === subcategoryId) || null;
    }
  }
  for (const cat of CATEGORIES) {
    const found = cat.subcategories.find((s) => s.id === subcategoryId);
    if (found) return found;
  }
  return null;
}

// Helper to get localized category name
export function getCategoryName(category, language = "en") {
  if (!category) return "";
  const catObj = typeof category === "string" ? getCategoryById(category) : category;
  if (!catObj) return category;
  return language === "am" ? catObj.nameAm : catObj.nameEn;
}

// Helper to get localized subcategory name
export function getSubcategoryName(category, subcategory, language = "en") {
  if (!subcategory) return "";
  const subObj =
    typeof subcategory === "string"
      ? getSubcategoryById(category, subcategory)
      : subcategory;
  if (!subObj) return subcategory;
  return language === "am" ? subObj.nameAm : subObj.nameEn;
}
