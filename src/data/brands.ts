export type BrandCategoryFolder =
  | "global-brands"
  | "hospitality-lifestyle"
  | "real-estate"
  | "govt-events"
  | "media";

export type BrandItem = {
  name: string;
  slug: string;
};

export type BrandGroup = {
  id: string;
  label: string;
  page: string;
  columns: number;
  folder: BrandCategoryFolder;
  items: BrandItem[];
};

export const brandGroups: BrandGroup[] = [
  {
    id: "global-brands",
    label: "Global Brands",
    page: "06",
    columns: 5,
    folder: "global-brands",
    items: [
      { name: "Coca-Cola", slug: "coca-cola" },
      { name: "Pepsi", slug: "pepsi" },
      { name: "Microsoft", slug: "microsoft" },
      { name: "Anker", slug: "anker" },
      { name: "Mercedes-Benz", slug: "mercedes-benz" },
      { name: "HSBC", slug: "hsbc" },
      { name: "Etisalat by e&", slug: "etisalat" },
      { name: "Vodafone", slug: "vodafone" },
      { name: "Xiaomi", slug: "xiaomi" },
      { name: "Sephora", slug: "sephora" },
      { name: "Dior", slug: "dior" },
      { name: "National Bank of Egypt", slug: "national-bank-of-egypt" },
      { name: "Banque Misr", slug: "banque-misr" },
      { name: "Nestlé", slug: "nestle" },
    ],
  },
  {
    id: "hospitality",
    label: "Luxury Hospitality & Lifestyle",
    page: "07",
    columns: 6,
    folder: "hospitality-lifestyle",
    items: [
      { name: "Palazzo Versace Dubai", slug: "palazzo-versace" },
      { name: "Address Hotels + Resorts", slug: "address-hotels" },
      { name: "InterContinental", slug: "intercontinental" },
      { name: "FIVE Hotels and Resorts", slug: "five-hotels" },
      { name: "Waldorf Astoria", slug: "waldorf-astoria" },
      { name: "Le Méridien", slug: "le-meridien" },
      { name: "Fairmont", slug: "fairmont" },
      { name: "Conrad Hotels & Resorts", slug: "conrad" },
      { name: "Hilton", slug: "hilton" },
      { name: "Mövenpick", slug: "movenpick" },
      { name: "Woohoo", slug: "woohoo" },
      { name: "Meat Smoking Moot", slug: "meat-moot" },
      { name: "Amaya Dubai", slug: "amaya-dubai" },
      { name: "Wizz", slug: "wizz-air" },
      { name: "Solitair", slug: "solitair" },
      { name: "Jetex", slug: "jetex" },
      { name: "National", slug: "national-aviation" },
    ],
  },
  {
    id: "real-estate",
    label: "Real Estate Companies",
    page: "08",
    columns: 5,
    folder: "real-estate",
    items: [
      { name: "Danube Properties", slug: "danube-properties" },
      { name: "EMAAR", slug: "emaar" },
      { name: "Peace Homes Development", slug: "peace-homes" },
      { name: "Key Mavens", slug: "key-mavens" },
      { name: "Sobha Realty", slug: "sobha-realty" },
      { name: "Azizi Developments", slug: "azizi" },
      { name: "Palm Hills", slug: "palm-hills" },
      { name: "Talaat Moustafa Group", slug: "talaat-moustafa" },
      { name: "Kayan Developments", slug: "kayan" },
      { name: "Elaf Developments", slug: "elaf" },
      { name: "Doroob Developments", slug: "doroob" },
      { name: "SODIC", slug: "sodic" },
      { name: "Mountain View", slug: "mountain-view" },
    ],
  },
  {
    id: "events",
    label: "Governments & Major Events, Exhibitions",
    page: "09",
    columns: 5,
    folder: "govt-events",
    items: [
      { name: "Dubai Police", slug: "dubai-police" },
      { name: "UAE Cyber Security Council", slug: "cyber-security-council" },
      { name: "IPS", slug: "ips" },
      { name: "LEAP", slug: "leap" },
      { name: "GITEX Global", slug: "gitex-global" },
      { name: "1 Billion Followers Summit", slug: "1-billion-followers-summit" },
      { name: "Egypt Defence Expo", slug: "egypt-defence-expo" },
      { name: "Nile Property Expo", slug: "nile-property-expo" },
      { name: "Dubai Airshow", slug: "dubai-airshow" },
      { name: "Dubai Derma", slug: "dubai-derma" },
      { name: "AIM Congress", slug: "aim-congress" },
      { name: "AEEDC Dubai", slug: "aeedc-dubai" },
      { name: "ICCE", slug: "icce" },
      { name: "Amer Centers", slug: "amer-centers" },
      { name: "abra", slug: "abra" },
    ],
  },
  {
    id: "media",
    label: "Media Appearances",
    page: "10",
    columns: 3,
    folder: "media",
    items: [
      { name: "MBC Group", slug: "mbc-group" },
      { name: "MBC Masr", slug: "mbc-masr" },
      { name: "Al Hayat", slug: "al-hayat" },
      { name: "Al Nahar", slug: "al-nahar" },
      { name: "Abu Dhabi TV", slug: "abu-dhabi-tv" },
      { name: "Al Arabiya", slug: "al-arabiya" },
      { name: "Al Dhafra", slug: "al-dhafra" },
      { name: "Al Fujairah TV", slug: "al-fajr-tv" },
      { name: "El Mehwar TV", slug: "elmehwar-tv" },
    ],
  },
];
