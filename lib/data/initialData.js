// Initial realistic Ethiopian Delala data with bilingual metadata and private financial tracking

export const initialListings = [
  {
    id: "delala-prop-001",
    referenceNo: "ED-VIL-001",
    title: "Luxury Modern Villa with Garden in Bole",
    titleAm: "በቦሌ ዘመናዊ ቅንጡ ቪላ ከአትክልት ስፍራ ጋር",
    slug: "luxury-modern-villa-bole",
    category: "house",
    propertyType: "villa",
    description: "Exceptional 3-story contemporary villa situated in the diplomatic heart of Bole. Features 5 master bedrooms, high-end imported Italian kitchen, expansive living hall with double-height ceiling, maid quarters, backup generator (45kVA), 10,000L underground water reservoir, and landscaped compound accommodating up to 4 cars.",
    descriptionAm: "በቦሌ ዲፕሎማቲክ ሰፈር የሚገኝ እጅግ ዘመናዊ ባለ 3 ወለል ቪላ። 5 ሰፋፊ መኝታ ቤቶች፣ የጣሊያን ኪችን ካቢኔት፣ ድርብ ከፍታ ያለው ሳሎን፣ የሰራተኛ ክፍል፣ 45 ኬቪኤ ጀነሬተር፣ 10,000 ሊትር የከርሰ ምድር የውሃ ማጠራቀሚያ እና ለ4 መኪና ማቆሚያ ያለው።",
    location: "Bole",
    address: "Bole Rwanda Embassy area, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 68000000, // ETB 68,000,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 62000000,
    privateDiscount: 1500000,
    additionalExpenses: 450000,
    specifications: {
      bedrooms: 5,
      bathrooms: 6,
      floors: 3,
      area: 450,
      parking: 4,
      furnishing: "Semi-Furnished",
      propertyType: "Standalone Villa"
    },
    features: [
      "Backup 45kVA Generator",
      "10,000L Water Tank",
      "Electric Perimeter Fence",
      "Modern CCTV System",
      "Jacuzzi in Master Suite",
      "Private Security Guardhouse"
    ],
    status: "available",
    isFeatured: true,
    contact: null,
    createdAt: "2026-09-10T10:00:00.000Z",
    updatedAt: "2026-10-01T14:30:00.000Z"
  },
  {
    id: "delala-prop-002",
    referenceNo: "ED-APT-002",
    title: "Brand New 3-Bedroom Luxury Apartment in Ayat",
    titleAm: "በአያት አዲስ የተጠናቀቀ ባለ 3 መኝታ ቅንጡ አፓርታማ",
    slug: "brand-new-3-bedroom-apartment-ayat",
    category: "apartment",
    propertyType: "apartment",
    description: "Spacious 185m² corner apartment on the 7th floor overlooking Ayat roundabout. Fully finished with European ceramic tiling, open-concept kitchen, private balconies with panoramic mountain views, high-speed elevator, dedicated underground parking spot, and full title deed (Carta) ready for immediate handover.",
    descriptionAm: "በአያት አደባባይ አጠገብ በ7ኛ ፎቅ ላይ የሚገኝ 185 ካሬ ሜትር ሰፊ አፓርታማ። የአውሮፓ ሴራሚክ፣ ክፍት የኩሽና ዲዛይን፣ የተራራ እይታ ያላቸው በረንዳዎች፣ ፈጣን ሊፍት፣ የመሬት ስር መኪና ማቆሚያ እና የይዞታ ካርታ የተጠናቀቀ።",
    location: "Ayat",
    address: "Ayat Zone 2, Main Asphalt Road, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 19500000, // ETB 19,500,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 17200000,
    privateDiscount: 300000,
    additionalExpenses: 150000,
    specifications: {
      bedrooms: 3,
      bathrooms: 2,
      floors: 1,
      area: 185,
      parking: 1,
      furnishing: "Unfurnished",
      propertyType: "Condominium / Real Estate Apartment"
    },
    features: [
      "Modern Elevator Access",
      "Designated Basement Parking",
      "Fire Suppression Sprinklers",
      "Intercom Security System",
      "Balcony Mountain Views"
    ],
    status: "new",
    isFeatured: true,
    contact: null,
    createdAt: "2026-10-05T09:15:00.000Z",
    updatedAt: "2026-10-12T11:20:00.000Z"
  },
  {
    id: "delala-prop-003",
    referenceNo: "ED-COM-003",
    title: "Prime G+4 Commercial Building in Adama Central",
    titleAm: "በአዳማ ከተማ መሃል የሚገኝ ጂ+4 የንግድ ህንፃ",
    slug: "prime-g4-commercial-building-adama",
    category: "commercial",
    propertyType: "commercial",
    description: "High-yield commercial plaza situated along the main expressway artery in central Adama. G+4 floors with total built-up area of 1,200m² on 400m² plot. Ground floor currently leased to a bank with ATM lobby, upper floors configured for corporate offices, medical clinics, or vocational college. Generates steady rental revenue.",
    descriptionAm: "በአዳማ ከተማ ዋና አስፋልት ላይ የሚገኝ ባለ 4 ፎቅ የንግድ ህንፃ። 400 ካሬ ይዞታ ላይ ያረፈ በድምሩ 1,200 ካሬ ሜትር ግንባታ። ምድር ቤቱ ለባንክ የተከራየ፣ የላይኞቹ ፎቆች ለቢሮዎች፣ ክሊኒክ ወይም ኮሌጅ አመቺ ናቸው።",
    location: "Adama",
    address: "Near Posta Bet, Main Highway, Adama",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 110000000, // ETB 110,000,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 98000000,
    privateDiscount: 2000000,
    additionalExpenses: 850000,
    specifications: {
      bedrooms: 0,
      bathrooms: 10,
      floors: 5,
      area: 1200,
      parking: 12,
      furnishing: "Unfurnished",
      propertyType: "Commercial Mixed-Use Plaza"
    },
    features: [
      "Bank Ground Lease Secured",
      "Transformer 100kVA Dedicated",
      "Spacious Customer Parking",
      "Road Frontage 28 Meters",
      "Commercial Title Carta Clean"
    ],
    status: "available",
    isFeatured: true,
    contact: null,
    createdAt: "2026-08-20T14:00:00.000Z",
    updatedAt: "2026-09-02T16:00:00.000Z"
  },
  {
    id: "delala-prop-004",
    referenceNo: "ED-LND-004",
    title: "1,000m² Lakeside Resort Land in Bishoftu",
    titleAm: "በቢሾፍቱ ሀይቅ ዳርቻ 1,000 ካሬ ሜትር የሪዞርት ይዞታ መሬት",
    slug: "1000m2-lakeside-resort-land-bishoftu",
    category: "land",
    propertyType: "land",
    description: "Exceptional investment parcel right on the scenic shores of Lake Babogaya, Bishoftu (Debre Zeit). 1,000 square meters with gentle slope down to the water edge. Zoned for hospitality/resort or luxury private getaway retreat. Has direct gravel road access from main asphalt, three-phase electric pole adjacent, and clear title deed.",
    descriptionAm: "በቢሾፍቱ ባቦጋያ ሀይቅ ዳርቻ የሚገኝ እጅግ ውብ 1,000 ካሬ ሜትር ይዞታ። ለሆቴል፣ ለሪዞርት ወይም ለቅንጡ መኖሪያ ቤት እጅግ ተስማሚ። ከመንገድ፣ ከመብራትና ከውሃ መስመር ጋር የተገናኘ ንጹህ ካርታ ያለው።",
    location: "Bishoftu",
    address: "Babogaya Lake Shore, Bishoftu",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 28500000, // ETB 28,500,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 24500000,
    privateDiscount: 500000,
    additionalExpenses: 280000,
    specifications: {
      landArea: 1000,
      landType: "Commercial / Hospitality / Residential",
      roadAccess: "Gravel (150m from Asphalt)",
      waterElectricity: "Available at Boundary"
    },
    features: [
      "Direct Lake View & Water Access",
      "Clean Verified Carta (Title Deed)",
      "Boundary Fenced with Stone Pillars",
      "Rapidly Appreciating Tourism Corridor"
    ],
    status: "available",
    isFeatured: false,
    contact: null,
    createdAt: "2026-09-18T11:00:00.000Z",
    updatedAt: "2026-09-25T15:10:00.000Z"
  },
  {
    id: "delala-prop-005",
    referenceNo: "ED-VIL-005",
    title: "Modern Executive Residence in CMC Tsehay Real Estate",
    titleAm: "በሲኤምሲ ፀሐይ ሪል እስቴት ቅንጡ ዘመናዊ መኖሪያ ቤት",
    slug: "executive-residence-cmc-addis",
    category: "house",
    propertyType: "villa",
    description: "Well-crafted G+2 modern villa inside a gated residential community in CMC. Features 4 ensuite bedrooms, wooden flooring, open rooftop terrace for entertaining with city skyline views, solar water heating, maid quarters, and garage parking.",
    descriptionAm: "በሲኤምሲ የተከበረ የመኖሪያ ግቢ ውስጥ የሚገኝ ጂ+2 ዘመናዊ ቪላ። 4 ራሳቸውን የቻሉ መኝታ ቤቶች፣ የጣሪያ ላይ በረንዳ፣ የፀሐይ ኃይል ውሃ ማሞቂያ እና የተሟላ ጥበቃ ያለው።",
    location: "CMC",
    address: "CMC Michael Area, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 48000000, // ETB 48,000,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 43000000,
    privateDiscount: 1000000,
    additionalExpenses: 300000,
    specifications: {
      bedrooms: 4,
      bathrooms: 5,
      floors: 3,
      area: 320,
      parking: 3,
      furnishing: "Semi-Furnished",
      propertyType: "G+2 Villa"
    },
    features: [
      "24/7 Gated Community Guard",
      "Solar Water Heating System",
      "Rooftop BBQ & Entertainment Deck",
      "Paved Compound"
    ],
    status: "reserved",
    isFeatured: false,
    contact: null,
    createdAt: "2026-07-15T08:30:00.000Z",
    updatedAt: "2026-10-03T12:00:00.000Z"
  },
  {
    id: "delala-car-001",
    referenceNo: "ED-CAR-001",
    title: "2023 Toyota Land Cruiser 300 VXR V6 Twin-Turbo",
    titleAm: "2023 ቶዮታ ላንድ ክሩዘር 300 ቪኤክስአር ቪ6",
    slug: "2023-toyota-land-cruiser-300-vxr",
    category: "car",
    propertyType: "suv",
    description: "Pristine condition 2023 Toyota Land Cruiser 300 Series VXR in Pearl White. 3.5L Twin-Turbo V6 petrol engine, 10-speed automatic transmission, full-time 4WD with crawl control, premium beige leather interior with cooling seats, rear entertainment screens, 360-degree cameras, JBL 14-speaker audio, and clear Ethiopian Customs clearance with original Libre.",
    descriptionAm: "በጣም በጥሩ ሁኔታ የተያዘ 2023 ቶዮታ ላንድ ክሩዘር 300 ቪኤክስአር። 3.5L ቪ6 ፔትሮል ሞተር፣ ባለ 10 ማርሽ አውቶማቲክ፣ 4WD፣ የቆዳ ወንበሮች፣ የኋላ ስክሪኖች፣ 360 ካሜራ፣ ንጹህ ሊብሬና የጉምሩክ ቀረጥ የተከፈለበት።",
    location: "Addis Ababa",
    address: "Bole Medhanialem Showroom, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 38500000, // ETB 38,500,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 34500000,
    privateDiscount: 500000,
    additionalExpenses: 250000,
    specifications: {
      manufacturer: "Toyota",
      model: "Land Cruiser 300 VXR",
      year: 2023,
      mileage: "14,500 km",
      transmission: "Automatic (10-Speed)",
      fuelType: "Petrol (Twin-Turbo)",
      engineCapacity: "3.5L V6",
      condition: "Excellent / Like New",
      color: "Pearl White"
    },
    features: [
      "JBL Premium Surround Sound",
      "Ventilated & Heated Leather Seats",
      "Head-Up Display (HUD)",
      "Radar Adaptive Cruise Control",
      "Original Libre (Clean Title)",
      "Keyless Go & Remote Start"
    ],
    status: "available",
    isFeatured: true,
    contact: null,
    createdAt: "2026-09-28T16:20:00.000Z",
    updatedAt: "2026-10-10T11:00:00.000Z"
  },
  {
    id: "delala-car-002",
    referenceNo: "ED-CAR-002",
    title: "2022 Toyota Hilux Double Cab 2.8L GD-6 4x4",
    titleAm: "2022 ቶዮታ ሃይሉክስ ደብል ካብ 2.8 ሊትር 4x4",
    slug: "2022-toyota-hilux-double-cab-gd6",
    category: "car",
    propertyType: "pickup",
    description: "Rugged and dependable 2022 Toyota Hilux Double Cab powered by the bulletproof 2.8L GD-6 turbo diesel engine. 6-speed automatic, switchable 4WD with rear diff-lock, steel canopy bed cover, heavy-duty BF Goodrich all-terrain tires, touchscreen infotainment with Apple CarPlay, and complete service history from Moenco.",
    descriptionAm: "ብርቱና አስተማማኝ 2022 ቶዮታ ሃይሉክስ ደብል ካብ 2.8 ሊትር ቱርቦ ዲሴል። አውቶማቲክ ማርሽ፣ 4x4፣ የተሸፈነ የጭነት ገንዳ፣ የሞኤንኮ ሰርቪስ ታሪክ ያለውና ንጹህ ሊብሬ።",
    location: "Kazanchis",
    address: "Kazanchis ECA area, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 16800000, // ETB 16,800,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 14900000,
    privateDiscount: 300000,
    additionalExpenses: 120000,
    specifications: {
      manufacturer: "Toyota",
      model: "Hilux Double Cab Adventure",
      year: 2022,
      mileage: "36,000 km",
      transmission: "Automatic",
      fuelType: "Diesel",
      engineCapacity: "2.8L GD-6",
      condition: "Very Good",
      color: "Metallic Gray"
    },
    features: [
      "Moenco Full Maintenance Records",
      "Lockable Bed Canopy",
      "Heavy-Duty Suspension",
      "Tow Bar & Recovery Hooks",
      "Rearview Camera"
    ],
    status: "available",
    isFeatured: true,
    contact: null,
    createdAt: "2026-09-05T12:00:00.000Z",
    updatedAt: "2026-10-02T10:15:00.000Z"
  },
  {
    id: "delala-car-003",
    referenceNo: "ED-CAR-003",
    title: "2021 Hyundai Tucson GLS All-Wheel Drive",
    titleAm: "2021 ሂውንዳይ ቱክሰን ጂኤልኤስ ኦል-ዊል ድራይቭ",
    slug: "2021-hyundai-tucson-gls-awd",
    category: "car",
    propertyType: "suv",
    description: "Modern, stylish, fuel-efficient crossover. 2.0L 4-cylinder engine, automatic transmission with drive modes, panoramic sunroof, push-button ignition, leather seats, blind spot monitor, and lane keep assist. Ideal for city driving and weekend trips to Bishoftu and Hawassa.",
    descriptionAm: "ዘመናዊ፣ ነዳጅ ቆጣቢ 2021 ሂውንዳይ ቱክሰን። 2.0 ሊትር ሞተር፣ አውቶማቲክ ማርሽ፣ ፓኖራሚክ ሰንሩፍ፣ ፑሽ ስታርት፣ የቆዳ ወንበሮችና በከተማ ውስጥ ለመንዳት እጅግ ምቹ የሆነ።",
    location: "Saris",
    address: "Saris Kadisco area, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 9400000, // ETB 9,400,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 8200000,
    privateDiscount: 200000,
    additionalExpenses: 90000,
    specifications: {
      manufacturer: "Hyundai",
      model: "Tucson GLS AWD",
      year: 2021,
      mileage: "42,000 km",
      transmission: "Automatic",
      fuelType: "Petrol",
      engineCapacity: "2.0L",
      condition: "Very Clean",
      color: "Graphite Silver"
    },
    features: [
      "Panoramic Glass Sunroof",
      "Wireless Smartphone Charging",
      "Apple CarPlay & Android Auto",
      "Dual-Zone Climate Control",
      "Alloy Wheels 18-inch"
    ],
    status: "sold", // Mark as sold for realistic portfolio showcase!
    isFeatured: false,
    contact: null,
    createdAt: "2026-06-10T09:00:00.000Z",
    updatedAt: "2026-08-14T17:00:00.000Z"
  },
  {
    id: "delala-car-004",
    referenceNo: "ED-CAR-004",
    title: "2020 Toyota Corolla Executive Edition",
    titleAm: "2020 ቶዮታ ኮሮላ ኤግዚክዩቲቭ እትም",
    slug: "2020-toyota-corolla-executive",
    category: "car",
    propertyType: "sedan",
    description: "Highly sought-after Ethiopian market favorite. 1.8L Dual VVT-i engine known for legendary reliability, low maintenance, and outstanding fuel economy. Automatic CVT gearbox, digital dashboard, rear parking sensors, alloy rims, pristine non-smoker interior, and registered Addis Ababa plate code 2.",
    descriptionAm: "በኢትዮጵያ ገበያ እጅግ ተወዳጅ የሆነው 2020 ቶዮታ ኮሮላ። 1.8 ሊትር ነዳጅ ቆጣቢ ሞተር፣ አውቶማቲክ፣ ዲጂታል ዳሽቦርድ፣ የአዲስ አበባ ሰሌዳ ኮድ 2 እና በጣም ንጹህ ይዞታ።",
    location: "Addis Ababa",
    address: "Megenagna, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 6200000, // ETB 6,200,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 5400000,
    privateDiscount: 150000,
    additionalExpenses: 65000,
    specifications: {
      manufacturer: "Toyota",
      model: "Corolla Executive",
      year: 2020,
      mileage: "58,000 km",
      transmission: "CVT Automatic",
      fuelType: "Petrol",
      engineCapacity: "1.8L Dual VVT-i",
      condition: "Excellent",
      color: "Super White"
    },
    features: [
      "Dual VVT-i Fuel Efficient",
      "Touchscreen Media Center",
      "Addis Ababa Plate Code 2",
      "New Tires Installed Recently",
      "Accident-Free Guaranteed"
    ],
    status: "available",
    isFeatured: false,
    contact: null,
    createdAt: "2026-10-15T15:00:00.000Z",
    updatedAt: "2026-10-20T10:00:00.000Z"
  },
  {
    id: "delala-prop-006",
    referenceNo: "ED-LND-006",
    title: "500m² Commercial Plot on Debre Zeit Road, Saris",
    titleAm: "በሳሪስ ደብረዘይት መንገድ ላይ 500 ካሬ ሜትር የንግድ ቦታ",
    slug: "500m2-commercial-plot-saris-addis",
    category: "land",
    propertyType: "land",
    description: "High-visibility commercial plot directly facing the Debre Zeit Road corridor in Saris. Ideal for warehouse, manufacturing showroom, distribution center, or mixed-use retail/hotel building. Complete city lease rights with verified carta and boundary clearance.",
    descriptionAm: "በሳሪስ ዋና መንገድ ዳር 500 ካሬ ሜትር የንግድ ይዞታ። ለሾውሩም፣ ለዲስትሪቢውሽን ወይም ለንግድ ህንፃ እጅግ ተመራጭ። የይዞታ ካርታ የተሟላ።",
    location: "Saris",
    address: "Saris, Debre Zeit Main Road, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1524813686514-a57563d77d66?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 35000000, // ETB 35,000,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 30500000,
    privateDiscount: 700000,
    additionalExpenses: 280000,
    specifications: {
      landArea: 500,
      landType: "Commercial Mixed-Use",
      roadAccess: "Direct Main Asphalt Highway",
      waterElectricity: "Industrial Grid Connection"
    },
    features: [
      "Direct Main Road Frontage 22m",
      "Clean Leasehold Carta",
      "Suitable for Heavy Vehicles Access"
    ],
    status: "available",
    isFeatured: false,
    contact: null,
    createdAt: "2026-09-01T11:00:00.000Z",
    updatedAt: "2026-09-10T14:00:00.000Z"
  },
  {
    id: "delala-prop-007",
    referenceNo: "ED-APT-007",
    title: "Luxury Duplex Penthouse in Kazanchis UN Area",
    titleAm: "በካዛንቺስ የተባበሩት መንግስታት አካባቢ ቅንጡ ዱፕሌክስ ፔንትሃውስ",
    slug: "luxury-duplex-penthouse-kazanchis",
    category: "apartment",
    propertyType: "penthouse",
    description: "Prestigious 280m² duplex penthouse on the 14th floor offering panoramic 360-degree vistas over Addis Ababa skyline and Mount Entoto. 4 bedrooms, private terrace, German Poggenpohl kitchen, smart home climate automation, 2 dedicated basement parking slots.",
    descriptionAm: "በካዛንቺስ በ14ኛ ፎቅ ላይ 280 ካሬ ሜትር ባለ 2 ወለል ፔንትሃውስ። 4 መኝታ ቤቶች፣ ሰፊ የከተማ እይታ ያለው በረንዳ፣ ዘመናዊ ኪችን፣ 2 የመኪና ማቆሚያ ቦታዎች።",
    location: "Kazanchis",
    address: "Kazanchis Intercontinental Hotel vicinity, Addis Ababa",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 42000000, // ETB 42,000,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 37500000,
    privateDiscount: 800000,
    additionalExpenses: 320000,
    specifications: {
      bedrooms: 4,
      bathrooms: 4,
      floors: 2,
      area: 280,
      parking: 2,
      furnishing: "Furnished",
      propertyType: "Duplex Penthouse"
    },
    features: [
      "Unobstructed 360 Degree City Views",
      "Private Rooftop Lounge",
      "Backup Power 100% Guaranteed",
      "Concierge & 24/7 Security"
    ],
    status: "available",
    isFeatured: true,
    contact: null,
    createdAt: "2026-10-02T13:40:00.000Z",
    updatedAt: "2026-10-18T16:20:00.000Z"
  },
  {
    id: "delala-prop-008",
    referenceNo: "ED-VIL-008",
    title: "Classic Residence with Spacious Compound in Hawassa",
    titleAm: "በሀዋሳ ሰፊ ግቢ ያለው ዘመናዊ የመኖሪያ ቤት",
    slug: "classic-residence-compound-hawassa",
    category: "house",
    propertyType: "villa",
    description: "Peaceful G+1 residence located in the prime residential quarter of Hawassa, minutes from Lake Hawassa promenade. 500m² compound with avocado, mango, and ornamental fruit trees, 4 bedrooms, modern bathrooms, staff quarters, and paved parking for 3 cars.",
    descriptionAm: "በሀዋሳ ከተማ ሀይቁ አጠገብ በ500 ካሬ ሜትር ግቢ ላይ ያረፈ ጂ+1 ዘመናዊ ቤት። የአቮካዶና የማንጎ ዛፎች ያሉበት ውብ አትክልት፣ 4 መኝታ ቤቶች፣ የሰራተኛ ክፍልና ለ3 መኪና ማቆሚያ ያለው።",
    location: "Hawassa",
    address: "Piazza Residential Sector, Hawassa",
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
    ],
    primaryImage: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80",
    publicPrice: 22000000, // ETB 22,000,000
    // PRIVATE FINANCIALS
    acquisitionPrice: 19500000,
    privateDiscount: 400000,
    additionalExpenses: 180000,
    specifications: {
      bedrooms: 4,
      bathrooms: 3,
      floors: 2,
      area: 280,
      parking: 3,
      furnishing: "Unfurnished",
      propertyType: "G+1 Villa with Garden"
    },
    features: [
      "500m² Landscaped Fruit Garden",
      "Proximity to Lake Hawassa Promenade",
      "Clean Regional Title Carta",
      "Serene Neighborhood"
    ],
    status: "available",
    isFeatured: false,
    contact: null,
    createdAt: "2026-08-11T10:00:00.000Z",
    updatedAt: "2026-09-01T15:00:00.000Z"
  }
];

// Recorded Sales Transactions across months
// REVENUE LOGIC:
// Revenue = actual final selling price
// Profit = actual final selling price - acquisition cost - additional expenses
export const initialSales = [
  {
    id: "sale-tx-001",
    listingId: "delala-car-003",
    listingTitle: "2021 Hyundai Tucson GLS All-Wheel Drive",
    listingTitleAm: "2021 ሂውንዳይ ቱክሰን ጂኤልኤስ ኦል-ዊል ድራይቭ",
    category: "car",
    acquisitionCostSnapshot: 8200000,
    actualSellingPrice: 9200000, // ETB 9,200,000 (after 200k discount)
    discountSnapshot: 200000,
    additionalExpenses: 90000,
    netProfit: 910000, // 9,200,000 - 8,200,000 - 90,000 = ETB 910,000
    buyer: {
      name: "Solomon Getachew",
      phone: "+251 911 889 900",
      email: "solomon.g@gmail.com"
    },
    saleDate: "2026-08-14",
    paymentStatus: "completed"
  },
  {
    id: "sale-tx-002",
    listingId: "delala-prop-past-001",
    listingTitle: "Modern Townhouse in Bole Bulbula",
    listingTitleAm: "በቦሌ ቡልቡላ ዘመናዊ ታውንሃውስ",
    category: "house",
    acquisitionCostSnapshot: 26000000,
    actualSellingPrice: 29500000,
    discountSnapshot: 500000,
    additionalExpenses: 280000,
    netProfit: 3220000, // 29,500,000 - 26,000,000 - 280,000 = ETB 3,220,000
    buyer: {
      name: "Tigist Alemu",
      phone: "+251 922 445 566",
      email: "tigist.alemu@yahoo.com"
    },
    saleDate: "2026-07-22",
    paymentStatus: "completed"
  },
  {
    id: "sale-tx-003",
    listingId: "delala-car-past-002",
    listingTitle: "2022 Toyota RAV4 Hybrid Limited",
    listingTitleAm: "2022 ቶዮታ ራቭ4 ሃይብሪድ ሊሚትድ",
    category: "car",
    acquisitionCostSnapshot: 12500000,
    actualSellingPrice: 14200000,
    discountSnapshot: 300000,
    additionalExpenses: 110000,
    netProfit: 1590000, // 14,200,000 - 12,500,000 - 110,000 = ETB 1,590,000
    buyer: {
      name: "Dr. Henok Kebede",
      phone: "+251 933 112 233",
      email: "henok.k@health.gov.et"
    },
    saleDate: "2026-09-08",
    paymentStatus: "completed"
  },
  {
    id: "sale-tx-004",
    listingId: "delala-land-past-003",
    listingTitle: "Residential Plot 350m² in Adama",
    listingTitleAm: "በአዳማ 350 ካሬ ሜትር የመኖሪያ መሬት",
    category: "land",
    acquisitionCostSnapshot: 5800000,
    actualSellingPrice: 6800000,
    discountSnapshot: 200000,
    additionalExpenses: 95000,
    netProfit: 905000, // 6,800,000 - 5,800,000 - 95,000 = ETB 905,000
    buyer: {
      name: "Betelehem Yohannes",
      phone: "+251 912 778 899",
      email: "beth.yohannes@outlook.com"
    },
    saleDate: "2026-09-29",
    paymentStatus: "completed"
  },
  {
    id: "sale-tx-005",
    listingId: "delala-apt-past-004",
    listingTitle: "2-Bedroom Finished Condo in CMC",
    listingTitleAm: "በሲኤምሲ ባለ 2 መኝታ የተጠናቀቀ ኮንዶሚኒየም",
    category: "apartment",
    acquisitionCostSnapshot: 9200000,
    actualSellingPrice: 10600000,
    discountSnapshot: 250000,
    additionalExpenses: 120000,
    netProfit: 1280000, // 10,600,000 - 9,200,000 - 120,000 = ETB 1,280,000
    buyer: {
      name: "Yared Bekele",
      phone: "+251 944 556 677",
      email: "yared.b@gmail.com"
    },
    saleDate: "2026-10-18",
    paymentStatus: "completed"
  }
];

// Initial realistic customer inquiries
export const initialInquiries = [
  {
    id: "inq-001",
    listingId: "delala-prop-001",
    listingTitle: "Luxury Modern Villa with Garden in Bole",
    customerName: "Dawit Wolde",
    phone: "+251 911 345 678",
    email: "dawit.wolde@gmail.com",
    message: "Greetings Abebe, is the Bole Rwanda villa still available for private physical inspection this Saturday? My family is returning from the diaspora and looking to purchase in cash.",
    status: "negotiating",
    createdAt: "2026-10-24T10:15:00.000Z"
  },
  {
    id: "inq-002",
    listingId: "delala-car-001",
    listingTitle: "2023 Toyota Land Cruiser 300 VXR V6 Twin-Turbo",
    customerName: "Eng. Meron Tesfaye",
    phone: "+251 922 987 654",
    email: "meron.tesfaye@construction.et",
    message: "Hello Delala, can you confirm if the Land Cruiser 300 customs tax receipt and libre are code 2 or code 3? What is the final rock-bottom price if paid this week?",
    status: "contacted",
    createdAt: "2026-10-26T14:40:00.000Z"
  },
  {
    id: "inq-003",
    listingId: "delala-prop-002",
    listingTitle: "Brand New 3-Bedroom Luxury Apartment in Ayat",
    customerName: "Hanan Mohammed",
    phone: "+251 913 223 344",
    email: "hanan.m@telecom.et",
    message: "I am interested in the 3-bedroom apartment in Ayat. Does the developer accept bank financing or mortgage from Commercial Bank of Ethiopia (CBE)?",
    status: "new",
    createdAt: "2026-11-01T08:30:00.000Z"
  },
  {
    id: "inq-004",
    listingId: "delala-prop-004",
    listingTitle: "1,000m² Lakeside Resort Land in Bishoftu",
    customerName: "Girma Assefa",
    phone: "+251 945 667 788",
    email: "girma.assefa@invest.et",
    message: "Please share the exact Google Maps coordinates and carta masterplan for the Bishoftu Babogaya lakefront land parcel.",
    status: "converted",
    createdAt: "2026-09-20T16:00:00.000Z"
  },
  {
    id: "inq-005",
    listingId: "delala-car-002",
    listingTitle: "2022 Toyota Hilux Double Cab 2.8L GD-6 4x4",
    customerName: "Kassahun Tadesse",
    phone: "+251 911 654 321",
    email: "kassahun@transport.et",
    message: "Can we inspect the Hilux at Moenco workshop before finalizing agreement? I am ready to negotiate.",
    status: "new",
    createdAt: "2026-11-04T11:20:00.000Z"
  }
];

// Initial Business & Delala Settings
export const initialBusinessSettings = {
  businessName: "EthioDelala Real Estate & Auto Brokerage",
  businessNameAm: "ኢትዮ ደላላ የቤት፣ የመሬትና የመኪና አሻሻጭ",
  brokerName: "Abebe Tadesse",
  brokerNameAm: "አበበ ታደሰ",
  brokerTitle: "Senior Licensed Delala & Certified Property Consultant",
  brokerTitleAm: "ከፍተኛ የህግ ፈቃድ ያለው ደላላና አማካሪ",
  phone: "+251 911 234 567",
  whatsapp: "+251 911 234 567",
  email: "contact@ethiodelala.com",
  officeAddress: "Bole Medhanialem, Edna Mall Area, Next to Morning Star Mall, 4th Floor, Suite 402, Addis Ababa, Ethiopia",
  officeAddressAm: "ቦሌ መድኃኔዓለም፣ ኤድና ሞል አካባቢ፣ ሞርኒንግ ስታር ሞል አጠገብ፣ 4ኛ ፎቅ ቢሮ ቁጥር 402፣ አዲስ አበባ፣ ኢትዮጵያ",
  licenseNo: "ET-AA-2024-8841",
  currency: "ETB",
  brokerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  businessLogo: "",
  bio: "With over 15 years of dedicated brokerage expertise across Addis Ababa, Adama, Bishoftu, and Hawassa, EthioDelala provides licensed, transparent, and completely verified real estate and vehicle transactions. We ensure every title deed (carta) and automotive ownership libre is 100% legally vetted before purchase.",
  bioAm: "በአዲስ አበባ፣ አዳማ፣ ቢሾፍቱና ሀዋሳ ከ15 ዓመታት በላይ በታማኝነት የሰራን ፈቃድ ያለው የንብረትና የመኪና አሻሻጭ ድርጅት ነን። እያንዳንዱ የይዞታ ካርታና የተሽከርካሪ ሊብሬ በህግ አግባብ የተረጋገጠ መሆኑን በማረጋገጥ ለደንበኞቻችን አስተማማኝ ግብይት እናቀርባለን።",
  socialLinks: {
    facebook: "https://facebook.com/ethiodelala",
    telegram: "https://t.me/ethiodelala",
    youtube: "https://youtube.com/@ethiodelala",
    linkedin: "https://linkedin.com/company/ethiodelala"
  }
};

